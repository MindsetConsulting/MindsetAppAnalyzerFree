sap.ui.define([],
function () {
    "use strict";
    sap.ui.controller("com.mindset.appanalyzer.ext.Contact.Contact", {

		onInit: function () {
			var me = this;
			var oView = me.getView();
			// eslint-disable-next-line no-undef
			var smindImagePath = $.sap.getModulePath("com.mindset.appanalyzer", "/images/MindsetLogowhitespace.png");
			var sMindsetimage = oView.byId("mindsetimage");
			sMindsetimage.setSrc(smindImagePath);
			//var oBrowserModel = new sap.ui.model.json.JSONModel(oBrowserModelData);
			//oView.setModel(oBrowserModel, "oBrowserModel");

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