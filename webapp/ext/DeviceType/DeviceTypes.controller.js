(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.DeviceType.DeviceTypes", {

		onInit: function () {
			var me = this;
			var oView = me.getView();
        	var sMobilepath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Mobile.jpg");
			var stabletpath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Tablet.jpg");
			var sSystemPath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/System.jpg");
			var MobileImage = oView.byId("MobileImage");
			var TabletImage = oView.byId("TabletImage");
			var SystemImage = oView.byId("SystemImage");
			MobileImage.setSrc(sMobilepath);
			TabletImage.setSrc(stabletpath);
			SystemImage.setSrc(sSystemPath);
			var oDeviceModelData = {
				"Phone": "",
				"Tablet": "",
				"Desktop": ""

			};
			var oDeviceModel = new sap.ui.model.json.JSONModel(oDeviceModelData);
			oView.setModel(oDeviceModel, "oDeviceModel");
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			// var sUrl = "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			oView.setModel(oDataModel);
			var sPath = "/DeviceLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					oDeviceModel.setProperty("/Phone", oData.results[0].Phone);
					oDeviceModel.setProperty("/Tablet", oData.results[0].Tablet);
					oDeviceModel.setProperty("/Desktop", oData.results[0].Desktop);
					oDeviceModel.updateBindings(true);
				},
				error: function (data) {

				}
			});

		},
		
		handleUserLoggedPressed: function (oEvent) {
			//var oTable = this.byId("idUserList");
			this._getDialog().open();
		},
		
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.mindset.appanalyzer.ext.DeviceType.DeviceList");
				this.getView().addDependent(this._oDialog);
			}	
			return this._oDialog;
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();