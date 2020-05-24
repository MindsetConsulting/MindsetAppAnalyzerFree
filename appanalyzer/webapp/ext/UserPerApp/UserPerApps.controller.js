(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.UserPerApp.UserPerApps", {

		onInit: function () {
			var me = this;
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
				// eslint-disable-next-line no-unused-vars
				success: function (oData, oRes) {
					var results = me.dataSort(oData);
					oUserPerAppModel.setData(results);
					oUserPerAppModel.updateBindings(true);
				},
				error: function () {

				}
			});
			this.byId("idVizFrame").setLegendVisible(false);

			var valueAction = [{
				type: 'action',
				text: 'Details',
				press: function () {
					var oCrossAppNav = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");
					oCrossAppNav && oCrossAppNav.toExternal({
						target: {
							shellHash: "AnalyzerDetail-display"
						}
					});
				}
			}];

			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setActionItems(valueAction);
		},

		dataSort: function (dataset) {
			//let data sorted by revenue
			// eslint-disable-next-line no-prototype-builtins
			if (dataset && dataset.hasOwnProperty("results")) {
				// WARNING: Array.sort is an in-place sort, so we make this explicit
				dataset.results.sort(function (a, b) {
					return b.Pageviews - a.Pageviews;
				});
			}
			return dataset
		},
		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
})();