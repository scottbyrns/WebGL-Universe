var Planet = function (config) {

	this.mesh = config.mesh;
	this.data = config.data;
	this.isActive = config.isActive;
	
	this.isNewlyActive = true;
	
	if (config.data.representation.texture.indexOf(".dds") > -1) {
		this.texture = THREE.ImageUtils.loadCompressedTexture(config.data.representation.texture, undefined, function () {})
	}
	else {
		this.texture = THREE.ImageUtils.loadTexture(config.data.representation.texture, undefined, function () {})
	}
	// this.texture = THREE.ImageUtils.loadTexture(config.data.representation.texture);
	
};

Planet.prototype = {
	
	update: function () {

		if (this.isNewlyActive) {

			this.isNewlyActive = false;
			
			this.renderExtras();
			
		}
	},
	
	renderExtras: function () {

		// if (this.data.name = "Earth") {
			MessageController.sendMessage("app-controller", "set-minimum-zoom-level", this.mesh.radius * 1.2);
			MessageController.sendMessage("app-controller", "set-minimum-zoom-level-reached-callback", this.swapToLOD.bind(this));
			
			this.loadDepthMap();
			
		// }
		
	},
	
	swapToLOD: function () {
		
	},
	
	loadDepthMap: function () {
		if (this.data.representation.bumpMap) {
			this.depthTexture = THREE.ImageUtils.loadTexture( this.data.representation.bumpMap, undefined, this.depthMapCallback.bind(this));			
		}
		else {
			this.depthTexture = THREE.ImageUtils.loadTexture( this.data.representation.texture, undefined, this.depthMapCallback.bind(this));			
		}

		// THREE.ImageUtils.loadDepthMap(
		// 	this.data.representation.depth.low,
		// 	this.depthMapCallback.bind(this)
		// );
	},
	
	depthMapCallback: function (data, height, width) {
		console.log("Mesh", this.mesh);
		
		// var depthTexture = THREE.ImageUtils.loadTexture( 'depth/earth_low.png', undefined, function () {
			var shaderMaterial = new THREE.ShaderMaterial( {
 
			    uniforms: { 
			        depth: { // texture in slot 0, loaded with ImageUtils
			            type: "t",
			            value: this.depthTexture
			        },
					scale: {
						type: "f",
						value: this.data.radius
					},
					skin: {
						type: "t",
						value: this.texture
					}
			    },
			    vertexShader: document.getElementById( 'planetSurfaceVertexShader' ).textContent,
			    fragmentShader: document.getElementById( 'planetSurfaceFragmentShader' ).textContent
     
			} );
		
			this.mesh.material = shaderMaterial;

		// }.bind(this) );

		
		// MessageController.sendMessage("app-controller", "add-render-stage", {
		// 	name: "render-planet-surface-" + this.data.name,
		// 	stage: function (shaderMaterial, start) {
		// 		return function (delta) {
		// 			shaderMaterial.uniforms[ 'time' ].value = .00025 * ( start - new Date() );
		// 		}
		// 	}.bind(this)(shaderMaterial, new Date())
		// });
		
	},

	updatePosition: function () {
		
	  	var orbit = 1/(this.data.orbitalPeriod.years*1 + (this.data.orbitalPeriod.days / 365)  + (this.data.orbitalPeriod.hours / 8760));

	  	var rotationPeriod = 1/(this.data.rotationPeriod.years*1 + (this.data.rotationPeriod.days / 365)  + (this.data.rotationPeriod.hours / 8760));
	
		// this.mesh.position.set(
		// 
		// 	this.mesh.coordinates.radius * (Math.sin(Date.now() * orbit*0.0001)), 
		// 	0,
		// 	this.mesh.coordinates.radius * (Math.cos(Date.now() * orbit*0.0001))
		// 
		// );

		this.mesh.rotation.y += rotationPeriod * 0.0000001;
		
	}
	
};