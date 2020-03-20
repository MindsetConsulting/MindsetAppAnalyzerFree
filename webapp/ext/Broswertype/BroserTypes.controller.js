(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.Broswertype.BroserTypes", {

		onInit: function () {
			var me = this;
			var oView = me.getView();
			var schromeImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Chrome.png");
			var sMicrosoftEdgeImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/MicrosoftEdge.png");
			var sFireFoxImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/FireFox.png");
			var sSafariImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Safari.png");
			var sChromeimage = oView.byId("Chromeimage");
			var sSafariimage = oView.byId("Safariimage");
			var sMicrosoftEdgeimage = oView.byId("MicroSoftimage");
			var sFireFoximage = oView.byId("FireFoximage");
			sChromeimage.setSrc(schromeImagePath);
			sSafariimage.setSrc(sSafariImagePath);
			sMicrosoftEdgeimage.setSrc(sMicrosoftEdgeImagePath);
			sFireFoximage.setSrc(sFireFoxImagePath);
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
			// var sUrl = "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			oView.setModel(oDataModel);
			var sPath = "/BrowserLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					oBrowserModel.setProperty("/Edge", oData.results[0].Edge);
					oBrowserModel.setProperty("/Firefox", oData.results[0].Firefox);
					oBrowserModel.setProperty("/Chrome", oData.results[0].Chrome);
					oBrowserModel.setProperty("/Safari", oData.results[0].Safari);
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
				this._oDialog = sap.ui.xmlfragment("com.mindset.appanalyzer.ext.Broswertype.BrowserList");
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