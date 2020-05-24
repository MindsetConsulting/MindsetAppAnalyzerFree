sap.ui.define(["sap/ovp/cards/generic/Component"],
 
    function (CardComponent) {
        "use strict";
 
        return CardComponent.extend("com.mindset.appanalyzer.ext.AvgTimeOnApp.Component", {

		metadata: {
			properties: {
				"contentFragment": {
					"type": "string",
					"defaultValue": "com.mindset.appanalyzer.ext.AvgTimeOnApp.Component"
				},
				"controllerName": {
                        "type": "string",
                        "defaultValue": "com.mindset.appanalyzer.ext.AvgTimeOnApp.Component"
                },
				"footerFragment": {
					"type": "string",
					"defaultValue": ""
				}
			},

			version: "@version@",

			library: "sap.ovp",

			includes: [],

			dependencies: {
				libs: ["sap.m"],
				components: []
			},
			config: {}
		}
	});
});