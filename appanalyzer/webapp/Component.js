(function () {
	"use strict";
	/*global jQuery */

	/**
	 * @fileOverview Application component to display information on entities from the GWSAMPLE_BASIC
	 *   OData service.
	 * @version @version@
	 */
	jQuery.sap.declare("com.mindset.appanalyzer.Component");

	jQuery.sap.require("sap.ovp.app.Component");

	sap.ovp.app.Component.extend("com.mindset.appanalyzer.Component", {
		metadata: {
			manifest: "json"
		}

	});
}());