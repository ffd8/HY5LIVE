var aceSnippets = [
			{
				"tabTrigger": "p5",
				"name": "p5",
				"content": 
`function setup() {
	createCanvas(windowWidth, windowHeight)
}

function draw() {
	\${1}
}

P5.init() // default: s0, ie. src(s0).out(o0)
`

			},{
				"tabTrigger": "p5detail",
				"name": "p5detail",
				"content": 
`function setup() {
	createCanvas(windowWidth, windowHeight)
}

function draw() {
	\${1}
}

P5.init() // default: s0
// P5.zIndex() // default: -1
// P5.hide() // hide p5 canvas, p5.show()
// H.pixelDensity() // default: 2, retina hydra

// src(s0).out(o0) // view p5 in hydra
`

			},{
				"tabTrigger": "p52hydra",
				"name": "p52hydra",
				"content": 
`function setup() {
	createCanvas(windowWidth, windowHeight)
}

function draw() {
	\${1}
}

P5.init()
P5.hide()
H.pixelDensity() // 2.0

src(s0)
	.out(o0)
`
			},{
				"tabTrigger": "hydra2p5",
				"name": "hydra2p5",
				"content": 
`// hydra2p5

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
	// clear()

	H.get()
	texture(h0)
	\${1}
}

P5.zIndex(1)
P5.init()
// H.hide()

osc().out(o0)
`
			},{
				"tabTrigger": "hydra2p5x4",
				"name": "hydra2p5x4",
				"content": 
`// hydra2p5x4

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
	H.render() // get hydra o0-o3 as h0-h3
	// texture(h0)
	// texture(h1)
	// texture(h2)
	// texture(h3)
	\${1}
}

P5.zIndex(1)
H.pixelDensity(.5)
// H.hide()

osc().out(o0)
noize().out(o1)
voronoi().out(o2)
gradient().out(o3)

render()
`
			},{
				"tabTrigger": "src",
				"name": "src",
				"content": 
`src(s0).out(o0)`
			},{
				"tabTrigger": "h2",
				"name": "h2",
				"content": 
`var H2 = HY5.hydra('h2', 'synth')
P5.init(synth.s0)
// H2.z(2)

H2.pixelDensity(2)

//synth.src(synth.s0).out(synth.o0)`
			},{
				"tabTrigger": "bcd_p52hydra",
				"name": "bcd_p52hydra",
				"content": 
`function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	angleMode(DEGREES)
}

function draw() {
	clear()
	noFill()
	strokeWeight(2)
	stroke(255)
	rotateX(frameCount / 4)
	rotateY(frameCount / 3)
	box(height * .4)
}

P5.init() // p5 » hydra: s0
// P5.hide()
// H.pixelDensity(2)

src(s0)
	// .modulate(noize(3, .5))\${1}
	// .modulateScale(osc(8), .4)
	// .add(src(o0).scale(1), .99)
	.out()`
			},{
				"tabTrigger": "bcd_hydra2p5",
				"name": "bcd_hydra2p5",
				"content": 
`function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	angleMode(DEGREES)
	noStroke()
}

function draw() {
	clear()

	H.get() // hydra » p5: h0
	texture(h0)

	rotateY(frameCount / 3)
	rotateX(frameCount / 4)
	box(height / 2)\${1}
}

P5.init()
P5.zIndex(1)

// H.hide()

gradient(1)
	.blend(noize().scale(1.1))
	.modulateScale(noize(), .2)
	// .add(src(s0).scale(.3), .5)
	.out()`
			},
			
]