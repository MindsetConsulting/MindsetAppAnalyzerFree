/* global sap */
sap.ui.define([
	"sap/ui/vbm/AnalyticMap", 
	"sap/ui/model/json/JSONModel", 
	"sap/ui/Device"
],
function (AnalyticMap, JSONModel, Device) {
	"use strict";
	AnalyticMap.GeoJSONURL = $.sap.getModulePath("com.mindset.appanalyzer", "/media/analyticmap/L0.json");
	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.Region.Regions", {

		onInit: function () {

				this.byId("vbi").setLegendVisible(false);
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
});