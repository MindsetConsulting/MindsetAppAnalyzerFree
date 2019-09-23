sap.ui.define([
	"sap/ui/vbm/AnalyticMap", "sap/ui/model/json/JSONModel", "sap/ui/Device"
],
(function (AnalyticMap, JSONModel, Device) {
	"use strict";
	AnalyticMap.GeoJSONURL = $.sap.getModulePath("com.mindset.fiorimoni", "/media/analyticmap/L0.json");
	/* controller for custom card  */

	sap.ui.controller("com.mindset.fiorimoni.ext.Region.Regions", {

		onInit: function () {
            	var me = this;
			//Call the method when the route and pattern matches
			var oView = me.getView();
			 
				 	var mapModel = new sap.ui.model.json.JSONModel({
				"Circles": [{
					"pos": "77.71551999999997;12.979242;0",
					"tooltip": "Circle: Bangalore",
					"radius": "60",
					"text": "328"
				}, {
					"pos": "121.60171600000001;31.201455;0",
					"tooltip": "Circle: Shanghai",
					"radius": "40",
					"text": "3281"

				}, {
					"pos": "-118.256836;34.061761;0",
					"tooltip": "Circle: Los Angeles",
					"radius": "50",
					"text": "839"
				}, {
					"pos": "-149.908447;61.222669;0",
					"tooltip": "Circle: Anchorage",
					"radius": "30",
					"text": "3218"
				}]
			});
			this.getView().setModel(mapModel, "mapModel");
				this.byId("vbi").setLegendVisible(false);
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
}));