var hydraAPI = [
{
	type : "SOURCES",
	methods : [
		{name: `osc()`, detail:`osc( freq = 60, sync = 0.1, satur )`},
		{name: `shape()`, detail:`shape( sides = 3, radius = 0.3, smoothing = 0.01 )`},
		{name: `voronoi()`, detail:`voronoi( scale = 5, speed = 0.3, blend = 0.3 )`},
		{name: `noise()`, detail:`noise( scale = 10, offset = 0.1 )`},
		{name: `gradient()`, detail:`gradient( speed )`},
		{name: `solid()`, detail:`solid( r, g, b, a = 1 )`},
		{name: `src()`, detail:`src( tex )`},
		]

}, 
{
	type: "EXTERNAL-SOURCES",
	methods: [
		{name: `initCam()`, detail:`initCam( index )`},
		{name: `initImage()`, detail:`initImage( url )`},
		{name: `initVideo()`, detail:`initVideo( url )`},
		{name: `initScreen()`, detail:`initScreen()`},
		{name: `init()`, detail:`init( {src:canvas} )`},
		]
}, 
{
	type: "GEOMETRY",
	methods: [
		{name: `repeat()`, detail:`repeat( repeatX = 3, repeatY = 3, offX, offY )`},
		{name: `repeatX()`, detail:`repeatX( reps = 3, offset )`},
		{name: `repeatY()`, detail:`repeatY( reps = 3, offset )`},
		{name: `rotate()`, detail:`rotate( angle = 10, speed )`},
		{name: `pixelate()`, detail:`pixelate( pixelX = 20, pixelY = 20 )`},
		{name: `scroll()`, detail:`scroll( scrollX = 0.5, scrollY = 0.5, speedX, speedY )`},
		{name: `scrollX()`, detail:`scrollX( scrollX = 0.5, speed )`},
		{name: `scrollY()`, detail:`scrollY( scrollY = 0.5, speed )`},
		{name: `kaleid()`, detail:`kaleid( nSides = 4 )`},
		{name: `scale()`, detail:`scale( amt = 1.5, xMult = 1, yMult = 1 )`},
		]
}, 
{
	type: "COLOR",
	methods: [
		{name: `color()`, detail:`color( r = 1, g = 1, b = 1, a = 1 )`},
		{name: `colorama()`, detail:`colorama( amount = 0.005 )`},
		{name: `invert()`, detail:`invert( amount = 1 )`},
		{name: `thresh()`, detail:`thresh( threshold = 0.5, tolerance = 0.04 )`},
		{name: `posterize()`, detail:`posterize( bins = 3, gamma = 0.6 )`},
		{name: `contrast()`, detail:`contrast( amount = 1.6 )`},
		{name: `brightness()`, detail:`brightness( amount = 0.4 )`},
		{name: `saturate()`, detail:`saturate( amount = 2 )`},
		{name: `hue()`, detail:`hue( hue = 0.4 )`},
		{name: `r()`, detail:`r( scale = 1, offset )`},
		{name: `g()`, detail:`g( scale = 1, offset )`},
		{name: `b()`, detail:`b( scale = 1, offset )`},
		]
}, 
{
	type: "BLEND",
	methods: [
		{name: `blend()`, detail:`blend( tex, amount = 0.5 )`},
		{name: `mask()`, detail:`mask( tex )`},
		{name: `layer()`, detail:`layer( tex )`},
		{name: `add()`, detail:`add( tex, amount = 1 )`},
		{name: `sub()`, detail:`sub( tex, amount = 1 )`},
		{name: `mult()`, detail:`mult( tex, amount = 1 )`},
		{name: `diff()`, detail:`diff( tex )`},
		]
}, 
{
	type: "MODULATE",
	methods: [
		{name: `modulate()`, detail:`modulate( tex, amount = 0.1 )`},
		{name: `modulateScale()`, detail:`modulateScale( tex, multiple = 1, offset = 1 )`},
		{name: `modulateRotate()`, detail:`modulateRotate( tex, multiple = 1, offset )`},
		{name: `modulateRepeat()`, detail:`modulateRepeat( tex, repX = 3, repY = 3)`},
		{name: `modulateKaleid()`, detail:`modulateKaleid( tex, nSides = 4 )`},
		{name: `modulatePixelate()`, detail:`modulatePixelate( tex, multi = 10, offset = 3 )`},
		{name: `modulateHue()`, detail:`modulateHue( tex, amount = 1 )`},
		{name: `modulateScrollX()`, detail:`modulateScrollX( tex, scrollX = 0.5, speed )`},
		{name: `modulateScrollY()`, detail:`modulateScrollY( tex, scrollY = 0.5, speed )`},
		]
}, 
{
	type: "ARRAY",
	methods: [
		{name: `[#, #]`, detail:`osc([5, 10, 20, 40]).out()`},
		{name: `[].fast()`, detail:`osc([5, 10, 20, 40].fast(3)).out()`},
		{name: `[].smooth()`, detail:`osc(10, .1, [0, .1, .5, 1].smooth(.5)).out()`},
		{name: `[].ease()`, detail:`osc(10, .1, [0, 5].ease('easeInOutCubic')).out()`},
		{name: `offset()`, detail:`see docs`},
		{name: `fit()`, detail:`see docs`},
		]
}, 
{
	type: "AUDIO",
	methods: [
		{name: `a.show()`, detail:`show audio bars`},
		{name: `a.hide()`, detail:`hide audio bars`},
		{name: `a.setBins()`, detail:`a.setBins(6)`},
		{name: `a.fft[]`, detail:`()=>a.fft[0]`},
		{name: `a.setCutoff()`, detail:`a.setCutoff(4)`},
		{name: `a.setScale()`, detail:`a.setScale(2)`},
		{name: `a.setSmooth()`, detail:`a.setSmooth(0.8)`},
		]
}, 
{
	type: "SYNTH SETTINGS",
	methods: [
		{name: `hush()`, detail:`stop everything!`},
		{name: `out()`, detail:`out( o0 )`},
		{name: `render()`, detail:`render( o0 )`},
		{name: `setResolution()`, detail:`setResolution( width, height)`},
		{name: `speed`, detail:`speed = 1`},
		{name: `bpm`, detail:`bpm = 60`},
		{name: `width`, detail:`()=>width`},
		{name: `height`, detail:`()=>height`},
		{name: `mouse.x`, detail:`()=>mouse.x`},
		{name: `mouse.y`, detail:`()=>mouse.x`},
		{name: `time`, detail:`()=>time`},
		{name: `update`, detail:`see docs`},
		]
}, 
			// {
			// 	type: "",
			// 	methods: [
			// 		{name: ``, detail:``},
			// 	]
			// }
]