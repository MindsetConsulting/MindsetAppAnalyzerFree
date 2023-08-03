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
			var oDataModel = this.getModel("fiorimoni");
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
		
		handleUserLoggedPressed: function (oEvent) {
			
			this._getDialog().open();
			
		},
		
		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.mindset.appanalyzer.ext.fragment.UserList", this);
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