/* global sap */
sap.ui.define(["sap/ovp/cards/generic/Card.controller",
		"com/mindset/appanalyzer/lib/googlecharts/loader"
	],
	function (Controller, loader) {
		"use strict";
		return Controller.extend("com.mindset.appanalyzer.ext.Feedback.Feedback", {
		
			onInit: function () {

				google.charts.load('current', {
					'packages': ['gauge']
				});
				google.charts.setOnLoadCallback(this.drawChart(this));
			},

			drawChart: function (oEv) {
				var data = google.visualization.arrayToDataTable([
					['Label', 'Value'],
					['Memory', 80]
				]);

				var options = {
					width: 400,
					height: 120,
					redFrom: 90,
					redTo: 100,
					yellowFrom: 75,
					yellowTo: 90,
					minorTicks: 5
				};

				var chart = new google.visualization.Gauge(oEv.getView().byId("chart_div"));

				chart.draw(data, options);

				setInterval(function () {
					data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
					chart.draw(data, options);
				}, 13000);

			},

			onAfterRendering: function () {

			},

			onExit: function () {

			}

		});
	});