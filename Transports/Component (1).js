sap.ui.define([
	"sap/ui/core/Component",
	"sap/m/Button",
	"sap/m/Bar",
	"sap/ushell/services/ShellNavigation",
	"sap/m/MessageToast"
], function (Component, Button, Bar, ShellNavigation, MessageToast) {

	return Component.extend("com.mindset.flpExt.Component", {

		metadata: {
			"manifest": "json"
		},

		init: function () {
			var me = this;
			var that = this;
			var oSementicObject = "";
			var oAction = "";
			var hash = "";
			var sAppDesc = "";
			var oUser = new sap.ushell.services.UserInfo();
			me.userId = oUser.getUser().getId();
			/*	$(".sapUshellTileInner").click(function (e) {
					hash = e.currentTarget.hash;
					oSementicObject = e.currentTarget.hash.split("-")[0].substring(1);
					oAction = e.currentTarget.hash.split("-")[1].split("?")[0];
					var appUrl = e.currentTarget.baseURI;
					var userId = me.userId;
					sAppDesc = e.currentTarget.textContent;
					me.onCallAppLogInSet(oSementicObject, oAction, appUrl, userId, sAppDesc);
				});*/

			// This is example code. Please replace with your implementation!
			var browser = sap.ui.Device.browser.name;
			var postion = "";
			var latitude = "";
			var longitude = "";
			var Device = "";
			var os = "";
			if (browser === "an") {
				browser = "ANDROID";
			} else if (browser === "cr") {
				browser = "CHROME";
			} else if (browser === "ed") {
				browser = "EDGE";
			} else if (browser === "ff") {
				browser = "FIREFOX";
			} else if (browser === "ie") {
				browser = "IE";
			} else if (browser === "sf") {
				browser = "SAFARI";
			} else {
				browser = "OPERA";
			}
			if (sap.ui.Device.system.desktop) {
				Device = "DESKTOP";
			} else if (sap.ui.Device.system.tablet) {
				Device = "TABLET";
				this._events();
			} else if (sap.ui.Device.system.phone) {
				Device = "PHONE";
				this._events();
			}

			if (sap.ui.Device.os.name === "Android") {
				os = "ANDROID";
			} else if (sap.ui.Device.os.name === "bb") {
				os = "BLACKBERRY";
			} else if (sap.ui.Device.os.name === "iOS") {
				os = "IOS";
			} else if (sap.ui.Device.os.name === "linux") {
				os = "LINUX";
			} else if (sap.ui.Device.os.name === "mac") {
				os = "MACINTOSH";
			} else if (sap.ui.Device.os.name === "win") {
				os = "WINDOWS";
			} else if (sap.ui.Device.os.name === "winphone") {
				os = "WINDOWS_PHONE";
			}

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					try {
						latitude = position.coords.latitude;
						longitude = position.coords.longitude;
						me.onUserInfo(browser, Device, os, latitude, longitude);

					} catch (err) {
						me.onUserInfo(browser, Device, os, latitude, longitude);
					}

					// MessageToast.show("browser:" + browser + "   Device:" + Device + " latitude:" + latitude + "longitude: " + longitude + "");
				}, function (error) {
					me.onUserInfo(browser, Device, os, latitude, longitude);
				});

			}

			/*	*/
			//	MessageToast.show("browser:" + browser + "/nPostions: " + postion + "");
			/**
			 * Add item to the header
			 */
			/*rendererPromise.then(function (oRenderer) {
				oRenderer.addHeaderItem({
					icon: "sap-icon://add",
					tooltip: "Add bookmark",
					press: function () {
						MessageToast.show("This SAP Fiori Launchpad has been extended to improve your experience");
					}
				}, true, true);
			});*/

			$(document).on('click', '.sapUshellTileInner', function (e) {
				try {
					hash = e.currentTarget.hash;
					oSementicObject = e.currentTarget.hash.split("-")[0].substring(1);
					oAction = e.currentTarget.hash.split("-")[1].split("?")[0];
					var appUrl = e.currentTarget.baseURI;
					var userId = me.userId;
					sAppDesc = e.currentTarget.textContent;
					me.onCallAppLogInSet(oSementicObject, oAction, appUrl, userId, sAppDesc, browser, Device, os, latitude, longitude);
				} catch (err) {

				}
			});

			var rendererPromise = this._getRenderer();
			rendererPromise.then(function (oRenderer) {
				oRenderer.addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem", {
						id: "feedbackBtn",
						icon: "sap-icon://headset",
						tooltip: "App Feedback",
						press: that.onFeedbackPress
					},
					true
				);
			});

			/*			var chance = 5;//Math.round(Math.random() * 10);
						if (chance == 5) {
							sap.ui.getCore().byId("feedbackBtn").press();
						}*/
						
			this.browser = browser;
			this.device = Device;
			this.os = os;
			this.latitude = latitude;
			this.longitude = longitude;

		},
		
		_events: function () {
			sap.ui.getCore().getEventBus().subscribe(
				"sap.ushell",
				"appOpened",
				this.onOpen,
				this
				);	
		},
		
		onOpen: function ( e1, e2, appMeta, e4) {
			var me = this;
			var oSementicObject = appMeta.sFixedShellHash.split("-")[0].substring(1);
			var oAction = appMeta.sFixedShellHash.split("-")[1];
			var appUrl = appMeta.url;
			var userId = me.userId;
			var sAppDesc = appMeta.text;
			me.onCallAppLogInSet(oSementicObject, oAction, appUrl, userId, sAppDesc, me.browser, me.device, me.os, me.latitude, me.longitude);
		},

		onFeedbackPress: function () {
			var oTempAppName = document.title;
			var oFeedbackPopover = sap.ui.getCore().byId("feedback_popover");
			if (!oFeedbackPopover) {
				var oFeedbackBar = new sap.m.Toolbar({
					design: sap.m.ToolbarDesign.Solid,
					style: sap.m.ToolbarStyle.Clear,
					content: [
						new sap.m.Label({
							design: sap.m.LabelDesign.Bold,
							text: "How would you rate " + oTempAppName + "?",
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
							press: function (e) {
								var vis = sap.ui.getCore().byId("idComments").getVisible();
								if (vis === false) {
									sap.ui.getCore().byId("idComments").setVisible(true);
								} else {
									sap.ui.getCore().byId("idComments").setVisible(false);
								}
							}
						}),
						new sap.m.TextArea("idComments", {
							rows: 1,
							growing: true, growingMaxLines:7,
							valueLiveUpdate: true,
							maxLength: 500,
							showExceededText: false,
							visible: false
						}),
						new sap.m.Button({
							type: sap.m.ButtonType.Emphasized,
							text: "Submit",
							press: function () {
								var oUser = new sap.ushell.services.UserInfo();
								var userId = oUser.getUser().getId();
								var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
								var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, false);
								var str = sap.ui.getCore().byId("faceButton").getSelectedItem();
								var matches = str.match(/(\d+)/);
								var rating = parseInt(matches[0], 10);
								var oFeedbackData = {
									"Appname": document.title,
									"Rating": rating,
									"Comments": sap.ui.getCore().byId("idComments").getValue(),
									"Userid": userId
								};
								oDataModel.create("/FeedbackSet", oFeedbackData, {
									success: function (oData, oResponse) {
										var oFeedbackPopover = sap.ui.getCore().byId("feedback_popover");
										if (oFeedbackPopover.isOpen()) {
											oFeedbackPopover.close();
											oFeedbackPopover.destroy();
										}
									},
									error: function (error, resp1, resp2) {
										//	var oError = JSON.parse(error.response.body).error.message.value;
										//	sap.m.MessageBox.show(oError, {
										//		icon: sap.m.MessageBox.Icon.ERROR,
										//		title: "Error in submitting feedback!",
										//		actions: [sap.m.MessageBox.Action.OK]
										//	});

										var oFeedbackPopover = sap.ui.getCore().byId("feedback_popover");
										if (oFeedbackPopover.isOpen()) {
											oFeedbackPopover.close();
											oFeedbackPopover.destroy();
										}

									}
								});
								//this.getParent().getParent().close();
								//this.getParent().getParent().destroy();
							}
						})
					]
				});

				oFeedbackPopover = new sap.m.Popover("feedback_popover", {
					placement: sap.m.PlacementType.Bottom,
					showHeader: false,
					content: oFeedbackBar
				});
			}

			if (oFeedbackPopover.isOpen()) {
				oFeedbackPopover.close();
				oFeedbackPopover.destroy();
			} else {
				oFeedbackPopover.openBy(this);
			}

		},

		onCallAppLogInSet: function (oSementicObject, oAction, appUrl, userId, sAppDesc, browser, Device, os, latitude, longitude) {
			var me = this;
			// var sUrl = "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/";
			// "uri": "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/",
			var oDataModel = me.getModel("Monitoring");

			var perfData = window.performance.timing;
			var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
			//var loadTime = pageLoadTime.toString();
			var loadTime = pageLoadTime;

			var oAppLogInInfoData = {
				"UserID": userId,
				"SemanticObject": oSementicObject,
				"AppUrl": appUrl,
				"AppDescription": sAppDesc,
				"SemanticAction": oAction,
				"LoadTime": loadTime,
				"Browser": browser,
				"BrowserVersion": sap.ui.Device.browser.versionStr,
				"Latitude": latitude.toString(),
				"Longitude": longitude.toString(),
				"DeviceType": Device,
				"OS": os,
				"OSDetails": sap.ui.Device.os.versionStr
			};

			oDataModel.create("/AppInfoSet", oAppLogInInfoData, {
				success: function (oData, oResponse) {},
				error: function (error, resp1, resp2) {
					var oError = JSON.parse(error.response.body).error.message.value;
					sap.m.MessageBox.show(oError, {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",

						actions: [sap.m.MessageBox.Action.OK]
					});

				}
			});
		},
		onUserInfo: function (browser, Device, os, latitude, longitude) {
			var me = this;
			var oUser = new sap.ushell.services.UserInfo();
			var userId = oUser.getUser().getId();
			// var sUrl = "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/";
			var oDataModel = me.getModel("Monitoring");

			var oUserInfoData = {
				"UserID": userId,
				"Browser": browser,
				"BrowserVersion": sap.ui.Device.browser.versionStr,
				"Latitude": latitude.toString(),
				"Longitude": longitude.toString(),
				"DeviceType": Device,
				"OS": os,
				"OSDetails": sap.ui.Device.os.versionStr
			};

			oDataModel.create("/FLPInfoSet", oUserInfoData, {
				success: function (oData, oResponse) {
					/*	sap.m.MessageBox.show(
										"TU Successfully Created.", {
											icon: sap.m.MessageBox.Icon.SUCCESS,
											title: "Success",
											actions: [sap.m.MessageBox.Action.OK],
											onClose: function(oAction) {}
										});*/

				},
				error: function (error, resp1, resp2) {
					var oError = JSON.parse(error.response.body).error.message.value;
					sap.m.MessageBox.show(oError, {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",

						actions: [sap.m.MessageBox.Action.OK]
					});

				}
			});
		},

		/**
		 * Returns the shell renderer instance in a reliable way,
		 * i.e. independent from the initialization time of the plug-in.
		 * This means that the current renderer is returned immediately, if it
		 * is already created (plug-in is loaded after renderer creation) or it
		 * listens to the &quot;rendererCreated&quot; event (plug-in is loaded
		 * before the renderer is created).
		 *
		 *  @returns {object}
		 *      a jQuery promise, resolved with the renderer instance, or
		 *      rejected with an error message.
		 */
		_getRenderer: function () {
			var that = this,
				oDeferred = new jQuery.Deferred(),
				oRenderer;

			that._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
			if (!that._oShellContainer) {
				oDeferred.reject(
					"Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
			} else {
				oRenderer = that._oShellContainer.getRenderer();
				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					// renderer not initialized yet, listen to rendererCreated event
					that._onRendererCreated = function (oEvent) {
						oRenderer = oEvent.getParameter("renderer");
						if (oRenderer) {
							oDeferred.resolve(oRenderer);
						} else {
							oDeferred.reject("Illegal state: shell renderer not available after recieving 'rendererLoaded' event.");
						}
					};
					that._oShellContainer.attachRendererCreatedEvent(that._onRendererCreated);
				}
			}
			return oDeferred.promise();
		}
	});
});