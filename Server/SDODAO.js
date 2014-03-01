// var RequirementsDAO = require("./RequirementsDAO");
// var LocationsDAO = require("./LocationsDAO");

var SDODAO = function () {
	// this.mysqlConnection = mysqlConnection;
};

SDODAO.prototype = {
	
	getSunMap: function (callback) {
		
		var http = require('http');
		var fs = require('fs');
		var im = require("imagemagick");

		var file = fs.createWriteStream("euvi_195_heliographic.gif");
		var request = http.get("http://stereo.gsfc.nasa.gov/beacon/euvi_195_heliographic.gif", function(response) {
		  response.pipe(file);
		  
		  response.on('end', function () {
			  im.convert([
			    
					"euvi_195_heliographic.gif",
					"-crop",
					"535x267+81+54",
					"+repage",
					"-colorspace",
					"gray",
					"-colorize",
					"1,48,93",
					"-gamma",
					"1.5",
					"-brightness-contrast",
					"20x80",
					"-scale",
					"200%",
					"-channel",
					"RGBA",
					// "-radial-blur",
					// "30",

					"euvi_195_heliographic.png"
			  
				  ], function () {
			  		  // console.log(arguments);
					  im.convert([
			    
							"euvi_195_heliographic.png",

							"-channel",
							"RGBA",
							// "-radial-blur",
							// "30",
							"-blur",
							"90",
							"euvi_195_heliographic.png"
			  
						  ], function () {
					  		  // console.log(arguments);
							  callback("euvi_195_heliographic.png");
			
					  });
			
			  });
		  	
		  })
		});
		
	}
	
};


module.exports = SDODAO;

//convert euvi_195_heliographic.gif -crop 535x267+54+81 euvi_195_heliographic2.gif