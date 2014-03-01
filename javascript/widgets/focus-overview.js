
LiveWidgets.addWidget({
	
        name: 'focus-overview',
		
        model: {
			asdf: 123
			
        },
		
        controller: {
			
			renderSolarData: function (data) {

			},
			
			addCommas: function (number) {
				return (number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
			},
			
			renderPlanetData: function (data) {
				
				var img = this.element.getElementsByTagName("img")[0];
				var title = this.element.getElementsByTagName("h1")[0];
				
				img.src = ["images/Planets/", data.name, ".png"].join("");
				title.innerHTML = data.name;
				
				
				var infoCells = this.element.getElementsByTagName("td");
				
				this.element.getElementsByTagName("table")[0].style.display = "inline-block";
				
				for (var i = 0, len = infoCells.length; i < len; i += 1) {
					var cell = infoCells[i];
					var label = cell.getElementsByTagName("label")[0];
					var info = cell.getElementsByTagName("span")[0];
					
					if (i == 0) {
						
						var number = (data.distance * 1E5).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						
						if ((data.distance * 1E5).toString().indexOf("e+") > -1) {
							var parts = (data.distance * 1E5).toString().split("e+");
							parts[0] = parts[0].replace(".", "");
							var len = (parts[1] - parts[0].length - 2)
							while(len--) {
								parts[0] = parts[0] + "0";
							}
							number = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						
						info.innerHTML = number + " km";
					}
					if (i == 1) {
						var number = (data.radius * 1E5).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						
						if ((data.radius * 1E5).toString().indexOf("e+") > -1) {
							var parts = (data.radius * 1E5).toString().split("e+");
							parts[0] = parts[0].replace(".", "");
							var len = (parts[1] - parts[0].length - 2)
							while(len--) {
								parts[0] = parts[0] + "0";
							}
							number = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						info.innerHTML = number + " km";						
					}
					if (i == 2) {
						info.innerHTML = [
						data.rotationPeriod.years,
						" years, ",
						data.rotationPeriod.days,
						" days, ",
						data.rotationPeriod.hours,
						" hours, ",
						data.rotationPeriod.minutes,
						" minutes"
						].join("");
					}
					if (i == 3) {
						var number = (data.mass * 1E3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						
						if ((data.mass * 1E3).toString().indexOf("e+") > -1) {
							var parts = (data.mass * 1E3).toString().split("e+");
							parts[0] = parts[0].replace(".", "");
							var len = (parts[1] - parts[0].length - 2)
							while(len--) {
								parts[0] = parts[0] + "0";
							}
							number = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						}
						info.innerHTML = number + " kg";
					}
					// console.log(data.moons.length);
					if (i == 4 && data.moons && data.moons.length > 0) {
						info.innerHTML = (data.moons.length + "");
					}
					else if (i == 4 && !(data.moons)) {
						info.innerHTML = "0";
					}
					if (i == 5) {
						info.innerHTML = [
						data.orbitalPeriod.years,
						" years, ",
						data.orbitalPeriod.days,
						" days, ",
						data.orbitalPeriod.hours,
						" hours, ",
						data.orbitalPeriod.minutes,
						" minutes"
						].join("");
					}
					
				}
			},
			
			handleMessage: function (action) {
				
				// if (action == "hide-modal") {
				// 	this.element.style.display = "none";
				// }
				
				console.log(action);
				
				if (action.indexOf("planet-selected") > -1) {
					action = action.replace("planet-selected-", "");
					
					MessageController.sendMessage("solar-system-controller", "get-active-planet", this.controller.renderPlanetData);
					
					// this.element.style.display = "none";
				}
				
			}
				
        },
		
		constructor: function () {
			
			
		},
		
        reinit: function () {
			
			
		
				
        }
});



