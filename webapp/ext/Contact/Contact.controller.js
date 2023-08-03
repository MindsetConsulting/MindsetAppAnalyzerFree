/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller", 
			"sap/ui/model/json/JSONModel",
			"sap/ui/model/odata/ODataModel"],
function (Controller, JSONModel, ODataModel) {
    "use strict";
    sap.ui.controller("com.mindset.appanalyzer.ext.Contact.Contact", {

		onInit: function () {
			var me = this;
			var oView = me.getView();
			var smindImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/MindsetLogowhitespace.png");
			var sMindsetimage = oView.byId("mindsetimage");
			sMindsetimage.setSrc(smindImagePath);
		},
		
		handleImagePress: function () {
			window.open("https://www.mindsetconsulting.com/","_blank");
		},

		onAfterRendering: function () {

		},

		onExit: function () {

		}

	});
});