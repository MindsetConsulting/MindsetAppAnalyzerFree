/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller", 
			"sap/ui/model/json/JSONModel",
			"sap/ui/model/odata/ODataModel"],
function (Controller, JSONModel, ODataModel) {
    "use strict";
    return Controller.extend("com.mindset.appanalyzer.ext.AvgFioriLaunchTime.AvgFioriLaunchTimes", {
		onInit: function () {
			var me = this;
			//Call the method when the route and pattern matches
			var oView = me.getView();

		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();