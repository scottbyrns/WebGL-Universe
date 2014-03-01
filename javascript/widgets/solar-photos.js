


LiveWidgets.addWidget({
	
        name: 'solar-photos',
		
        model: {
			asdf: 123
			
        },
		
        controller: {
			
			renderSolarData: function (data) {

			},
			
			handleMessage: function (action) {
				
				if (action == "hide-modal") {
					this.element.style.display = "none";
				}
				
				console.log(action);
				if (action == "user-clicked-solar-photos") {
					this.element.style.display = "block";
					
					document.onkeydown = function(evt) {
					    evt = evt || window.event;
					    if (evt.keyCode == 27) {
					        this.element.style.display="none";
					    }
					}.bind(this);
					
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



