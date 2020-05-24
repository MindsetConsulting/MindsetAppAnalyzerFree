// eslint-disable-next-line no-unused-vars
function initModel() {
	var sUrl = "/sap/opu/odata/mindset/FIORI_MONITOR_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}