//http://ccmc.gsfc.nasa.gov/cgi-bin/display/RT_t.cgi?page=helio

var request = require('request');
var cheerio = require('cheerio');


// var RequirementsDAO = require("./RequirementsDAO");
// var LocationsDAO = require("./LocationsDAO");

var HelioSphereDAO = function () {
	// this.mysqlConnection = mysqlConnection;
};

HelioSphereDAO.prototype = {
	
	getMagneticFieldDensityInElipticPlane: function (callback) {
		
		
		// request({
		// 	url:'http://iswa.ccmc.gsfc.nasa.gov/IswaSystemWebApp/StreamByDataIdServlet?allDataId=631686015',
		// 	headers: {
		// 		'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36",
		// 		'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		// 		"Accept-Encoding":"gzip,deflate,sdch",
		// 		"Accept-Language":"en-US,en;q=0.8",
		// 		"Cache-Control":"no-cache",
		// 		"Connection":"keep-alive"
		// 	}
		// }, function (err, resp, body) {
			// 
			// 		    if (err) {
			// 		        throw err;
			// }
			// 		
			// 		    var $ = cheerio.load(body);
			// 
			// var done = false;
			// // console.log(body);
			// $("img").each(function () {
			// 	if ( done ) {
			// 		return;
			// 	}
			// 
			// 	if ($(this).attr("src").indexOf("timestamp") > -1) {
			// 		done = true;
			// 		var url = $(this).attr("src");
			// 		
			// 		
			// 		// 539 555
		
					var http = require('http');
					var fs = require('fs');
					var im = require("imagemagick");

					var file = fs.createWriteStream("magneticFieldDensity.png");
					var request = http.get('http://iswa.ccmc.gsfc.nasa.gov/IswaSystemWebApp/StreamByDataIdServlet?allDataId=631686015', function(response) {
					  response.pipe(file);
		  
					  response.on('end', function () {
						  im.convert([
			    
								"magneticFieldDensity.png",
								// "(",
								"-crop",
								"402x402+40+111",
								"+repage",
								"(",
								"+clone",
								"-threshold",
								"-1",
								"-negate",
								"-fill",
								"white",
								"-draw",
								"circle 200,200 201,10",
								")",
								"-flip",
								"-alpha",
								"off",
								"-compose",
								"copy_opacity",
								"-composite",
								"magneticFieldDensity.png",
								// ")",
			  
							  ], function () {
								  console.info("First pass complete");
										  im.convert([
										  			    
  												"magneticFieldDensity.png",
  				  								"-transparent",
  				  								"black",
  				  								"-transparent",
  				  								"white",
  				  								"-transparent",
  				  								"red",
  				  								"-transparent",
  				  								"blue",
  												// "-scale",
  												// "150%",
  												"-channel",
  												"RGBA",
  												"-radial-blur",
  												"30",
  												"-blur",
  												"60",
  												"-radial-blur",
  												"30",
  												"-blur",
  												"60",
  												"-blur",
  												"60",
  												"-blur",
  												"60",
  												"-negate",
  												"-fill",
  												"black",
  												"-opaque",
  												"white",
  												"-negate",
  												// "-fill",
  												// "black",
  												// "-opaque",
  												// "white",
												"-transparent",
												"white",
												"-transparent",
												"black",
												"-alpha",
												"off",
  												"magneticFieldDensity.png",
  												// ")",
  			  
  											  ], function () {
												  console.log("Second Pass Complete");
												  im.convert([

			  												"magneticFieldDensity.png",
			  												// "RGBA",
			  												// "-blur",
			  												// "30",
			  				  								// "-transparent",
			  				  								// "black",
			  				  								// "-transparent",
			  				  								// "white",
															"+antialias",
															"(",
															"+clone",
															"-threshold",
															"-1",
															"-negate",
															"-fill",
															"white",
															"-draw",
															"circle 200,200 201,12",
															")",
															"-alpha",
															"off",
															"-compose",
															"copy_opacity",
															"-composite",
			  												"magneticFieldDensity.png",
			  												// ")",

			  											  ], function () {

															  console.log("Third Pass Complete");
															  im.convert([

						  												"magneticFieldDensity.png",
						  												// "RGBA",
						  												// "-blur",
						  												// "30",
						  				  								// "-transparent",
						  				  								// "black",
						  				  								// "-transparent",
						  				  								// "white",
																		// "(",
																		// "+clone",
																		// "-threshold",
																		// "-1",
																		// "-negate",
																		"+antialias",
																		"-fill",
																		"white",
																		"-draw",
																		"circle 200,200 200,185",
																		// ")",
																		// "-alpha",
																		// "off",
																		// "-compose",
																		// "copy_opacity",
																		// "-composite",
						  												"magneticFieldDensity.png",
						  												// ")",

						  											  ], function () {

																		  console.log("Fourth Pass Complete");
																		  im.convert([

									  												"magneticFieldDensity.png",
																					
									  												// "RGBA",
									  												// "-blur",
									  												// "30",
									  				  								"-transparent",
									  				  								"black",
									  				  								"-transparent",
									  				  								"white",
									  												"-scale",
									  												"256",
									  												"magneticFieldDensity.png",
									  												// ")",

									  											  ], function () {

																		  console.log("Fourth Pass Complete");
									  												  callback("magneticFieldDensity.png");

																			  });

																  });

													  });
										  			
										  });

						  });
		  	
					  })
				// 	});
				// 	
				// 	
				// 
				// 	// console.log(url);
				// 	// callback(url);
				// }
				// 
		// 
		// 	});
		// 	
		// 
		// 
		});
		
	}
	
};


module.exports = HelioSphereDAO;

//convert euvi_195_heliographic.gif -crop 535x267+54+81 euvi_195_heliographic2.gif