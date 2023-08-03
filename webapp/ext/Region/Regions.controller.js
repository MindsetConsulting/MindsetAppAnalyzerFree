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

			// [{
			// 	pos: '-112.0549;33.4683;0',
			// 	radius: '10',
			// 	tooltip: 'MSP'
			// },{
			// 	pos: '114.0719;51.0447;0',
			// 	radius: '10',
			// 	tooltip: 'CAL'
			// },{
			// 	pos: '78.4867;17.3850;0',
			// 	radius: '10',
			// 	tooltip: 'HYD'
			// }]

			var oGeoModel = new sap.ui.model.json.JSONModel({
				'GeoLocations': []
			});
			oView.setModel(oGeoModel, "GeoModel");
			this.getGeoPos();
		},
		getGeoPos: function(){
			var that = this;
			var oDataModel = this.getModel("fiorimoni");
			var oGeoModel = that.getView().getModel('GeoModel');
			var sPath = "/GeoLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					if(oData.results.length > 0){
						for(var i=0; i<oData.results.length; i++){
							oData.results[i]['tooltip'] = 'Loc'+i;
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