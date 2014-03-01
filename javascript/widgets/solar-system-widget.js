


LiveWidgets.addWidget({
	
        name: 'solar-system',
		
        model: {
			asdf: 123
			
        },
		
        controller: {
			
        },
		
		constructor: function () {
			
			window.MessageController = new com.scottbyrns.MessageController.MessageController();

			var width = window.innerWidth;
			var height = window.innerHeight;

			var camera = new THREE.PerspectiveCamera(45, width / height, 1, 2747989354);
	
			var pointLight = new THREE.PointLight(0xFFFFFF, 1);
			pointLight.position.set(0, 0, 0);
			// pointLight.castShadow = true;
			// pointLight.shadowDarkness = 0.5;
			camera.add(pointLight);


			var solarApp = new THREE.App({
				rendererConfig: {
					antialias: true,
					precision: "highp" 		
				},
				height: height,
				width: width,
				camera: camera
			});
		
		
		
			solarApp.buildStage(function (app, scene, camera, renderer) {
			
				var controls = new THREE.OrbitControls( camera, renderer.domElement );
				
				app.setControls(controls);
				
				MessageController.addListener("renderer-controls", function (action, callback) {
					
					if (action == "get-controls") {
						callback(this);
					}
					
				}.bind(controls));
				

				function scrollHandler(e) {
					controls.update();
				}


			    if (window.addEventListener) {
			        window.addEventListener('mousewheel', scrollHandler, false);   
				}
			    else if (window.attachEvent) {
			        window.attachEvent('onscroll', scrollHandler); 
				}
			
			}.bind(this));
		
		
		
			solarApp.buildStage(function (app, scene, camera, renderer) {


				FileManager.loadJSONAsync("http://localhost:4040/getPlanetPositions", function (data) {

					var solarSystem = new SolarSystem(data, scene);

			
			
					camera.position.y = 160;
					camera.position.z = solarSystem.star.radius * 12;
					camera.lookAt(solarSystem.star.position);

					MessageController.sendMessage("app-controller", "add-render-stage", {
						name: "Update Solar System",
						stage: function () {
							this.update();
						}.bind(solarSystem)
					})

					// app.addRenderStage(function () {
					// 	this.update();
					// }.bind(solarSystem));
					
					new SateliteConstelation(solarSystem.planets.Earth);
					
					trackSatelites(function (data) {
						MessageController.sendMessage("satelite-controller-Earth", "update-satelite-position", data);
					});

					app.startAnimation();
					document.getElementById("load-indicator").style.display = "none";
				
				});

			
			});
		
			
			
		},
		
        reinit: function () {
			
			
		
				
        }
});



