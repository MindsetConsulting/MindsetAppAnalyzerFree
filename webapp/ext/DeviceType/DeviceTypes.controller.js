(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.DeviceType.DeviceTypes", {

		onInit: function () {
			var me = this;
			var oView = me.getView();
        	var sMobilepath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Device_Mobile.jpg");
			var stabletpath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Device_Tablet.jpg");
			var sSystemPath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/Device_System.jpg");
			var MobileImage = oView.byId("MobileImage");
			var TabletImage = oView.byId("TabletImage");
			var SystemImage = oView.byId("SystemImage");
			MobileImage.setSrc(sMobilepath);
			TabletImage.setSrc(stabletpath);
			SystemImage.setSrc(sSystemPath);
			var oDeviceModelData = {
				"Phone": "",
				"Tablet": "",
				"Desktop": "",
				"Users": [],
				"UniqueUserCount" : 0
			};
			var oDeviceModel = new sap.ui.model.json.JSONModel(oDeviceModelData);
			oView.setModel(oDeviceModel, "oDeviceModel");

			//Get List of Users who logged in from different devices
			this.getDeviceUserList();

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
		getDeviceUserList: function(){
			var that = this;
			var oView = that.getView();
			var oDeviceModel = that.getView().getModel('oDeviceModel');
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			oView.setModel(oDataModel);
			var sPath = "/FLPDeviceSet";
			var aUniqItms=[], aItems, aFinal=[];
			oDeviceModel.setProperty('/UniqueUserCount', aFinal.length);
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					if(oData.results.length > 0){
						aUniqItms = [... new Set(oData.results.map(function(el){
							return el.DeviceType.trim() + "|" + el.UserID.trim();
						}))];
						for(var i=0; i<aUniqItms.length; i++){
							aItems = oData.results.filter(function(el){
								return el.DeviceType.trim() === aUniqItms[i].split('|')[0] && 
								el.UserID.trim() === aUniqItms[i].split('|')[1];
							});
							aItems.sort(function(a, b) {
								return b.LastLoginAt-a.LastLoginAt;
							});
							aFinal.push(aItems[0]);
						}
					}
					oDeviceModel.setProperty('/Users', $.extend(true, [], aFinal));
					oDeviceModel.setProperty('/UniqueUserCount', aFinal.length);
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
				this._oDialog = sap.ui.xmlfragment("com.mindset.appanalyzer.ext.DeviceType.DeviceList", this);
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