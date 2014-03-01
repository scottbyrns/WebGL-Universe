


THREE.App = function (config) {

	config = config || {};

	var rendererConfig = config.rendererConfig || { antialias: true, precision: "highp" };
	
	var width = config.width || window.innerWidth;
	var height = config.height || window.innerHeight;

	this.scenes = [new THREE.Scene()];
	this.cameras = [];
	
	this.renderer = new THREE.WebGLRenderer(rendererConfig);
	
	this.renderer.setSize(width, height);
	document.body.appendChild(this.renderer.domElement);
	
	this.activeScene = this.scenes[0];
	this.activeCamera = config.camera;
	
	
	this.frustum = new THREE.Frustum();
	this.cameraViewProjectionMatrix = new THREE.Matrix4();
	
	this.activeScene.add(this.activeCamera);
	
	this.renderStages = [];
	
	this.lastRenderTime = 0;
	
	this.bindControllers();
	
	
	// Track which objects are in view.
	// MessageController.sendMessage("app-controller", "add-render-stage", {name: "compute-frustum", stage:function (delta) {
	// 	MessageController.sendMessage("app-controller", "get-camera", function (camera, frustum, viewProjectionMatrix) {
	// 		camera.updateMatrixWorld(); // make sure the camera matrix is updated
	// 		camera.matrixWorldInverse.getInverse( camera.matrixWorld );
	// 		viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
	// 		frustum.setFromMatrix( viewProjectionMatrix );
	// 		// frustum is now ready to check all the objects you need
	// 	});
	// }});
	
};

THREE.App.prototype = {

	bindControllers: function () {
		MessageController.addListener("app-controller", this.dispatchControllerAction.bind(this));
	},
	
	dispatchControllerAction: function (action, data) {
		
		if (action == "add-object-to-scene") {
			this.activeScene.add(data);
		}
		if (action == "remove-object-from-scene") {
			this.activeScene.remove(data);
		}
		if (action == "target-controls") {
			this.controls.target = data;
		}
		if (action == "move-camera-to") {
			this.activeCamera.position.x = data.x;
			this.activeCamera.position.y = data.y;
			this.activeCamera.position.z = data.z;
		}
		if (action == "set-minimum-zoom-level") {
			// alert(data);
			this.controls.minDistance = data;
		}
		if (action == "set-minimum-zoom-level-reached-callback") {
			// alert(data);
			this.setOnLimitCallback(data);
		}
		if (action == "point-camera-at") {
			this.activeCamera.lookAt(data);
		}
		
		if (action == "add-render-stage") {
			this.addRenderStage(data.name, data.stage);
		}
		
		if (action == "remove-render-stage") {
			this.removeRenderStage(data.name);
		}
		
		if (action == "get-camera") {
			try {
				data(this.activeCamera, this.frustum, this.cameraViewProjectionMatrix);
			}
			catch (e) {
				console.error(e);
			}
		}
		
	},
	
	setControls: function (controls) {
		this.controls = controls;
		this.controls.onLimitCallback = this.onLimitCallback;
	},
	
	setOnLimitCallback: function (callback) {
		this.onLimitCallback = callback;
		if (this.controls) {
			this.controls.onLimitCallback = this.onLimitCallback;
		}
	},

	render: function () {
		
		if (this.lastRenderTime == 0) {
			this.lastRenderTime = new Date();
		}
		
		var date = new Date();
		
		var renderDelta = date - this.lastRenderTime;
		this.lastRenderTime = date;
		
		for (var stage in this.renderStages) {
			if (this.renderStages.hasOwnProperty(stage)) {
				// try {
					this.renderStages[stage](renderDelta);
				// }
				// catch (e) {
				// 	console.error(e);
				// }
			}
		}
		
		this.renderer.render(this.activeScene, this.activeCamera);
	},
	
	addRenderStage: function (name, stage) {
		this.renderStages[name] = stage;
	},
	
	removeRenderStage: function (name) {
		delete this.renderStages[name];
	},

	startAnimation: function () {
		this.animationIsRunning = true;
		this.animateLoop();		
	},
	
	stopAnimation: function () {
		this.animationIsRunning = false;
	},
	
	animateLoop: function () {
		if (this.animationIsRunning) {
			requestAnimationFrame(this.animateLoop.bind(this));
			this.render();
		}
	},
	
	buildStage: function (callback) {
		try {
			callback(this, this.activeScene, this.activeCamera, this.renderer);
		}
		catch (e) {
			console.error(e);
		}
	}
	
};



// 
// MessageController.sendMessage("app-controller", "add-render-stage", function (delta) {
// 	MessageController.sendMessage("app-controller", "get-camera", function (camera, frustum, viewProjectionMatrix) {
// 		if (frustum.intersectsObject( object )) {
// 			
// 		}
// 		else {
// 
// 		}
// 	});
// });
// 
