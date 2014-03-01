THREE.ImageUtils.loadDepthMap = function (url, callback, filter) {
	
	var img = document.createElement("img");

	img.crossOrigin="anonymous";
	img.src = 'http://localhost:4040/getMagneticFieldDesnity';
	
	img.onload = function () {
		var canvas = document.createElement('canvas');

		canvas.height = img.height;
		canvas.width = img.width;
		var context = canvas.getContext('2d');

		context.drawImage(img, 0, 0);
		var myData = context.getImageData(0, 0, canvas.width, canvas.height);

		var data = new Float32Array( canvas.width * canvas.height );
	
		var pix = myData.data;
		

		var j=0;
		for (var i = 0, n = pix.length; i < n; i += (4)) {
			
			if (filter) {
				try {
					var result = filter({
						r: pix[i],
						g: pix[i+1],
						b: pix[i+2],
						a: pix[i+3]
					});
					
					pix[i] = result.r;
					pix[i+1] = result.g;
					pix[i+2] = result.b;
					pix[i+3] = result.a;
					
				}
				catch (e) {
					console.error("Failed to filter depth map.", e);
				}
			}
			
			var all = pix[i]+pix[i+1]+pix[i+2];
			data[j++] = all/30;
		}
	
		try {
			callback(data, canvas.width, canvas.height);
		}
		catch (e) {
			console.error("Failed to load depth map.", e);
		}
	};
};