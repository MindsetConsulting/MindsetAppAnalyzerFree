/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller", 
			"sap/ui/model/json/JSONModel",
			"sap/ui/model/odata/ODataModel"],
function (Controller, JSONModel, ODataModel) {
    "use strict";
    return Controller.extend("com.mindset.appanalyzer.ext.AvgTimeOnApp.AvgTimeOnApps", {
		onInit: function () {
			var me = this;
			//Call the method when the route and pattern matches
			var oView = me.getView();
			var data = {
				"apps": [{
					"Appname": "Rebates App",
					"users": 455,
					"Time": 60
				}, {
					"Appname": "Agreements App",
					"users": 350,
					"Time": 45
				}, {
					"Appname": "Approval App",
					"users": 300,
					"Time": 35
				}, {
					"Appname": "Route fiorimoni App",
					"users": "253",
					"Time": 30
				}, {
					"Appname": "Rebate Settlement App",
					"users": "100",
					"Time": 25
				}, {
					"Appname": "OPA App",
					"users": "120",
					"Time": 20
				}, {
					"Appname": "User Report App",
					"users": "80",
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
					"User": "Ajay"
				}, {
					"User": "Gavin"
				}, {
					"User": "Shinjan"
				}, {
					"User": "jonathanbragg"
				}]
			};
			/*	, {
						"Error": "Translation entry does not show on the view"
					}*/
			var oUserPerAppModel = new sap.ui.model.json.JSONModel(data);
			me.getView().setModel(oUserPerAppModel, "oUserPerAppModel");
			var oAvgTimeperApp = this.oAvgTimeperApp = this.getView().byId("idAvgTimeOnAppsViz");
			oAvgTimeperApp.setVizProperties({
				plotArea: {
					dataLabel: {

						visible: true
					}
				},
				valueAxis: {
					label: {

					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false,

				}
			});
			this.byId("idAvgTimeOnAppsViz").setLegendVisible(false);
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
});