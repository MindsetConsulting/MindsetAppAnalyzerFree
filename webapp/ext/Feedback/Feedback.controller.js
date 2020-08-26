/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller"],
	function (Controller) {
		"use strict";
		sap.ui.controller("com.mindset.appanalyzer.ext.Feedback.Feedback", {

			onInit: function () {
				var oView = this.getView();
				var that = this;
				var oUserFeedbackModelData = {
					"AVGRating": ""
				};
				var oUserFeedbackModel = new sap.ui.model.json.JSONModel(oUserFeedbackModelData);
				oView.setModel(oUserFeedbackModel, "oUserFeedbackModel");
				var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
				var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, false);
				oView.setModel(oDataModel);
				var sPath = "/FeedbackSet/$count";
				oDataModel.read(sPath, {
					success: function (oData, oRes) {
						var avgnum = that.getView().byId("idAVG");
						switch (oRes.body) {
						case "1":
							avgnum.addStyleClass("feedbackRed");
							break;
						case "2":
							avgnum.addStyleClass("feedbackRed");
							break;
						case "3":
							avgnum.addStyleClass("feedbackYellow");
							break;
						case "4":
							avgnum.addStyleClass("feedbackGreen");
							break;
						case "5":
							avgnum.addStyleClass("feedbackGreen");
							break;
						}
						oUserFeedbackModel.setProperty("/AVGRating", oRes.body);
						oUserFeedbackModel.updateBindings(true);
					},
					error: function (data) {

					}
				});

			},

			navToDetail: function (oEvent) {
				var oCrossAppNav = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");
				oCrossAppNav.toExternal({
					target: {
						semanticObject: "voe_detail",
						action: "display"
					}
				});
			},

			onAfterRendering: function () {

			},

			onExit: function () {

			}

		});
	});