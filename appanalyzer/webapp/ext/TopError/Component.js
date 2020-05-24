sap.ui.define(["sap/ovp/cards/generic/Component"],

	function (CardComponent) {
		"use strict";

		return CardComponent.extend("com.mindset.appanalyzer.ext.TopError.Component", {
			metadata: {
				properties: {
					"contentFragment": {
						"type": "string",
						"defaultValue": "com.mindset.appanalyzer.ext.TopError.TopErrors"
					},
					"controllerName": {
						"type": "string",
						"defaultValue": "com.mindset.appanalyzer.ext.TopError.TopErrors"
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
			config: {},
			customizing: {
				"sap.ui.controllerExtensions": {
					"sap.ovp.cards.generic.Card": {
						controllerName: "com.mindset.appanalyzer.ext.TopError.TopErrors"
					}
				}
			}
		}
	});
});