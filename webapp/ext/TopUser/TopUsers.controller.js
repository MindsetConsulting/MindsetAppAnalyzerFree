(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.fiorimoni.ext.TopUser.TopUsers", {

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
					"Error": "sap is not defined"
				}, {
					"Error": "failed to load from: SyntaxError: Unexpected token )"
				}, {
					"Error": "Controller couldn’t be instantiated"
				}],
				"TopUsers": [{
					"User": "Ajay",
					"Hours":"4hrs 15m",
					"image":$.sap.getModulePath("com.mindset.fiorimoni", "/images/team4.png")
				}, {
					"User": "Hari Krishna",
					"Hours":"3hrs 20m",
					"image":$.sap.getModulePath("com.mindset.fiorimoni", "/images/team2.png")
				}, {
					"User": "Angie Santoni",
					"Hours":"2hrs 45m",
					"image":$.sap.getModulePath("com.mindset.fiorimoni", "/images/team5.png") 
				}, {
					"User": "Selena Long",
					"Hours":"1hrs 25m",
					"image":$.sap.getModulePath("com.mindset.fiorimoni", "/images/team3.png") 
				}]
			};
			/*	, {
						"Error": "Translation entry does not show on the view"
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