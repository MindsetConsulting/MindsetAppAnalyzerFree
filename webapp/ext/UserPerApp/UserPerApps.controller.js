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
			oPopOver.setActionItems({
				type: 'action',
				text: 'Details',
				press: function () {
					console.log('This is a callback function from "Action Button" Action.');
				}
			});
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
})();