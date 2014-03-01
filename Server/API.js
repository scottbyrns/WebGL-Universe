var APIResponse     = require('./APIResponse');
var SDODAO 		= require('./SDODAO');
var SolarSystemDAO = require('./SolarSystemDAO');
var SolarWindDAO = require('./SolarWindDAO');
var HelioSphereDAO = require('./HelioSphereDAO');
var SateliteDAO = require("./DataAccess/SateliteDAO");
// var RequirementsDAO 		= require('./RequirementsDAO');

var API = function (mysqlConnection) {

	this.sdoDAO = new SDODAO();
	this.solarSystemDAO = new SolarSystemDAO();
	this.solarWindDAO = new SolarWindDAO();
	this.helioSphereDAO = new HelioSphereDAO();
	this.sateliteDAO = new SateliteDAO();
};


 
API.prototype = {
	
	imageProxy: function (req, res, next) {
		// console.log('asdf')
		var http = require('http');
		var fs = require('fs');
		// var im = require("imagemagick");

		var lat = req.params.lat;
		var lon = req.params.lon;
		var depth = req.params.depth;
		
		res.setHeader('Access-Control-Allow-Origin','*');
		res.setHeader('Content-Type', 'image/gif');
		
		var fileName = "tiles/" + lat+lon+depth+".gif";
		
		fs.exists(fileName, function(exists) {
		    if (exists) {
  				fs.readFile(fileName, function (err, data) {
  					// console.log(data)
  				  if (err) {
  					  console.error(err);
  				  }
  				  // console.log(data);
		res.setHeader('Access-Control-Allow-Origin','*');
  				  res.send(200, data);
  				});
		    }
			else {
				var file = fs.createWriteStream(fileName);
				console.log("http://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=400x400&sensor=false")
				var request = http.get("http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=" + 21-depth + "&size=400x400&sensor=false", function(response) {
					response.pipe(file);

					response.on('end', function () {
					  var im = require("imagemagick");
					  im.convert([
    
							fileName,
							"-alpha",
							"off",
							fileName
							// ")",
  
						  ], function () {
			  				fs.readFile(fileName, function (err, data) {
			  					// console.log(data)
			  				  if (err) {
			  					  console.error(err);
			  				  }
			  				  // console.log(data);
			  				  res.send(200, data);
			  				});

						  });
						// console.log('done')
				
					});
			    });
			}
		});
		

	},
	
	getSatelites: function (req, res, next) {

			res.setHeader('Access-Control-Allow-Origin','*');
			res.setHeader('Content-Type', 'text/plain');
	
			this.sateliteDAO.getSateliteLocations(function (data) {
				res.send(200, data);
			});
			
	},
	
	getPlanetCoordinates: function (req, res, next) {
	
		res.setHeader('Access-Control-Allow-Origin','*');
	
	
		this.solarSystemDAO.getPlanetCoordinates(function (data) {
			res.send(200, data);
		});
		
	},
	
	getMagneticFieldDensityInElipticPlane: function (req, res, next) {
	
		this.helioSphereDAO.getMagneticFieldDensityInElipticPlane(function (image) {
			
			
			var fs = require('fs');
			
			res.setHeader('Access-Control-Allow-Origin','*');
			res.setHeader('Content-Type', 'image/gif');
			// var response = new APIResponse(200, {}, data);
			// console.log(image);
			fs.readFile(image, function (err, data) {
			  if (err) {
				  console.error(err);
			  }
			  // console.log(data);
			  res.send(200, data);
			});
			
			
		});
		
	},
	
	getSunMap: function (req, res, next) {
		this.sdoDAO.getSunMap(function (image) {
			
			var fs = require('fs');
			
			res.setHeader('Access-Control-Allow-Origin','*');
			res.setHeader('Content-Type', 'image/gif');
			// var response = new APIResponse(200, {}, data);
			console.log(image);
			fs.readFile(image, function (err, data) {
			  if (err) {
				  console.error(err);
			  }
			  console.log(data);
			  res.send(200, data);
			});
			// res.send(200 , response);
				
		});
	},
	
	getSolarSystem: function (req, res, next) {
		this.solarSystemDAO.getSolarSystem(function (data) {
			res.setHeader('Access-Control-Allow-Origin','*');
			res.send(200, data);
		});
	},
	
	getSolarWind: function (req, res, next) {
		this.solarWindDAO.getSolarWindData(function (data) {
			res.setHeader('Access-Control-Allow-Origin','*');
			res.send(200, data);
		});
	}

};

module.exports = API;