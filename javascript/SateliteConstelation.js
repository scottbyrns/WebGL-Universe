var SateliteConstelation = function (planet) {
	this.satelites = {};
	this.planet = planet;
	MessageController.addListener("satelite-controller-" + planet.data.name, this.handleMessage.bind(this));
};

SateliteConstelation.prototype = {
	handleMessage: function (message, payload) {
		if (message = "update-satelite-position") {
			this.handleSateliteData(payload);
		}
	},
	handleSateliteData: function (data) {
		if (this.satelites[data.name]) {
			this.satelites[data.name].data = data;
			this.satelites[data.name].model.coordinate = {
				phi: data.lat,
				lambda: data.lon,
				radius: data.magnitude*300
			}
			// console.log("do update")
			this.planet.mesh.updateGeoSymbol(this.satelites[data.name].model);
			// console.log("did update")
		}
		else {
			this.satelites[data.name] = {
				data: data
			}
			// set up the sphere vars
			var radius = 0.6,
			    segments = 9,
			    rings = 9;

				// create the sphere's material
				var sphereMaterial =
				  new THREE.MeshLambertMaterial(
				    {
				      color: 0x0099FF,//0x914a20,
					  transparent:true,
					  opacity:0.8
				    });
			// create a new mesh with
			// sphere geometry - we will cover
			// the sphereMaterial next!
			var sphere = new THREE.Mesh(

			  new THREE.SphereGeometry(
			    radius,
			    segments,
			    rings),

			  sphereMaterial);

			// add the sphere to the scene
			// scene.add(sphere);
			var model = new THREE.GeoSpatialMap.GeoSymbol(sphere, {
				phi: data.lat,
				lambda: data.lon,
				radius: data.magnitude*300
			}, 1E5);
			this.planet.mesh.addGeoSymbol(model);
			this.satelites[data.name].model = model;
			console.log(this.satelites[data.name].data);
		}
	}
};