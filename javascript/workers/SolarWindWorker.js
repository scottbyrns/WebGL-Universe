onmessage = function (oEvent) {
  // postMessage("Hi " + oEvent.data.length);
  
  var vertices = oEvent.data.vertices;
  var data = oEvent.data.depth;
  
  for (var i = 0, len = data.length; i < len; i += 1) {
	  
	  var depth = -1200 + data[i] * 100;
	  
	  if (data[i] == 0) {
		  depth = 0;
	  }
	  

  	if (depth < -700 || depth > 700) {
  		depth = 0;
  		// floorGeometry.vertices[i].x = floorGeometry.vertices[i].x/2;
  		// floorGeometry.vertices[i].y = floorGeometry.vertices[i].y/2;
  		// 
	
  		// var theta = Math.atan(floorGeometry.vertices[i].y/floorGeometry.vertices[i].x)// * 180 / Math.PI;
  		var theta = Math.atan2(vertices[i].y, vertices[i].x);
	
  		var dist;
  		if (Math.sqrt(Math.pow(vertices[i].y, 2) + Math.pow(vertices[i].x, 2)) > 500 ||
			Math.sqrt(Math.pow(vertices[i].y, 2) + Math.pow(vertices[i].x, 2)) < -500) {
				
  			dist = 3943;
  			vertices[i].x = dist * Math.cos(theta);
  			vertices[i].y = dist * Math.sin(theta);
			
  		}
  		else {
			
  			dist = 0;
			
  		}

	
  		if (dist !== 0) {
			
  			var x = ((Math.sqrt(len)/2) + (((Math.sqrt(len))) * Math.cos(theta)));
  			var y = ((Math.sqrt(len)/2) + (((Math.sqrt(len))) * Math.sin(theta)));
  			// alert(x + " " + y)
  			var location = (x + ((y * Math.sqrt(len))));


  			depth = -1200 + (data[location] * 100);
			
  		}
  		else {
  			depth = 0
  			// vertices[i].y = 0
  			// vertices[i].x = 0
  		}

  	}
	  
	  vertices[i].z = depth;
  }
  
  postMessage(vertices);
};
  // 
//   
// try {
// 
// 	if (i == 0) {
// 		floorGeometry.vertices[i].z = -1200 + (data[i] * 100);
// 
// 	}
// 	else {
// 		floorGeometry.vertices[i].z = -1200 + (data[i] * 100);
// 	}
// 
// 	if (data[i] == 0) {
// 		floorGeometry.vertices[i].z = 0;
// 	}
// 
// 	if (floorGeometry.vertices[i].z < -700 || floorGeometry.vertices[i].z > 700) {
// 		floorGeometry.vertices[i].z = 0;
// 		// floorGeometry.vertices[i].x = floorGeometry.vertices[i].x/2;
// 		// floorGeometry.vertices[i].y = floorGeometry.vertices[i].y/2;
// 		// 
// 	
// 		// var theta = Math.atan(floorGeometry.vertices[i].y/floorGeometry.vertices[i].x)// * 180 / Math.PI;
// 		var theta = Math.atan2(floorGeometry.vertices[i].y, floorGeometry.vertices[i].x);
// 	
// 		var dist;
// 		if (Math.sqrt(Math.pow(floorGeometry.vertices[i].y, 2) + Math.pow(floorGeometry.vertices[i].x, 2)) > 500 ||
// 	Math.sqrt(Math.pow(floorGeometry.vertices[i].y, 2) + Math.pow(floorGeometry.vertices[i].x, 2)) < -500) {
// 			dist = 3943;
// 			floorGeometry.vertices[i].x = dist * Math.cos(theta);
// 			floorGeometry.vertices[i].y = dist * Math.sin(theta);
// 		}
// 		else {
// 			dist = 0;
// 		}
// 
// 	
// 		if (dist !== 0) {
// 			var x = ((Math.sqrt(l)/2) + (((Math.sqrt(l))) * Math.cos(theta)));
// 			var y = ((Math.sqrt(l)/2) + (((Math.sqrt(l))) * Math.sin(theta)));
// 			// alert(x + " " + y)
// 			var location = (x + ((y * Math.sqrt(l))));
// 
// 
// 			floorGeometry.vertices[i].z = -1200 + (data[location] * 100);
// 		}
// 		else {
// 			floorGeometry.vertices[i].z = 0
// 			// floorGeometry.vertices[i].y = 0
// 			// floorGeometry.vertices[i].x = 0
// 		}
// 
// 	}
// 	// floorGeometry.vertices[i].z /= 10;
// 
// }
// catch (e) {
// 	console.error(e);
// 	// i=l;
// }
//   
//   
//   
// };