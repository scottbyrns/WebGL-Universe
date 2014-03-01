// http://science.nasa.gov/media/sot/tle/SMD.txt




var SateliteDAO = function () {
	this.sateliteGroups = [
							"SMD",
							"visual",
							"cosmos-2251-debris",
							"1999-025",
							"iridium-33-debris",
							"tle-new",
							"stations",
							"dmc",
							"resource",
							"goes",
							"noaa",
							"sarsat",
							"tdrss",
							"weather",
							"amateur",
							"x-comm",
							"geo",
							"globalstar",
							"gorizont",
							"intelsat",
							"iridium",
							"molniya",
							"other-comm",
							"orbcomm",
							"raduga",
							"gps-ops",
							"galileo",
							"glo-ops",
							"nnss",
							"musson",
							"sbas",
							"education",
							"engineering",
							"geodetic",
							"science",
							"cubesat",
							"military",
							"other",
							"radar"
						];
};

SateliteDAO.prototype = {
	
	getSateliteLocations: function (callback) {
		//http://science.nasa.gov/media/sot/tle/{group}.txt
		
		var data = this.sourceData;
		
		var request = require('request');
		// var http = require('http');
		// var fs = require('fs');
		// var im = require("imagemagick");
		var lim = this.sateliteGroups.length;
		
		var output = "";
		for (var i = 0, len = this.sateliteGroups.length; i < len; i += 1) {
			

			request("http://science.nasa.gov/media/sot/tle/" + this.sateliteGroups[i] + ".txt", function (error, response, body) {
		
				if (error) {
					console.error(error);
					return;
				}
				
				output += body;
				
				if (!--lim) {
					callback(new Buffer(output, 'ascii').toString('utf8'));
				}
				
			});


		}

	}
	
};


module.exports = SateliteDAO;

//convert euvi_195_heliographic.gif -crop 535x267+54+81 euvi_195_heliographic2.gif