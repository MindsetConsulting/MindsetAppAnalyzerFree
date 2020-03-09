(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.TopError.TopErrors", {

		onInit: function () {
			var me = this;
			//Call the method when the route and pattern matches
			var oView = me.getView();
			var data = {
				"apps": [{
					"Appname": "Rebates App",
					"users": 455,
					"Time": 20
				}, {
					"Appname": "Agreements App",
					"users": 200,
					"Time": 30
				}, {
					"Appname": "Approval App",
					"users": 150,
					"Time": 60
				}, {
					"Appname": "Route fiorimoni App",
					"users": "253",
					"Time": 10
				}, {
					"Appname": "Rebate Settlement App",
					"users": "100",
					"Time": 30
				}, {
					"Appname": "OPA App",
					"users": "120",
					"Time": 20
				}, {
					"Appname": "User Report App",
					"users": "250",
					"Time": 10
				}],
				"Errors": [{
					"Error": "Authentication Error"
				}, {
					"Error": "Failed to load from: SyntaxError: Unexpected token )"
				}, {
					"Error": "Controller couldn’t be instantiated"
				}, {
					"Error": "Translation entry does not show on the view"
				}, {
					"Error": "Could not start the app due to a Configuration Problem"
				}],
				"TopUsers": [{
					"User": "Ajay"
				}, {
					"User": "Gavin"
				}, {
					"User": "Shinjan"
				}, {
					"User": "jonathanbragg"
				}]
			};
			/*	,
					{
						"Error":"Adding element with duplicate id"
					}*/
			var oUserPerAppModel = new sap.ui.model.json.JSONModel(data);
			me.getView().setModel(oUserPerAppModel, "oUserPerAppModel");

		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();