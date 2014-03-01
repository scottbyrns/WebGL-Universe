console.log("\n______________________________________________________\n\nSTART MAIN PROCESS\n______________________________________________________\n");


var config     = require('./config');
var API     = require('./API');

var restify    = require('restify');
var mysql      = require('mysql');


var Application = function () {
	// this.mysqlConnection = mysql.createConnection({
	// 
	//   host     : config.mysql.host,
	//   user     : config.mysql.user,
	//   password : config.mysql.password,
	//   database : config.mysql.database
	//   
	// });
	// 	
		
	this.server = restify.createServer({
		
	    name : config.restify.name
		
	});

	this.api = new API();
	
};

Application.prototype = {
	
	connectMySQL: function (callback) {
		this.mysqlConnection.connect(function(err) {
	
			// An error occured connecting to the database.
			if (err) {
		
				console.error("Failed to connect to the MySQL DB\n");
				console.error(err);
				process.exit(1);
		
			}
			// Sucessfully connected to the database.
			else {
		
				console.info("Connected to MySQL DB");
				
		
				callback();
			}
	
		});
	},
	
	startServer: function () {
		

		this.server.listen(
			config.restify.port,
			config.restify.address,
			function() {
	
		    	console.info('%s listening at %s:%s ', config.restify.name , config.restify.address, config.restify.port);
				
				this.server.use(restify.queryParser());
				this.server.use(restify.bodyParser());
				this.server.use(restify.CORS());
				
				
				var PATH = '/sdo'
				this.server.get({path : PATH , version : '0.0.1'} , this.api.getSunMap.bind(this.api));
				
				
				this.server.get({path : "/solarSystem" , version : '0.0.1'} , this.api.getSolarSystem.bind(this.api));
				this.server.get({path : "/getPlanetPositions" , version : '0.0.1'} , this.api.getPlanetCoordinates.bind(this.api));				
				
				this.server.get({path : "/getSatelites" , version : '0.0.1'} , this.api.getSatelites.bind(this.api));				
				
				
				this.server.get({path : "/imageProxy" , version : '0.0.1'} , this.api.imageProxy.bind(this.api));
				this.server.get({path : "/solarWind" , version : '0.0.1'} , this.api.getSolarWind.bind(this.api));

				this.server.get({path : "/getMagneticFieldDesnity" , version : '0.0.1'} , this.api.getMagneticFieldDensityInElipticPlane.bind(this.api));				
				
				// this.server.get({path : PATH +'/:jobId' , version : '0.0.1'} , this.api.findJob.bind(this.api));
				// 
				// this.server.post({path : "/jobsBySkill", version : '0.0.1'} , this.api.findJobsBySkills.bind(this.api));
				// 
				// 
				// 
				// this.server.get({path : "/skill", version : '0.0.1'} , this.api.getSkills.bind(this.api));
				// this.server.post({path : "/skill", version : '0.0.1'} , this.api.addSkill.bind(this.api));
				// 
				// this.server.post({path : PATH , version: '0.0.1'} , this.api.postNewJob.bind(this.api));
				
				// this.server.del({path : PATH +'/:jobId' , version: '0.0.1'} ,deleteJob);
				
			}.bind(this)
		);

	}
	
};



var myApp = new Application();
// myApp.connectMySQL(myApp.startServer.bind(myApp));
myApp.startServer();