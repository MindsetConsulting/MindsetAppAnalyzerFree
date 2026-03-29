sap.ui.define([], function () {
	"use strict";

	return {

		onInit: function () {
			var oView = this.getView();
			var sImagePath = sap.ui.require.toUrl("com/mindset/appanalyzer/images/MindsetLogowhitespace.png");
			oView.byId("mindsetimage").setSrc(sImagePath);
		},

		handleImagePress: function () {
			window.open("https://www.mindsetconsulting.com/", "_blank");
		}

	};
});
