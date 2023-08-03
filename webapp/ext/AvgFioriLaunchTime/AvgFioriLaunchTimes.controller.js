/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller", 
			"sap/ui/model/json/JSONModel",
			"sap/ui/model/odata/ODataModel"],
function (Controller, JSONModel, ODataModel) {
    "use strict";
    sap.ui.controller("com.mindset.appanalyzer.ext.AvgFioriLaunchTime.AvgFioriLaunchTimes", {

		onInit: function () {
			var that = this;
			var oView = that.getView();

			var oLoadTimeData = {
				"LoadTime": ""
			};
			var oLoadTimeModel = new JSONModel(oLoadTimeData);
			oView.setModel(oLoadTimeModel, "oLoadTimeModel");
			var oDataModel = this.getModel("fiorimoni");
			oView.setModel(oDataModel);
			var sPath = "/AppInfoSet('')";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					oLoadTimeModel.setProperty("/LoadTime", oRes.data.LoadTime);
					oLoadTimeModel.updateBindings(true);
				},
				error: function () {

				}
			});

		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
});