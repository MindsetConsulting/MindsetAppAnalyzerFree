(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.AvgFioriLaunchTime.AvgFioriLaunchTimes", {

		onInit: function () {
			var that = this;
			var oView = that.getView();

			var oLoadTimeData = {
				"LoadTime": ""
			};
			var oLoadTimeModel = new sap.ui.model.json.JSONModel(oLoadTimeData);
			oView.setModel(oLoadTimeModel, "oLoadTimeModel");
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, false);
			oView.setModel(oDataModel);
			var sPath = "/AppInfoSet(' ')";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					oLoadTimeModel.setProperty("/LoadTime", oRes.data.LoadTime);
					oLoadTimeModel.updateBindings(true);
				},
				error: function (data) {

				}
			});

		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();