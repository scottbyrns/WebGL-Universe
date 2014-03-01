
var SolarSystemData = {
	sun: {
		radius: 695500,
		representation: {
			texture: 'http://localhost:4040/sdo',
			// bumpMap: 'http://localhost:4040/sdo'
		}
	},
	// Distance in KM
	// Mass in KG
	planets: [
	{
		name: "Mercury",
		representation: {
			texture: 'textures/Planets/mercurymap.jpg',
			bumpMap: 'textures/Planets/mercurybump.jpg',
			textureOffset: -180.806168
		},
		distance: 5791E4,
		radius: 2440,
		rotationPeriod: {
			years: 0,
			days: 58,
			hours: 15,
			minutes: 30
		},
		orbitalPeriod: {
			years: 0,
			days: 88,
			hours: 0,
			minutes: 0
		},
		mass: 328.5E21
	},
	{
		name: "Venus",
		representation: {
			texture: 'textures/Planets/venusmap.jpg',
			bumpMap: 'textures/Planets/venusbump.jpg',
			textureOffset: -180.806168
		},
		distance: 1082E5,
		radius: 6052,
		rotationPeriod: {
			years: 0,
			days: 116,
			hours: 18,
			minutes: 0
		},
		orbitalPeriod: {
			years: 0,
			days: 255,
			hours: 0,
			minutes: 0
		},
		mass: 4.867E24
	},

	{
		name: "Earth",
		representation: {
			texture: 'textures/Planets/color.jpg',
			bumpMap: 'textures/Planets/earth.jpg',
			textureOffset: -180.806168
		},
		distance: 149597870,
		radius: 6371,
		rotationPeriod: {
			years: 0,
			days: 1,
			hours: 0,
			minutes: 0
		},
		orbitalPeriod: {
			years: 1,
			days: 0,
			hours: 0,
			minutes: 0
		},
		mass: 5.972E24,
		moons: [
		{
			name: "Luna"
		}
		]
	},

	{
		name: "Mars",
		representation: {
			texture: 'textures/Planets/marsmap.jpg',
			bumpMap: 'textures/Planets/marsbump.jpg',
			textureOffset: -180.806168
		},
		distance: 2279E5,
		radius: 3390,
		rotationPeriod: {
			years: 0,
			days: 1,
			hours: 0,
			minutes: 40
		},
		orbitalPeriod: {
			years: 1,
			days: 322,
			hours: 0,
			minutes: 0
		},
		mass: 639E21
	},

	{
		name: "Jupiter",
		representation: {
			texture: 'textures/Planets/jupitermap.jpg'
		},
		distance: 7785E5,
		radius: 69911,
		rotationPeriod: {
			years: 0,
			days: 0,
			hours: 9,
			minutes: 56
		},
		orbitalPeriod: {
			years: 12,
			days: 0,
			hours: 0,
			minutes: 0
		},
		mass: 1.898E27
	},

	{
		name: "Saturn",
		representation: {
			texture: 'textures/Planets/saturnmap.jpg'
		},
		distance: 1433E6,
		radius: 58232,
		rotationPeriod: {
			years: 0,
			days: 0,
			hours: 10,
			minutes: 39
		},
		orbitalPeriod: {
			years: 29,
			days:0,
			hours:0,
			minutes:0
		},
		mass: 568.3E24
	},

	{
		name: "Uranus",
		representation: {
			texture: 'textures/Planets/uranusmap.jpg'
		},
		distance: 2877E6,
		radius: 25362,
		rotationPeriod: {
			years: 0,
			days: 0,
			hours: 17,
			minutes: 14
		},
		orbitalPeriod: {
			years: 84,
			days: 0,
			hours: 0,
			minutes: 0
		},
		mass: 86.81E24
	},
	{
		name: "Neptune",
		representation: {
			texture: 'textures/Planets/neptunemap.jpg'
		},
		distance: 4503E6,
		radius: 24622,
		rotationPeriod: {
			years: 0,
			days: 0,
			hours: 16,
			minutes: 6
		},
		orbitalPeriod: {
			years: 165,
			days: 0,
			hours: 0,
			minutes: 0
		},
		mass: 102.4E24
	}
	]
};
