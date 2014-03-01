


LiveWidgets.addWidget({
	
        name: 'solar-wind',
		
        model: {
			asdf: 123
			
        },
		
        controller: {
			
			renderSolarData: function (data) {
				
				var divs = this.element.getElementsByTagName("div");
				for (var i = 0, len = divs.length; i < len; i += 1) {
					divs[i].innerHTML = "";
				}
				
		        var g1 = new JustGage({
		          id: "g1", 
		          value: data.plasma.speed.split(" ")[0]*1,
		          min: 0,
		          max: 1000,
		          title: "Plasma Velocity",
		          label: data.plasma.speed,
		          levelColorsGradient: true
		        });
				
		        var g2 = new JustGage({
		          id: "g2", 
		          value: data.plasma.temperature.split(" ")[0]*1,
		          min: 0,
		          max: 300000,
		          title: "Temperature",
		          label: data.plasma.temperature,
		          levelColorsGradient: false
		        });
		        var g3 = new JustGage({
		          id: "g3", 
		          value: data.plasma.density.split(" ")[0]*1,
		          min: 0,
		          max: 50,
		          title: "Particle Density",
		          label: data.plasma.density,
		          levelColorsGradient: false
		        });
		        var g4 = new JustGage({
		          id: "g4", 
		          value: data.plasma.pressure.split(" ")[0]*1,
		          min: 0,
		          max: 20,
		          title: "Pressure",
		          label: data.plasma.pressure,
		          levelColorsGradient: false
		        });
				
		        var g5 = new JustGage({
		          id: "g5", 
		          value: data.magneticField.totalField.split(" ")[0]*1,
		          min: -50,
		          max: 50,
		          title: "Magnetic Field Strength",
		          label: data.magneticField.totalField,
		          levelColorsGradient: false,
				  levelColors: [
				  
				  "#ff0000",
				  "#ff00ff",
				  "#ffff00",
				  "#00ff00",
				  "#00ffff",
				  "#0000ff",
				  "#00ffff",
				  "#00ff00",
				  "#ffff00",
				  "#ff00ff",
				  "#ff0000"
				  
				  ]
		        });
				
		        var g6 = new JustGage({
		          id: "g6", 
		          value: data.magneticField.x.split(" ")[0]*1,
		          min: -50,
		          max: 50,
		          title: "Field in X-Direction",
		          label: data.magneticField.x,
		          levelColorsGradient: false,
				  levelColors: [
				  
				  "#ff0000",
				  "#ff00ff",
				  "#ffff00",
				  "#00ff00",
				  "#00ffff",
				  "#0000ff",
				  "#00ffff",
				  "#00ff00",
				  "#ffff00",
				  "#ff00ff",
				  "#ff0000"
				  
				  ]
		        });
				
		        var g7 = new JustGage({
		          id: "g7", 
		          value: data.magneticField.y.split(" ")[0]*1,
		          min: -50,
		          max: 50,
		          title: "Field in Y-Direction",
		          label: data.magneticField.y,
		          levelColorsGradient: false,
				  levelColors: [
				  
				  "#ff0000",
				  "#ff00ff",
				  "#ffff00",
				  "#00ff00",
				  "#00ffff",
				  "#0000ff",
				  "#00ffff",
				  "#00ff00",
				  "#ffff00",
				  "#ff00ff",
				  "#ff0000"
				  
				  ]
		        });
				
		        var g8 = new JustGage({
		          id: "g8", 
		          value: data.magneticField.z.split(" ")[0]*1,
		          min: -50,
		          max: 50,
		          title: "Field in Z-Direction",
		          label: data.magneticField.z,
		          levelColorsGradient: false,
				  levelColors: [
				  
					  "#ff0000",
					  "#ff00ff",
					  "#ffff00",
					  "#00ff00",
					  "#00ffff",
					  "#0000ff",
					  "#00ffff",
					  "#00ff00",
					  "#ffff00",
					  "#ff00ff",
					  "#ff0000"
				  
				  ]
		        });
				
			},
			
			handleMessage: function (action) {
				
				if (action == "hide-modal") {
					this.element.style.display = "none";
				}
				// console.log(action);
				if (action == "user-clicked-solar-wind") {
					this.element.style.display = "block";
					
					document.onkeydown = function(evt) {
					    evt = evt || window.event;
					    if (evt.keyCode == 27) {
					        this.element.style.display="none";
					    }
					}.bind(this);
					
					FileManager.loadJSON("http://localhost:4040/solarWind", this.controller.renderSolarData);
				}
			}
				
        },
		
		constructor: function () {
			
			
			console.info(
				
				"Radial Controls Initialized",
				this.element
				
			);
			
			
		},
		
        reinit: function () {
			
			
		
				
        }
});



