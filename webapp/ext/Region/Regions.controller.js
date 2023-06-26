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
			this.byId("vbi").setCenterPosition("-111.8976165;40.7689351");
			this.byId("vbi").setLegendVisible(false);
		},
		getGeoPos: function(){
			var that = this;
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			var sPath = "/GeoLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					if(oData.results.length > 0){
						that.byId("vbi").setCenterPosition(oData.results[0].pos);
					}
				},
				error: function (data) {

				}
			});
		},
		onAfterRendering: function () {
			this.byId("vbi").setCenterPosition("-111.8976165;40.7689351");
		},

		onExit: function () {

		}

	});
});