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
			var oView = this.getView();
			this.byId("vbi").setCenterPosition("-111.8976165;40.7689351;0");
			this.byId("vbi").setLegendVisible(false);
			
			var oGeoModel = new sap.ui.model.json.JSONModel({
				'GeoLocations': []
			});
			oView.setModel(oGeoModel, "GeoModel");
			this.getGeoPos();
		},
		getGeoPos: function(){
			var that = this;
			var oGeoModel = that.getView().getModel('GeoModel');
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			var sPath = "/GeoLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					if(oData.results.length > 0){
						for(var i=0; i<oData.results.length; i++){
							oData.results[i]['tooltip'] = 'Location '+i;
						}
						oGeoModel.setProperty('/GeoLocations', oData.results);
						that.byId("vbi").setCenterPosition(oData.results[0].pos);
					}
				},
				error: function (data) {

				}
			});
		},
		onAfterRendering: function () {
			this.byId("vbi").setCenterPosition("-111.8976165;40.7689351;0");
		},

		onExit: function () {

		}

	});
});