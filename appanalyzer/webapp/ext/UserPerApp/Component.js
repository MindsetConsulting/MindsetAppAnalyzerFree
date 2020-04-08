/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Component"],

	function (CardComponent) {
		"use strict";

		return CardComponent.extend("com.mindset.appanalyzer.ext.UserPerApp.Component", {
			metadata: {
				properties: {
					"contentFragment": {
						"type": "string",
						"defaultValue": "com.mindset.appanalyzer.ext.UserPerApp.UserPerApps"
					},
					"controllerName": {
						"type": "string",
						"defaultValue": "com.mindset.appanalyzer.ext.UserPerApp.UserPerApps"
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
						controllerName: "com.mindset.appanalyzer.ext.UserPerApp.UserPerApps"
					}
				}
			}
		}
	});
});