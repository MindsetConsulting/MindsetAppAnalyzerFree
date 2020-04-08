/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller", 
			"sap/ui/model/json/JSONModel",
			"sap/ui/model/odata/ODataModel"],
function (Controller, JSONModel, ODataModel) {
    "use strict";
    return Controller.extend("com.mindset.appanalyzer.ext.UserPerApp.UserPerApps", {
    	onInit: function () {
			var me = this;
			//Call the method when the route and pattern matches

			/*	
				
					"card07": {
				"model": "fiorimoni",
				"template": "com.mindset.appanalyzer.ext.UserPerApp",
				"settings": {
					"title": "{{UserPerApp}}",
					"defaultSpan": {
						"cols": 3,
						"rows": 8
					}
				}
			}
			
			 */

			/* 
			 	"card07": {
				"model": "fiorimoni",
				"template": "sap.ovp.cards.charts.analytical",
				"settings": {
					"title": "{{AvgTimeOnApps}}",
					"entitySet": "AppLogInSet",
					"chartAnnotationPath": "com.sap.vocabularies.UI.v1.Chart",
					"navigation": "dataPointNav"
				}
			}
			 
			 */
			var oView = me.getView();
			var oUserPerAppModel = new sap.ui.model.json.JSONModel();
			me.getView().setModel(oUserPerAppModel, "oUserPerAppModel");
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");

			oVizFrame.setVizProperties({
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
					text: 'Appviews Today by App'
				}
			});
			oVizFrame.setModel(oUserPerAppModel);
			var sUrl = "/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/";
			// var sUrl = "/sap/opu/odata/sap/ZMND_FIORI_MONITOR_SRV/";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl, true, "", "");
			oView.setModel(oDataModel);
			var sPath = "/AppLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					var results = me.dataSort(oData);
					oUserPerAppModel.setData(results);
					oUserPerAppModel.updateBindings(true);
				},
				error: function (data) {

				}
			});
			this.byId("idVizFrame").setLegendVisible(false);
			var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
		},
		dataSort: function (dataset) {
			//let data sorted by revenue
			if (dataset && dataset.hasOwnProperty("results")) {
				var arr = dataset.results;
				arr = arr.sort(function (a, b) {
					return b.Pageviews - a.Pageviews;
				});
				return dataset;
			}
		},
		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
});