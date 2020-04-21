/* global sap */
sap.ui.define(["sap/ovp/cards/custom/Component"],

	function (Component) {
		"use strict";

		return Component.extend("com.mindset.appanalyzer.ext.Feedback.Component", {
			
			metadata: {
				properties: {
					"contentFragment": {
						"type": "string",
						"defaultValue": "com.mindset.appanalyzer.ext.Feedback.Feedback"
					},
					"controllerName": {
						"type": "string",
						"defaultValue": "com.mindset.appanalyzer.ext.Feedback.Feedback"
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
							controllerName: "com.mindset.appanalyzer.ext.Feedback.Feedback"
						}
					}
				}
			}
		});
	});