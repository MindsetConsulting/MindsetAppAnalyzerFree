(function () {
	"use strict";

	/* controller for custom card  */

	sap.ui.controller("com.mindset.appanalyzer.ext.UserPerApp.UserPerApps", {

		onInit: function () {
			var that = this;
			var oView = that.getView();
			var oUserPerAppModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(oUserPerAppModel, "oUserPerAppModel");
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
			var oDataModel = this.getModel("fiorimoni");
			oView.setModel(oDataModel);
			var sPath = "/AppLogInSet";
			oDataModel.read(sPath, {
				success: function (oData, oRes) {
					var results = that.dataSort(oData);
					oUserPerAppModel.setData(results);
					oUserPerAppModel.updateBindings(true);
				},
				error: function (data) {

				}
			});
			this.byId("idVizFrame").setLegendVisible(false);
			this.byId("idVizFrame").attachSelectData(that.navToDetail, that);
		},

		navToDetail: function (oEvent) {
			// var descr = oEvent.getParameter("data")[0]["data"]["AppDescription"];
			// var aResults = this.getView().getModel('oUserPerAppModel').getProperty('/results');
			// var oCrossAppNav = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");
			// var sObj = aResults.find(function(el){
			// 	return el.AppDescription == descr;
			// });
			// oCrossAppNav.toExternal({
			// 	target: { semanticObject : sObj ? sObj.SemanticObject : '', action : sObj ? sObj.SemanticAction : '' },
			// 	params: { "App": descr }
			// });

			var descr = oEvent.getParameter("data")[0]["data"]["AppDescription"];
			var oCrossAppNav = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");
			oCrossAppNav.toExternal({
				target: { semanticObject : "analyzerDetail", action : "display" },
				params: { "App": descr }
			});
		},

		dataSort: function (dataset) {
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