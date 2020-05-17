sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/odata/v2/ODataModel'
], function (Controller, ODataModel) {
	"use strict";
	return Controller.extend("com.mindset.analyzerdetail.AppAnalyzerDetail.controller.App", {
		onInit: function () {
			var oModel, oView;
			oModel = new ODataModel("/sap/opu/odata/MINDSET/FIORI_MONITOR_SRV/", {});
			oView = this.getView();
			oView.setModel(oModel);
			var oStartupParameters = this.getMyComponent().getComponentData().startupParameters;
		},
		/**
		 *@memberOf com.mindset.analyzerdetail.AppAnalyzerDetail.controller.App
		 */
		onSearch: function (oEvent) {

		},
		getMyComponent: function () {
			"use strict";
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			return sap.ui.component(sComponentId);
		}
	});
});