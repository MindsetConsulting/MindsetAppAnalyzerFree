(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.fragment.UserLoggedIn", {

		onInit: function () {
			var me = this;
			var oView = me.getView();

			var oUserLogonModelData = {
				"NoUsersLoggedIn": ""

			};
			var oUserLogonModel = new sap.ui.model.json.JSONModel(oUserLogonModelData);
			oView.setModel(oUserLogonModel, "oUserLogonModel");
			// var oDataModel = me.getModel("fiorimoni");
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			// var sUrl = "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			oView.setModel(oDataModel);
			var sPath = "/FLPLogInSet/$count";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					oUserLogonModel.setProperty("/NoUsersLoggedIn", oRes.body);
					oUserLogonModel.updateBindings(true);
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