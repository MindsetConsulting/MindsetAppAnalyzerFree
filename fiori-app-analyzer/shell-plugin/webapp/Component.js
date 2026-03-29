/**
 * Mindset FLP Extension Plugin - Data Collection Component
 *
 * This FLP plugin runs on every Launchpad page load. It:
 * 1. Logs FLP login info (browser, device, location) via FLPInfoSet CREATE
 * 2. Listens for tile clicks and logs app usage via AppInfoSet CREATE
 * 3. Adds a feedback button to the shell header bar
 */
sap.ui.define([
	"sap/ui/core/Component",
	"sap/m/Button",
	"sap/m/Bar",
	"sap/m/MessageToast",
	"sap/base/Log"
], function (Component, Button, Bar, MessageToast, Log) {
	"use strict";

	// Tile CSS selectors — covers multiple FLP rendering modes
	var TILE_SELECTORS = [
		".sapMGT",                              // Generic Tile (current FLP / Horizon theme)
		".sapFGridContainerItemInnerWrapper",    // Fiori 3 spaces/pages
		".sapFGridContainerItemWrapper",         // Fiori 3 variant
		".sapUshellTileInner"                    // Classic homepage tiles
	].join(", ");

	/**
	 * Detects the browser name from sap.ui.Device short codes.
	 */
	function _detectBrowser() {
		var sBrowser = sap.ui.Device.browser.name;
		var mMap = {
			"an": "ANDROID", "cr": "CHROME", "ed": "EDGE",
			"ff": "FIREFOX", "ie": "IE", "sf": "SAFARI"
		};
		return mMap[sBrowser] || "OPERA";
	}

	/**
	 * Detects the device type from sap.ui.Device.
	 */
	function _detectDeviceType() {
		if (sap.ui.Device.system.desktop) { return "DESKTOP"; }
		if (sap.ui.Device.system.tablet)  { return "TABLET"; }
		if (sap.ui.Device.system.phone)   { return "PHONE"; }
		return "";
	}

	/**
	 * Detects the OS name from sap.ui.Device.
	 */
	function _detectOS() {
		var mMap = {
			"Android": "ANDROID", "bb": "BLACKBERRY", "iOS": "IOS",
			"linux": "LINUX", "mac": "MACINTOSH", "win": "WINDOWS",
			"winphone": "WINDOWS_PHONE"
		};
		return mMap[sap.ui.Device.os.name] || "";
	}

	/**
	 * Extracts the app title from a tile's <a> element.
	 * Tries title attribute first, falls back to aria-label.
	 */
	function _extractTitle(oAnchor) {
		if (!oAnchor) { return ""; }
		var sTitle = oAnchor.getAttribute("title") || oAnchor.getAttribute("aria-label") || "";
		// Take only the first line (aria-label can contain subtitle + tile type)
		return sTitle.split("\n")[0].trim();
	}

	/**
	 * Parses semantic object and action from a tile's href.
	 * Expected format: ...#SemanticObject-action?params
	 */
	function _parseSemanticNavigation(sHref) {
		var oResult = { semanticObject: "", semanticAction: "" };
		try {
			var sHash = sHref.split("#")[1];
			var sIntent = sHash.split("?")[0];
			var aParts = sIntent.split("-");
			oResult.semanticObject = aParts[0] || "";
			oResult.semanticAction = aParts[1] || "";
		} catch (e) {
			Log.warning("Could not parse semantic navigation from href: " + sHref);
		}
		return oResult;
	}

	return Component.extend("com.mindset.flpext.Component", {
		metadata: {
			manifest: "json"
		},

		init: function () {
			var that = this;

			// Get current user
			var oUserInfo = new sap.ushell.services.UserInfo();
			that._userId = oUserInfo.getUser().getId();
			that._tileClicked = false;

			// Detect environment
			that._browser = _detectBrowser();
			that._deviceType = _detectDeviceType();
			that._os = _detectOS();
			that._latitude = "";
			that._longitude = "";

			// Get geolocation, then log FLP login
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function (oPosition) {
						that._latitude = oPosition.coords.latitude;
						that._longitude = oPosition.coords.longitude;
						that._logFLPLogin();
					},
					function () {
						// Geolocation denied or unavailable — log without coordinates
						that._logFLPLogin();
					}
				);
			} else {
				that._logFLPLogin();
			}

			// Tile click listener — uses capture phase because SAP Generic Tiles
			// call stopPropagation(), preventing jQuery delegated (bubble) handlers
			document.addEventListener("click", function (oEvent) {
				var oTile = oEvent.target.closest(TILE_SELECTORS);
				if (!oTile || that._tileClicked) { return; }
				that._tileClicked = true;

				var oAnchor = oEvent.target.closest("a");
				if (!oAnchor) {
					that._tileClicked = false;
					return;
				}

				var sHref = oAnchor.getAttribute("href");
				if (!sHref || sHref.indexOf("#") === -1) {
					that._tileClicked = false;
					return;
				}

				var oNav = _parseSemanticNavigation(sHref);
				var sTitle = _extractTitle(oAnchor);

				that._logAppClick(
					oNav.semanticObject,
					oNav.semanticAction,
					window.location.href,
					sTitle
				);
			}, true); // true = capture phase

			// Add feedback button to shell header
			this._getRenderer().then(function (oRenderer) {
				oRenderer.addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem", {
					icon: "sap-icon://feedback",
					tooltip: "App Feedback",
					press: that.onFeedbackPress,
					visible: true  // Set to true to enable
				}, true, false, [
					oRenderer.LaunchpadState.App,
					oRenderer.LaunchpadState.Home
				]);
			});
		},

		/**
		 * Logs FLP login to FLPInfoSet.
		 * Called once per page load after geolocation resolves.
		 */
		_logFLPLogin: function () {
			var that = this;
			var oModel = that.getModel("Monitoring");
			if (!oModel) {
				Log.error("Monitoring model not available — FLP login not logged");
				return;
			}

			var oPayload = {
				UserID: that._userId,
				Browser: that._browser,
				BrowserVersion: sap.ui.Device.browser.versionStr,
				Latitude: that._latitude.toString(),
				Longitude: that._longitude.toString(),
				DeviceType: that._deviceType,
				OS: that._os,
				OSDetails: sap.ui.Device.os.versionStr
			};

			oModel.create("/FLPInfoSet", oPayload, {
				success: function () {
					Log.info("FLP login logged for user " + that._userId);
				},
				error: function (oError) {
					Log.error("Failed to log FLP login", oError);
				}
			});
		},

		/**
		 * Logs app tile click to AppInfoSet.
		 * Called when user clicks any FLP tile.
		 */
		_logAppClick: function (sSemanticObject, sSemanticAction, sBaseUrl, sAppTitle) {
			var that = this;
			var oModel = that.getModel("Monitoring");
			if (!oModel) {
				Log.error("Monitoring model not available — app click not logged");
				that._tileClicked = false;
				return;
			}

			// Page load time from Navigation Timing API
			var oTiming = window.performance.timing;
			var iLoadTime = oTiming.loadEventEnd - oTiming.navigationStart;

			var oPayload = {
				UserID: that._userId,
				SemanticObject: sSemanticObject,
				AppUrl: sBaseUrl,
				AppDescription: sAppTitle,
				SemanticAction: sSemanticAction,
				LoadTime: iLoadTime,
				Browser: that._browser,
				BrowserVersion: sap.ui.Device.browser.versionStr,
				Latitude: that._latitude.toString(),
				Longitude: that._longitude.toString(),
				DeviceType: that._deviceType,
				OS: that._os,
				OSDetails: sap.ui.Device.os.versionStr
			};

			oModel.create("/AppInfoSet", oPayload, {
				success: function () {
					that._tileClicked = false;
					Log.info("App click logged: " + sAppTitle);
				},
				error: function (oError) {
					that._tileClicked = false;
					Log.error("Failed to log app click for " + sAppTitle, oError);
				}
			});
		},

		/**
		 * Opens a feedback popover with face-rating icons and optional comments.
		 * Submits to FeedbackSet via OData CREATE.
		 */
		onFeedbackPress: function () {
			var oPopover = sap.ui.getCore().byId("feedback_popover");

			if (!oPopover) {
				var oToolbar = new sap.m.Toolbar({
					design: sap.m.ToolbarDesign.Solid,
					style: sap.m.ToolbarStyle.Clear,
					content: [
						new sap.m.Label({
							design: sap.m.LabelDesign.Bold,
							text: "How would you rate this app?",
							labelFor: "faceButton"
						}),
						new sap.m.SegmentedButton("faceButton", {
							items: [
								new sap.m.SegmentedButtonItem("id5", {
									icon: "sap-icon://BusinessSuiteInAppSymbols/icon-face-very-happy"
								}),
								new sap.m.SegmentedButtonItem("id4", {
									icon: "sap-icon://BusinessSuiteInAppSymbols/icon-face-happy"
								}),
								new sap.m.SegmentedButtonItem("id3", {
									icon: "sap-icon://BusinessSuiteInAppSymbols/icon-face-neutral"
								}),
								new sap.m.SegmentedButtonItem("id2", {
									icon: "sap-icon://BusinessSuiteInAppSymbols/icon-face-bad"
								}),
								new sap.m.SegmentedButtonItem("id1", {
									icon: "sap-icon://BusinessSuiteInAppSymbols/icon-face-very-bad"
								})
							]
						}),
						new sap.m.Button({
							text: "Comments",
							press: function () {
								var oComments = sap.ui.getCore().byId("idComments");
								oComments.setVisible(!oComments.getVisible());
							}
						}),
						new sap.m.TextArea("idComments", {
							rows: 1,
							valueLiveUpdate: true,
							visible: false
						}),
						new sap.m.Button({
							type: sap.m.ButtonType.Emphasized,
							text: "Submit",
							press: function () {
								var oUserInfo = new sap.ushell.services.UserInfo();
								var sUserId = oUserInfo.getUser().getId();
								var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
								var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, false);

								var sSelectedItem = sap.ui.getCore().byId("faceButton").getSelectedItem();
								var aMatch = sSelectedItem.match(/(\d+)/);
								var iRating = parseInt(aMatch[0], 10);

								var oPayload = {
									Appname: document.title,
									Rating: iRating,
									Comments: sap.ui.getCore().byId("idComments").getValue(),
									Userid: sUserId,
									LogTime: new Date()
								};

								oDataModel.create("/FeedbackSet", oPayload, {
									success: function () {
										Log.info("Feedback submitted for " + document.title);
									},
									error: function (oError) {
										try {
											var sMessage = JSON.parse(oError.response.body).error.message.value;
											sap.m.MessageBox.show(sMessage, {
												icon: sap.m.MessageBox.Icon.ERROR,
												title: "Error in submitting feedback!",
												actions: [sap.m.MessageBox.Action.OK]
											});
										} catch (e) {
											Log.error("Failed to submit feedback", oError);
										}
									}
								});

								this.getParent().getParent().close();
								this.getParent().getParent().destroy();
							}
						})
					]
				});

				oPopover = new sap.m.Popover("feedback_popover", {
					placement: sap.m.PlacementType.Bottom,
					showHeader: false,
					content: oToolbar
				});
			}

			if (oPopover.isOpen()) {
				oPopover.close();
				oPopover.destroy();
			} else {
				oPopover.openBy(this);
			}
		},

		/**
		 * Returns a promise that resolves with the FLP shell renderer.
		 */
		_getRenderer: function () {
			var that = this;
			var oDeferred = new jQuery.Deferred();

			that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");

			if (!that._oShellContainer) {
				oDeferred.reject(
					"Shell container not available; this component must run in a unified shell runtime context."
				);
			} else {
				var oRenderer = that._oShellContainer.getRenderer();
				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					that._onRendererCreated = function (oEvent) {
						var oR = oEvent.getParameter("renderer");
						if (oR) {
							oDeferred.resolve(oR);
						} else {
							oDeferred.reject("Shell renderer not available after 'rendererLoaded' event.");
						}
					};
					that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
				}
			}

			return oDeferred.promise();
		}
	});
});