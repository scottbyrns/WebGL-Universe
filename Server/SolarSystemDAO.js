
var SolarSystemDAO = function () {
	// this.mysqlConnection = mysqlConnection;
	
	this.sourceData = {
			sun: {
				radius: 695500/1E5,
				representation: {
					texture: 'http://localhost:4040/sdo',
					bumpMap: 'http://localhost:4040/sdo'
				}
			},
			// Distance in KM
			// Mass in KG
			planets: [
			{
				name: "Mercury",
				representation: {
					texture: 'textures/Planets/mercurymap.jpg',
					bumpMap: 'textures/Planets/mercurybump.jpg',
					textureOffset: -180.806168
				},
				distance: 5791E4/1E5,
				radius: 2440/1E5,
				rotationPeriod: {
					years: 0,
					days: 58,
					hours: 15,
					minutes: 30
				},
				orbitalPeriod: {
					years: 0,
					days: 88,
					hours: 0,
					minutes: 0
				},
				mass: 328.5E21
			},
			{
				name: "Venus",
				representation: {
					texture: 'textures/Planets/venusmap.jpg',
					bumpMap: 'textures/Planets/venusbump.jpg',
					textureOffset: -180.806168
				},
				distance: 1082E5/1E5,
				radius: 6052/1E5,
				rotationPeriod: {
					years: 0,
					days: 116,
					hours: 18,
					minutes: 0
				},
				orbitalPeriod: {
					years: 0,
					days: 255,
					hours: 0,
					minutes: 0
				},
				mass: 4.867E24
			},

			{
				name: "Earth",
				representation: {
					texture: 'textures/Planets/color.jpg',
					bumpMap: 'textures/Planets/earth.jpg',
					textureOffset: -180.806168,
					depth: {
						low: "depth/earth_low.png"
					}
				},
				distance: 149597870/1E5,
				radius: 6371/1E5,
				rotationPeriod: {
					years: 0,
					days: 1,
					hours: 0,
					minutes: 0
				},
				orbitalPeriod: {
					years: 1,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 5.972E24,
				moons: [
				{
					name: "Luna"
				}
				]
			},

			{
				name: "Mars",
				representation: {
					texture: 'textures/Planets/marsmap.jpg',
					bumpMap: 'textures/Planets/marsbump.jpg',
					textureOffset: -180.806168
				},
				distance: 2279E5/1E5,
				radius: 3390/1E5,
				rotationPeriod: {
					years: 0,
					days: 1,
					hours: 0,
					minutes: 40
				},
				orbitalPeriod: {
					years: 1,
					days: 322,
					hours: 0,
					minutes: 0
				},
				mass: 639E21
			},

			{
				name: "Jupiter",
				representation: {
					texture: 'textures/Planets/jupitermap.jpg'
				},
				distance: 7785E5/1E5,
				radius: 69911/1E5,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 9,
					minutes: 56
				},
				orbitalPeriod: {
					years: 12,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 1.898E27
			},

			{
				name: "Saturn",
				representation: {
					texture: 'textures/Planets/saturnmap.jpg'
				},
				distance: 1433E6/1E5,
				radius: 58232/1E5,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 10,
					minutes: 39
				},
				orbitalPeriod: {
					years: 29,
					days:0,
					hours:0,
					minutes:0
				},
				mass: 568.3E24
			},

			{
				name: "Uranus",
				representation: {
					texture: 'textures/Planets/uranusmap.jpg'
				},
				distance: 2877E6/1E5,
				radius: 25362/1E5,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 17,
					minutes: 14
				},
				orbitalPeriod: {
					years: 84,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 86.81E24
			},
			{
				name: "Neptune",
				representation: {
					texture: 'textures/Planets/neptunemap.jpg'
				},
				distance: 4503E6/1E5,
				radius: 24622/1E5,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 16,
					minutes: 6
				},
				orbitalPeriod: {
					years: 165,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 102.4E24
			}
			]
		};
};

SolarSystemDAO.prototype = {
	
	getPlanetCoordinates: function (callback) {
		// http://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/planet_ecliptic_en.cgi
		
		var data = this.sourceData;
		
		var request = require('request');
		// var http = require('http');
		// var fs = require('fs');
		// var im = require("imagemagick");

		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hour = currentTime.getHours();
		var minute = currentTime.getMinutes();
		var second = currentTime.getSeconds();
		// document.write(month + "/" + day + "/" + year)

		var progress = data.planets.length;

		for (var i = 0, len = data.planets.length; i < len; i += 1) {
			data.planets[i].coordinates = {
				phi: 0,
				lambda: 0,
				radius: 0
			};

			// var file = fs.createWriteStream("euvi_195_heliographic.gif");
			request.post({url: "http://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/planet_ecliptic_en.cgi", form: {
				body: i + 1,
				Go: "Go",
				year: year,
				month: month,
				day: day,
				hour: hour,
				min: minute,
				sec: second,
				lst: -99,
				div: 1,
				divu: 3,
				len: 1,
				lenu: 3,
				dms: 0
			}}, function (index) {
				return function(error, response, body) {
			
					if (error) {
						console.error(error);
						return;
					}
			
					progress -= 1;
				
					var cheerio = require('cheerio');
				    var $ = cheerio.load(body);

					console.log();
			
					$(".result").each(function () {
						$("td:nth-child(3)", this).each(function () {
							var degminsec = $(this).text().replace(/^\s+|\s+$/g, "");
							var parts = degminsec.split(" ");
							var coord = (parts[0]*1) + (parts[1]/60) + (parts[2]/3600);
							data.planets[index].coordinates.phi = coord;
						});
						$("td:nth-child(4)", this).each(function () {
							var degminsec = $(this).text().replace(/^\s+|\s+$/g, "");
							var parts = degminsec.split(" ");
							var coord = (parts[0]*1) + (parts[1]/60) + (parts[2]/3600);
							data.planets[index].coordinates.lambda = coord;
						});
						$("td:nth-child(5)", this).each(function () {
							data.planets[index].coordinates.radius = ($(this).text() * 149597871)/1E5;
						});
					});
					
					if (progress == 0) {
						callback(data);
					}

				}
			}(i));
			
		}

	},
	
	getSolarSystem: function (callback) {

		callback({
			sun: {
				radius: 695500,
				representation: {
					texture: 'http://localhost:4040/sdo',
					// bumpMap: 'http://localhost:4040/sdo'
				}
			},
			// Distance in KM
			// Mass in KG
			planets: [
			{
				name: "Mercury",
				representation: {
					texture: 'textures/Planets/mercurymap.jpg',
					bumpMap: 'textures/Planets/mercurybump.jpg',
					textureOffset: -180.806168
				},
				distance: 5791E4,
				radius: 2440,
				rotationPeriod: {
					years: 0,
					days: 58,
					hours: 15,
					minutes: 30
				},
				orbitalPeriod: {
					years: 0,
					days: 88,
					hours: 0,
					minutes: 0
				},
				mass: 328.5E21
			},
			{
				name: "Venus",
				representation: {
					texture: 'textures/Planets/venusmap.jpg',
					bumpMap: 'textures/Planets/venusbump.jpg',
					textureOffset: -180.806168
				},
				distance: 1082E5,
				radius: 6052,
				rotationPeriod: {
					years: 0,
					days: 116,
					hours: 18,
					minutes: 0
				},
				orbitalPeriod: {
					years: 0,
					days: 255,
					hours: 0,
					minutes: 0
				},
				mass: 4.867E24
			},

			{
				name: "Earth",
				representation: {
					texture: 'textures/Planets/color.jpg',
					bumpMap: 'textures/Planets/earth.jpg',
					textureOffset: -180.806168
				},
				distance: 149597870,
				radius: 6371,
				rotationPeriod: {
					years: 0,
					days: 1,
					hours: 0,
					minutes: 0
				},
				orbitalPeriod: {
					years: 1,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 5.972E24,
				moons: [
				{
					name: "Luna"
				}
				]
			},

			{
				name: "Mars",
				representation: {
					texture: 'textures/Planets/marsmap.jpg',
					bumpMap: 'textures/Planets/marsbump.jpg',
					textureOffset: -180.806168
				},
				distance: 2279E5,
				radius: 3390,
				rotationPeriod: {
					years: 0,
					days: 1,
					hours: 0,
					minutes: 40
				},
				orbitalPeriod: {
					years: 1,
					days: 322,
					hours: 0,
					minutes: 0
				},
				mass: 639E21
			},

			{
				name: "Jupiter",
				representation: {
					texture: 'textures/Planets/jupitermap.jpg'
				},
				distance: 7785E5,
				radius: 69911,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 9,
					minutes: 56
				},
				orbitalPeriod: {
					years: 12,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 1.898E27
			},

			{
				name: "Saturn",
				representation: {
					texture: 'textures/Planets/saturnmap.jpg'
				},
				distance: 1433E6,
				radius: 58232,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 10,
					minutes: 39
				},
				orbitalPeriod: {
					years: 29,
					days:0,
					hours:0,
					minutes:0
				},
				mass: 568.3E24
			},

			{
				name: "Uranus",
				representation: {
					texture: 'textures/Planets/uranusmap.jpg'
				},
				distance: 2877E6,
				radius: 25362,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 17,
					minutes: 14
				},
				orbitalPeriod: {
					years: 84,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 86.81E24
			},
			{
				name: "Neptune",
				representation: {
					texture: 'textures/Planets/neptunemap.jpg'
				},
				distance: 4503E6,
				radius: 24622,
				rotationPeriod: {
					years: 0,
					days: 0,
					hours: 16,
					minutes: 6
				},
				orbitalPeriod: {
					years: 165,
					days: 0,
					hours: 0,
					minutes: 0
				},
				mass: 102.4E24
			}
			]
		});

	}
	
};


module.exports = SolarSystemDAO;

//convert euvi_195_heliographic.gif -crop 535x267+54+81 euvi_195_heliographic2.gif