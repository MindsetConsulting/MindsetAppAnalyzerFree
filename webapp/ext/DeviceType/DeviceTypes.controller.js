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
				"Desktop": "",
				"Users": [],
				"UniqueUserCount" : 0
			};
			var oDeviceModel = new sap.ui.model.json.JSONModel(oDeviceModelData);
			oView.setModel(oDeviceModel, "oDeviceModel");

			//Get List of Users who logged in from different devices
			this.getDeviceUserList();

			var oDataModel = this.getModel("fiorimoni");
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
			var oDeviceModel = that.getView().getModel('oDeviceModel');
			var oDataModel = that.getModel("fiorimoni");
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
			this._getDialog().open();
		},
		
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.mindset.appanalyzer.ext.DeviceType.DeviceList", this);
				this.getView().addDependent(this._oDialog);
			}	
			return this._oDialog;
		},
		onCloseDialog:function(){
			this._getDialog().close();
		},
		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();