//http://www.swpc.noaa.gov/SWN/sw_dials.html
var request = require('request');
var cheerio = require('cheerio');


// var RequirementsDAO = require("./RequirementsDAO");
// var LocationsDAO = require("./LocationsDAO");

var SolarWindDAO = function () {
	// this.mysqlConnection = mysqlConnection;
};

SolarWindDAO.prototype = {
	
	getSolarWindData: function (callback) {
		
		var outputData = {
			magneticField: {},
			plasma: {}
		};
		
		request('http://www.swpc.noaa.gov/SWN/sw_dials.html', function (err, resp, body) {

		    if (err) {
		        throw err;
			}
		
		    var $ = cheerio.load(body);

			$("table").each(function () {
				try {
					$("tr:nth-child(2)", this).each(function () {
						outputData.magneticField.totalField = $("td:nth-child(1)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
						outputData.plasma.speed = $("td:nth-child(3)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
					})
				
					$("tr:nth-child(3)", this).each(function () {
						outputData.magneticField.x = $("td:nth-child(1)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
						outputData.plasma.temperature = $("td:nth-child(3)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
					})
				
					$("tr:nth-child(4)", this).each(function () {   
						outputData.magneticField.y = $("td:nth-child(1)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
						outputData.plasma.density = $("td:nth-child(3)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
					})
				
					$("tr:nth-child(5)", this).each(function () {
						outputData.magneticField.z = $("td:nth-child(1)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
						outputData.plasma.pressure = $("td:nth-child(3)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
					})
				
					$("tr:nth-child(6)", this).each(function () {
						outputData.magneticField.beta = $("td:nth-child(1)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
					})
				
					$("tr:nth-child(7)", this).each(function () {
						outputData.magneticField.theta = $("td:nth-child(1)", this).text().split(":")[1].replace(/^\s+|\s+$/g, "");
					})
				}
				catch (e) {
					console.error(e);
				}
			});
			
			callback(outputData);

		});
		
	}
	
};


module.exports = SolarWindDAO;

//convert euvi_195_heliographic.gif -crop 535x267+54+81 euvi_195_heliographic2.gif