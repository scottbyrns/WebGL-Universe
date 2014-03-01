

var SolarWind = function () {
	
	this.solarWindWorker = new Worker("javascript/workers/SolarWindWorker.js");
	this.solarWindWorker.onmessage = this.solarWindWorkerResultHandler.bind(this);
	
	
	this.bindControllers();
	
	this.loadDepthMap();
	
};

SolarWind.prototype = {
	
	bindControllers: function () {
		MessageController.addListener("solar-wind-controller", this.controllerDispatch.bind(this));
	},
	
	controllerDispatch: function (message, callback) {
		if (message == "toggle-solar-winds") {
			console.log("Do toggle solar winds")
			this.toggleSolarWinds();
		}
	},
	
	toggleSolarWinds: function () {
		if (this.magneticField.visible) {
			this.magneticField.visible=false;
		}
		else {
			this.magneticField.visible=true;
		}	
	},
	
	loadDepthMap: function () {
		THREE.ImageUtils.loadDepthMap(
			'http://localhost:4040/getMagneticFieldDesnity',
			this.depthMapCallback.bind(this),
			this.depthMapFilter.bind(this)
		);
	},
	
	depthMapFilter: function (pixel) {

		// Invert
				
		// red
		pixel.r = 255 - pixel.r;
		// green
		pixel.g = 255 - pixel.g;
		// blue
		pixel.b = 255 - pixel.b;
				
	
		// Grey Scale
	
		var brightness = 0.34 * pixel.r + 0.5 * pixel.g + 0.16 * pixel.b;
	
		// red
		pixel.r = brightness;
		// green
		pixel.g = brightness;
		// blue
		pixel.b = brightness;


		return pixel;

	},
	
	solarWindWorkerResultHandler: function (event) {
		
		for ( var i = 0, l = this.solarWindGeometry.vertices.length; i < l; i++ ) {
			this.solarWindGeometry.vertices[i].x = event.data[i].x;
			this.solarWindGeometry.vertices[i].y = event.data[i].y;
			this.solarWindGeometry.vertices[i].z = event.data[i].z;
		}
		
		this.solarWindGeometry.verticesNeedUpdate = true;
		
		this.buildRepresentation();
	},
	
	textureLoadHandler: function () {
		
		this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping; 
		
		this.material = new THREE.MeshPhongMaterial({
			wireframe: true,
			map: this.texture,
			blending:THREE.AdditiveBlending,
			side: THREE.DoubleSide,
			transparent:true,
			opacity:0.2
		});
		
		this.magneticField = new THREE.Mesh(this.solarWindGeometry, this.material);


		this.magneticField.rotation.x = Math.PI / 2;
		this.magneticField.rotation.z = (Math.PI / 8);

		MessageController.sendMessage("app-controller", "add-object-to-scene", this.magneticField);

		this.magneticField.visible = false;	
		
	},
	
	buildRepresentation: function () {
		
		this.texture = THREE.ImageUtils.loadTexture(
			'http://localhost:4040/getMagneticFieldDesnity',
			undefined,
			this.textureLoadHandler.bind(this)
		);
		
	},
	
	depthMapCallback: function (data, width, height) {
		
		this.solarWindGeometry = new THREE.PlaneGeometry(5985E5/1E5, 5985E5/1E5, (width-1), (height-1));
				
		this.solarWindWorker.postMessage({
			depth: data,
			vertices: this.solarWindGeometry.vertices
		});
		
	}
	
};

