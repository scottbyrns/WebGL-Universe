


LiveWidgets.addWidget({
	
        name: 'radial-controller',
		
        model: {
			asdf: 123
			
				
        },
		
        controller: {
			
			
				
				handleMessage: function (action) {
					console.log(action);
					if (action == "user-clicked-solar-wind") {
						this.sendMessage("show-solar-wind", "solar-wind");
					}
					if (action == "user-clicked-temperature") {
						
					}
					if (action == "user-clicked-protons") {
						
					}
					if (action == "user-clicked-magnetic-flux") {
						console.log("Toggling magnetic flux sprite");
						
						MessageController.sendMessage("solar-wind-controller", "toggle-solar-winds");
						
						// if (solarSystem.magneticField.visible) {
						// 	solarSystem.magneticField.visible=false;
						// }
						// else {
						// 	solarSystem.magneticField.visible=true;
						// }
					}
					if (action == "user-clicked-solar-irradiance") {
						
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
