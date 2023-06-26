(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.Broswertype.BroserTypes", {

		onInit: function () {
			var me = this;
			var oView = me.getView();
			var schromeImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Chrome.png");
			var sFireFoxImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/FireFox.png");
			var sSafariImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Safari.png");
			var sOtherImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/OtherBro.png");
			var sChromeimage = oView.byId("Chromeimage");
			var sSafariimage = oView.byId("Safariimage");
			var sFireFoximage = oView.byId("FireFoximage");
			var sOthersimage = oView.byId("OtherBrowimage");
			sChromeimage.setSrc(schromeImagePath);
			sSafariimage.setSrc(sSafariImagePath);
			sFireFoximage.setSrc(sFireFoxImagePath);
			sOthersimage.setSrc(sOtherImagePath);
			var oBrowserModelData = {
				"IE": "",
				"Chrome": "",
				"Edge": "",
				"Firefox": "",
				"Opera": "",
				"Safari": ""
			};
			var oBrowserModel = new sap.ui.model.json.JSONModel(oBrowserModelData);
			oView.setModel(oBrowserModel, "oBrowserModel");

			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			oView.setModel(oDataModel);
			var sPath = "/BrowserLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					oBrowserModel.setProperty("/Firefox", oData.results[0].Firefox);
					oBrowserModel.setProperty("/Chrome", oData.results[0].Chrome);
					oBrowserModel.setProperty("/Safari", oData.results[0].Safari);
					oBrowserModel.setProperty("/Others", oData.results[0].IE+oData.results[0].Edge+oData.results[0].Opera);
					oBrowserModel.updateBindings(true);
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
				this._oDialog = sap.ui.xmlfragment("com.mindset.appanalyzer.ext.Broswertype.BrowserList", this);
				this.getView().addDependent(this._oDialog);
			}	
			return this._oDialog;
		},

		onDialogClose: function(){
			this._oDialog.close();
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();