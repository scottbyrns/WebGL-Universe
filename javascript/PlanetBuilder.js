var PlanetBuilder = {
	build: function (config) {
		
		config.resolution = config.resolution || 200;

		var maskGeometry = new THREE.SphereGeometry(config.radius, config.resolution, config.resolution);
		var maskMaterial = new THREE.MeshPhongMaterial({  depthTest: true });		

		maskMaterial.depthTest = true;
		maskMaterial.map = config.mapImage;

		if (config.bumpMap) {
			
			maskMaterial.bumpMap = config.bumpMap;

			maskMaterial.bumpScale = 1.5
			
		}
		else {
			
			maskMaterial.bumpMap = config.mapImage;

			maskMaterial.bumpScale = 1.5
		}
		
		maskMaterial.transparent = false;
			
		// var mask = new THREE.Mesh(maskGeometry, maskMaterial);
			// mask.receiveShadow = true;
		// scene.add(mask);


		var planet = new THREE.GeoSpatialMap(maskGeometry, maskMaterial);

		planet.setRadius(config.radius);
		

		if (config.atmosphereMaterial) {

			var mesh = new THREE.Mesh( maskGeometry.clone(), config.atmosphereMaterial );
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.0;
			// atmosphere should provide light from behind the sphere, so only render the back side
			mesh.material.side = THREE.BackSide;
			planet.add(mesh);
		
			var mesh = new THREE.Mesh( maskGeometry.clone(), new THREE.MeshPhongMaterial( { color: 0x330000, opacity:0.01, transparent:true} ) );
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.0;
			mesh.receiveShadow = true;
			// atmosphere should provide light from behind the sphere, so only render the back side
			// mesh.material.side = THREE.BackSide;
			planet.add(mesh);
				
		}
		
		if (config.mapOffset) {
			planet.setTexturesEdgeLongitude(config.mapOffset);
		}


		return planet;
	},
	
	buildMoon: function (config) {
		
	}
};

