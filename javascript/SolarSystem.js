


var SolarSystem = function (data) {

	this.data = data;
	
	this.star = this.buildStar();
	
	this.starLight = new StarLight(this.star);
	

	this.solarWind = new SolarWind();
	
	
	this.drawPlanetOrbits();

		
	this.planets = this.buildPlanets();
	
	MessageController.sendMessage("app-controller", "add-object-to-scene", this.star);
	
	this.bindControllers();

};

SolarSystem.prototype = {
	
	bindControllers: function () {
		MessageController.addListener("solar-system-controller", this.controllerDispatch.bind(this));
	},
	
	controllerDispatch: function (message, body) {

		if (message == "set-active-planet") {
			this.setActivePlanet(body);
		}
		if (message == "get-active-planet") {
			body(this.getActivePlanet().data);
		}
	},
	
	getActivePlanet: function () {
		var renderedPlanets = this.planets;
		for (var planet in renderedPlanets) {
			if (renderedPlanets.hasOwnProperty(planet)) {
				if (renderedPlanets[planet].isActive) {
					return renderedPlanets[planet];
				}
			}
		}
	},
	
	setActivePlanet: function (planetName) {

		for (var planet in this.planets) {
			this.planets[planet].isActive = false;
		}

		this.planets[planetName].isActive = "true";
		
		MessageController.sendMessage("app-controller", "target-controls", this.planets[planetName].mesh.position);

		
		var cameraPosition = {
			x: this.planets[planetName].mesh.position.x + (this.planets[planetName].mesh.radius * 4),
			y: this.planets[planetName].mesh.position.y,
			z: this.planets[planetName].mesh.position.z + (this.planets[planetName].mesh.radius * 4)
		}
		
		MessageController.sendMessage("app-controller", "move-camera-to", cameraPosition);
		MessageController.sendMessage("app-controller", "point-camera-at", this.planets[planetName].mesh.position);
		

	},
	
	// Update the position of the planets and the rotation of the star.
	update: function () {
	
		var planetIsActive = false;
		var renderedPlanets = this.planets;
		for (var planet in renderedPlanets) {
			if (renderedPlanets.hasOwnProperty(planet)) {
				if (renderedPlanets[planet].isActive) {
				
					planetIsActive = true;
					renderedPlanets[planet].update();
				}
			}
		}
				
				
		for (var planet in renderedPlanets) {
		
			if (renderedPlanets.hasOwnProperty(planet)) {

						  
				// if (renderedPlanets[planet].isActive) {
				// 
				// 	// controls.target = renderedPlanets[planet].mesh.position;
				// 	MessageController.sendMessage("app-controller", "point-camera-at", renderedPlanets[planet].mesh.position);
				// 	
				// 
				// }
			
				if (!planetIsActive) {
				
					renderedPlanets[planet].updatePosition();

				}
			}
		
		}
	
		// this.star.rotation.y += 0.001;
	
	},
	// Build the main star.
	buildStar: function () {
		
		var texture = THREE.ImageUtils.loadTexture(this.data.sun.representation.texture);
		var shaderMaterial = new THREE.ShaderMaterial( {
 
		    uniforms: { 
		        surface: { // texture in slot 0, loaded with ImageUtils
		            type: "t", 
		            // value: 0, 
		            value: texture
		        },
		        time: { // float initialized to 0
		            type: "f", 
		            value: 0.0 
		        }
		    },
		    vertexShader: document.getElementById( 'sunSurfaceVertexShader' ).textContent,
		    fragmentShader: document.getElementById( 'sunSurfaceFragmentShader' ).textContent
     
		} );
		
		// this.mesh.material = shaderMaterial;
		
		MessageController.sendMessage("app-controller", "add-render-stage", {
			name: "render-planet-surface-sun",
			stage: function (shaderMaterial, start) {
				return function (delta) {
					shaderMaterial.uniforms[ 'time' ].value = .00025 * ( start - new Date() );
				}
			}.bind(this)(shaderMaterial, new Date())
		});
		
		
		var sun = PlanetBuilder.build({
			radius: this.data.sun.radius * 10,
			resolution: 128,
			mapImage: texture,
			bumpMap: THREE.ImageUtils.loadTexture(this.data.sun.representation.bumpMap, undefined, function () {}),
			atmosphereMaterial: new THREE.ShaderMaterial( 
			{
			    uniforms:       
				{ 
					"c":   { type: "f", value: 0.1 },
					"p":   { type: "f", value: 1.0 },
					// "uTex": { type: "t", value: THREE.ImageUtils.loadTexture( "matrix.jpg" ) }
				},
				vertexShader:   document.getElementById( 'vertexShaderAtmosphere'   ).textContent,
				fragmentShader: document.getElementById( 'fragmentShaderAtmosphere' ).textContent,
				// bumpMap : THREE.ImageUtils.loadTexture('earth.jpg'),
				// maskMaterial.bumpMap    = THREE.ImageUtils.loadTexture('bg.jpeg')
				// bumpScale: 1.5,
				transparent:true
			}   )
		});
		
		// var gyro = new THREE.Gyroscope();
		// MessageController.sendMessage("app-controller", "add-object-to-scene", gyro);
		
		var size = this.data.sun.radius * 10 * 1.6;
		var geo = new THREE.PlaneGeometry(size*1.7, size*1.7, 1, 1);
		var material = new THREE.MeshPhongMaterial({ map : THREE.ImageUtils.loadTexture("textures/flare.png"), depthWrite:false, transparent:true, opacity:0.1, blending:THREE.AdditiveBlending });
		plane = new THREE.Mesh(geo, material);
		material.alphaTest = 0.0;
		// plane.add(gyro);
		MessageController.sendMessage("app-controller", "add-object-to-scene", plane);
		// gyro.add(plane);
		var totRotation = 0;
		MessageController.sendMessage("app-controller", "add-render-stage", {
			name: "render-sun-corona",
			stage: function (delta) {
				MessageController.sendMessage("app-controller", "get-camera", function (camera) {
					plane.lookAt(camera.position);
					totRotation += delta/3200;
					plane.rotation.z += totRotation;
				});
			}
		});
		
		
		var geo3 = new THREE.PlaneGeometry(size*1.7, size*1.7, 1, 1);
		var material3 = new THREE.MeshPhongMaterial({ map : THREE.ImageUtils.loadTexture("textures/flare.png"), depthWrite:false, transparent:true, opacity:0.1, blending:THREE.AdditiveBlending });
		plane3 = new THREE.Mesh(geo, material);
		material.alphaTest = 0.0;
		// plane.add(gyro);
		MessageController.sendMessage("app-controller", "add-object-to-scene", plane3);
		// gyro.add(plane);
		var totRotation3 = 0;
		MessageController.sendMessage("app-controller", "add-render-stage", {
			name: "render-sun-corona",
			stage: function (delta) {
				MessageController.sendMessage("app-controller", "get-camera", function (camera) {
					plane3.lookAt(camera.position);
					totRotation3 -= delta/3200;
					plane3.rotation.z += totRotation3;
				});
			}
		});
		
		
		var geo2 = new THREE.PlaneGeometry(size*2, size*2, 1, 1);
		var material2 = new THREE.MeshPhongMaterial({ map : THREE.ImageUtils.loadTexture("textures/flare.png"), depthWrite:false, transparent:true, opacity:0.1, blending:THREE.AdditiveBlending });
		material2.alphaTest = 0.0;
		var plane2 = new THREE.Mesh(geo2, material2);

		// plane.add(gyro);
		MessageController.sendMessage("app-controller", "add-object-to-scene", plane2);
		// gyro.add(plane);
		var totRotation2 = 0;
		MessageController.sendMessage("app-controller", "add-render-stage", {
			name: "render-sun-flare",
			stage: function (delta) {
				MessageController.sendMessage("app-controller", "get-camera", function (camera) {
					plane2.lookAt(camera.position);
					totRotation2 -= delta/4000;
					plane2.rotation.z += totRotation2;
				});
			}
		});
		
		// MessageController.sendMessage("app-controller", "get-camera", function (camera) {
		// 	gyro.add(camera);
		// });
			// sun.gyro = gyro;

	    // console.time("make sun lensflare");
			// var starLensflare = makeStarLensflare(1.5, 0.0001, spectral);
			// sun.lensflare = starLensflare;
			// sun.lensflare.name == 'lensflare';
			// gyro.add( starLensflare );
		
		sun.material = shaderMaterial;
		return sun;
			
	},
	// Build the varied planets of the solar system.
	buildPlanets: function () {
		
		// Local planet cache to return from this method.
		var planets = {};
		
		for (var i = 0, len = this.data.planets.length; i < len; i += 1) {
		
			var planetData = this.data.planets[i];
			var texture;
			if (planetData.representation.texture.indexOf(".dds") > -1) {
				texture = THREE.ImageUtils.loadCompressedTexture(planetData.representation.texture, undefined, function () {})
			}
			else {
				texture = THREE.ImageUtils.loadTexture(planetData.representation.texture, undefined, function () {})
			}

			var buildConfiguration = {
				radius: planetData.radius * 300,
				resolution: 128,
				mapImage: texture,
			};
			
			
			
		
			if (planetData.representation.bumpMap) {
				buildConfiguration.bumpMap = THREE.ImageUtils.loadTexture(planetData.representation.bumpMap, undefined, function () {});
			}
			else {
				buildConfiguration.bumpMap = buildConfiguration.mapImage;
			}
		
			if (planetData.representation.textureOffset) {
				buildConfiguration.mapOffset = planetData.representation.textureOffset;
			}
			
			if (planetData.representation.depth) {
				
				var img = document.createElement(img);
				img.src = planetData.representation.depth.low;
				img.onload = function () {
					
					
					
				}.bind(this);
				
			}
			
		
			var planet = PlanetBuilder.build(buildConfiguration);
		
			// planet.position.set(planetData.distance, 0, 0);
		
			planet.coordinates = {
				phi: planetData.coordinates.phi,
				lambda: planetData.coordinates.lambda,
				radius: planetData.coordinates.radius
			};
		
			this.star.addGeoSymbol(planet);

			
			planets[planetData.name] = new Planet({
				mesh: planet,
				data: planetData,
				isActive: false
			});
		
			planetData.orbitLine.lookAt(planet.position);
			
			
			

			// MessageController.sendMessage("app-controller", "add-render-stage", {name: planet.uuid, stage:function (object) {
			// 	
			// 
			// 	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
			// 	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			// 	var placeHolder = new THREE.Mesh( geometry, material );
			// 	placeHolder.position = object.position;
			// 	
			// 	MessageController.sendMessage("app-controller", "add-object-to-scene", placeHolder);
			// 	
			// 	return function (delta) {
			// 		MessageController.sendMessage("app-controller", "get-camera", function (camera, frustum, viewProjectionMatrix) {
			// 			if (frustum.intersectsObject( placeHolder )) {
			// 				MessageController.sendMessage("app-controller", "add-object-to-scene", object);
			// 			}
			// 			else if (!frustum.intersectsObject( object )){
			// 				placeHolder.position = object.position;
			// 				MessageController.sendMessage("app-controller", "remove-object-from-scene", object);
			// 			}
			// 		});
			// 	}
			// 	
			// 	
			// }(planet)});

			
			// planetData.orbitLine.rotation.z = planetData.coordinates.phi;
		
		}
		
		return planets;
		
	},

	// Draw the planets orbits
	//
	// TODO account for ecliptic plane orientation
	drawPlanetOrbits: function (star) {
		for (var i = 0, len = this.data.planets.length; i < len; i += 1) {
			// if (i == len-1) {
			// 
			// 		
			// }
			(function (planet) {
		
				var resolution = 1000;
				var amplitude = planet.coordinates.radius;
				var size = 360 / resolution;

				var geometry = new THREE.Geometry();
				var material = new THREE.LineBasicMaterial( { color: 0x0099FF, opacity: 0.2, depthTest: true, blending:THREE.AdditiveBlending, transparent:true} );
				for(var i = 0; i <= resolution; i++) {
				    var segment = ( i * size ) * Math.PI / 180;
				    geometry.vertices.push( new THREE.Vector3( Math.cos( segment ) * amplitude, 0, Math.sin( segment ) * amplitude ) );         
				}

				var line = new THREE.Line( geometry, material );
				// if (planet.name == "Earth" || planet.name == "Venus" || planet.name == "Mercury" || planet.name == "Mars") {
				// 	return;
				// }
				MessageController.sendMessage("app-controller", "add-object-to-scene", line);
				planet.orbitLine = line;
		
			}(this.data.planets[i]))
		}		
	}
	
}


