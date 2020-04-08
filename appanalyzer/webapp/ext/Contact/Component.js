/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Component"],
 
    function (CardComponent) {
        "use strict";
 
        return CardComponent.extend("com.mindset.appanalyzer.ext.Contact.Component", {

		metadata: {
			properties: {
				"contentFragment": {
					"type": "string",
					"defaultValue": "com.mindset.appanalyzer.ext.Contact.Contact"
				},
				"controllerName": {
                        "type": "string",
                        "defaultValue": "com.mindset.appanalyzer.ext.Contact.Contact"
                },
				"headerFragment": {
					"type": "string",
					"defaultValue": ""
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