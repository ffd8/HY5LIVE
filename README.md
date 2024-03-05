# <img src="includes/images/hy5live.svg" style="height:100px;" alt="HY5LIVE logo">
v 0.3.1  
cc [teddavis.org](http://teddavis.org) 2024 –  
hydra 🙏 p5.js live-coding environment!

## SHORTCUTS

|  ||
|--:|:--|
|`CTRL` + `ENTER`|compile block|
|`SHIFT` + `CTRL` + `ENTER`|compile all|
|`ALT` + `CTRL` + `ENTER`|compile selection|
|`CTRL` + `E`|toggle editor|
|`CTRL` + `M`|toggle menu|
|`CTRL` + `N`|new sketch|
|`CTRL` + `SPACEBAR`|autocomplete|
|`SHIFT` + `CTRL` + `T`|tidy code|
|`SHIFT` + `CTRL` + `S`|save snapshot (.js + .png)|
|`ALT` + `UP/DOWN`|shift lines up/down|
|`META` + `ALT` + `UP/DOWN`|duplicate lines up/down|
|`CTRL` + `ALT` + `UP/DOWN`|multiple-cursors up/down|

*The last few are Ace Editor specific, [click to view all](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)*.

## ABOUT
[HY5LIVE](https://hy5live.teddavis.org) is a minimal live-coding editor to showcase [HY5](https://github.com/ffd8/hy5) which bridges the gap between [hydra-synth](https://github.com/hydra-synth/hydra-synth) and [p5.js](https://p5js.org), containing a suite of functions for passing visuals between both frameworks (`hydra` » `p5` || `p5` » `hydra`), while enabling global-mode code within both! 

*FYI, global-mode refers to functions of each library being used without a scoped prefix (ie. `p.` or `synth.`) which is commonly used when combining multiple libraries to avoid naming conflicts (ie. both have a `noise()` function). While scoping avoids conflicts, it requires lots of extra characters and easily trips one up when only sometimes being necessary (ie, chaining).*  

HY5LIVE started as a tool for reviewing students homework, evolved into an alternative hydra editor using [Ace](https://ace.c9.io/), bridged into a Hydra meets p5 playground, which then became HY5 library on its own and now is a sandbox of re-approaching a live-coding editor with some new ideas and techniques. It borrows heavily from [P5LIVE](https://p5live.org/) while reinventing aspects that will likely find their way upstream back into that tool. 

FYI – this workflow involves multiple fullscreen HTML5 Canvas elements, so a chromium browser is recommended. If performance is low, reduce the resolution using p5's `pixelDensity()` and `H.pixelDensity()` for hydra.

For more in-depth live-coding specific to each framework, see:  
- [hydra editor](https://hydra.ojack.xyz), official hydra editor  
- [P5LIVE](https://p5live.org/), p5.js collaborative live-coding vj environment!

## COMPILING
Blocks of code are defined in HY5LIVE by any lines immediately touching, and are separated by blank lines before and after them, ie:  
  
```js
osc().out()
```
```js
osc()
	.modulate(voronoi())
	.out()
```
By default, HY5LIVE compiles the current block being edited, so in the above example, typing on the 1st block, would show those visuals on default `o0`, whereas if one then made edits on block 2, it would overwrite `o0` and display its visuals. 

While Hydra code is evaluated as blocks, p5.js code is evaluated per function `{}` brackets. Changes to the `setup()` function will cause a hardCompile, whereas changes to the `draw()` should softCompile for smooth updates. When in doubt or things don't seem to be working, make a hardCompile `CTRL + SHIFT + ENTER`.

HY5LIVE tries to automatically compile your code on every keypress, using lots of tricks and error catching, however you can always force your own recompiles. You can compile the current block (where text cursor is) with `CTRL + ENTER`, a selection of code with `CTRL + SHIFT + ENTER` or the whole iframe + sketch with `CTRL + SHIFT + ENTER`. Therefore, be sure to separate hydra `init` functions like `s0.initScreen()` with separate lines to try and prevent it from re-displaying dialog box unnecessarily.

#### tldr;
If your code isn't compiling/updating, press `CTRL + SHIFT + ENTER`.  
This does a complete recompile, usually needed for p5.js due to setup/draw.

## GETTING STARTED
While there's more details in the API section below, here's some tips to get going.

### P5 » Hydra
Send p5.js into hydra by using the following functions:

```js
// send main canvas to hydra, place in setup() or global
s0.initP5() // send p5 canvas to hydra s0 (s0 - s3)
P5.init() // same as above 

// send layer/buffer to hydra, place in setup()
s1.initP5(lay1) // send p5 'lay1' buffer/layer to hydra s1
P5.init(s1, lay1) // same as above 
```

*HY5 started with `P5.` method, however Olivia rightfully suggested `s0.` as approach to stay in tune with Hydra » √ thanks!*

### Hydra » P5
Send Hydra into P5 by using the following functions:  
*By default, new layers created dynamically are given `h` as a prefix for hydra, h0 - h3*

```js
// send main output of Hydra render to p5
H.get() // use directly, also creates a layer called 'h0'
H.get('tex') //  same as above, with custom layer name

// send specific output of Hydra to p5, when using render()
o0.get() // use directly (o0-o3) as image/texture
H.get(o0) //  use directly (o0-o3), also creates layer called 'h0'
H.get(o1, 'tex') // same as above, with custom layer name
H.render(o0) // grabs specific output (o0 - o3), mimics hydra
H.render(o0, 'tex') // same as above, custom layer name

// send all outputs of Hydra to p5, when using render()
H.render() // use directly, creates layers h0 - h3 and h[0-3] array
H.render('t') // same as above, with custom layers prefix (t0 - t3)
```

### Canvas Tweaks
Since we have multiple canvases (p5.js and hydra), we likely want to toggle them on/off occasionally or adjust their order (z-index). This can be done by using the `P5` or `H` prefix, depending on which canvas you're addressing:

```js
// toggle canvas
P5.show() // show p5.js canvas
P5.hide() // hide p5.js canvas
P5.toggle() // toggle p5.js canvas, default 0 (hide), (0 - 1)
H.show() // show hydra canvas
H.hide() // hide hydra canvas
H.toggle() // toggle hydra canvas, default 0 (hide), (0 - 1)

// adjust order, z-index
P5.zIndex() // send p5.js canvas to back, default is -1
P5.zIndex(2) // bring in front
P5.z() // shorthand for above two functions
H.zIndex() // send hydra canvas to back, default is -1
H.zIndex(2) // bring in front
H.z() // shorthand for above two functions
```

## API
### Overview
Under the hood, HY5 creates a few global variables (`HY5`, `P5`, `H`) which are your keys for talking to each framework's canvas and bridging the gap between p5.js and hydra. It also extends existing hydra objects (`s` and `o` for exchange with p5):
 
- `P5` affects p5.js and canvas.
- `H` affects hydra and canvas.
- `HY5` stores delay prefs (for checking canvas ready) and inits `H` instances.

### P5
*p5.js specific – mostly used in the global code space (not within other functions).*

**s0.initP5()**  
**s0. initP5( [layer] )**  
Same as `P5.init()` function, in Hydra style (use s0 - s3). You can pass an existing p5 layer/image rather than main canvas, ie. `s0.initP5(lay1)`. If doing so, place within the `setup()` after you've initialized the layer.

**P5.init()**  
**P5.init( [ source, layer ] )**  
Send p5.js canvas/layer as a hydra source. If no values are set, takes main p5.js canvas and sets hydra's `s0` external source. Use `src(s0).out()` to access it within hydra. Optionally pass it to a specific hydra source (s0, s1, s2, s3). Optionally you can also send another p5.js layer/image. If doing so, place within the `setup()` after you've initialized the layer. If passing the p5.js webcam capture, use `capture.get()` to dynamically convert to a passible image.  
Without params, (`s0`, `drawingContext.canvas`)

**P5.hide()**  
Hide p5.js canvas.

**P5.show()**  
Show p5.js canvas.

**P5.toggle()**  
**P5.toggle( [ tog ] )**  
Toggle p5.js canvas, use `true/false` or `1/0` to `show()/hide()` the canvas.  
Without params, (`0`) to hide the canvas.

**P5.zIndex()**  
**P5.zIndex( [index] )**  
Set css `z-index` of p5.js canvas to place in front or behind hydra.  
Without params, (`-1`) to place behind other canvases.

**P5.z()**  
**P5.z( [index] )**  
Alias of P5.zIndex()


### H
*hydra specific – used within hydra chains, p5.js draw(), global space.*

**noize()**  
Alias of hydra's `noise()` to avoid p5's `noise()` conflict.


**H.pixelDensity()**  
**H.pixelDensity( [res] )**  
Set pixelDensity of hydra canvas (similar to p5.js). Use for lo/hi-res.  
Without params, (2.0) for retina resolution

**H.pd()**  
**H.pd( [res] )**  
Alias of H.pixelDensity()

**o0.get()**  
**o0.get( [layer] )**  
Same as `H.get()` function, in Hydra style (use o0 - o3). You can pass an existing p5 layer or a string for dynamically created one, ie. `o0.get('tex')`.

**H.get()**  
**H.get( [layer] )**  
**H.get( [output] )**  
**H.get( [output], [layer] )**  
Get hydra canvas to use directly and sets to a p5 layer (`createGraphics`). You can pass an existing p5 layer or a string for dynamically created one, ie. `H.get('tex')`. Passing a hydra output as param (`o0`, `o1`, `o2`, `o3`), it will grab that single output if hydra is set to `render()` (4up view). If both params are given, it will grab a specific hydra output and use a custom layer, ie. `H.getOutput(o2, 'tex2')`.   
Without params, creates layer called `h0`.

**H.render()**  
**H.render( [prefix] )**  
**H.render( [output] )**  
**H.render( [output, layer] )**  
Draw all hydra outputs (`o0`, `o1`, `o2`, `o3`) to p5 layers, *only* when hydra's `render()` (4up view) is active. This creates 4x p5.js layers (`h0`, `h1`, `h2`, `h3` and `h[0-3]` for looped index access). If `output` is given a string prefix, ie. `tex`, then all outputs will be created with a custom prefix (`tex` instead of `h`). If `output` is given a hydra output (ie. `o2`), will draw specific hydra output to default `h0` layer (similar to `H.get()`, however in same syntax as hydra's `render(output)`.  If layer is also given, will draw specific hydra output to specific p5.js layer.  
Without params, grabs `o0-o3` and creates layers called `h0-h3`.

**H.getCanvas(canvas, layer)**  
Draw any canvas to a p5 layer. *(go wild?!)*

**H.save()**  
Save png of hydra canvas.

**H.hide()**  
Hide hydra canvas.

**H.show()**  
Show hydra canvas.

**H.toggle()**  
**H.toggle( [ tog ] )**  
Toggle hydra canvas, use `true/false` or `1/0` to `show()/hide()` the canvas.  
Without params, (`0`) to hide the canvas.

**H.zIndex()**  
**H.zIndex( [index] )**  
Set css `z-index` of hydra canvas to place in front or behind p5.    
Without params, (`-1`) to place behind other canvases.

**H.z()**  
**H.z( [index] )**  
Alias of H.zIndex()

**H.audio()**  
**H.audio(toggle)**  
Enable/disable hydra audio detection. This is active by default, however if you prefer to use p5.sound, set to false, ie `H.audio(false)`.  
Without param, `true`

**H.noSmooth()**  
**H.noSmooth(toggle)**  
Enable/disable `noSmooth()` when setting hydra to p5.js layers. This is active by default for crisp (nearest neighbor) edges, however you can set to false, ie `H.noSmooth(false)`.  
Without param, `true`

**H.canvas()**  
Alias of `hydra.canvas` for quick access.

### HY5

**HY5.delay(newDelay)**  
Set custom `setTimeout()` delay (default is 50 ms) necessary when referring to dynamically built canvases with P5 functions. Default delay worked fine in testing (M1 Mac), but if computer/connection are slower, you may want to set to higher value (in milliseconds) at very top of code.

**HY5.hydra(hydraName, synthName)**  
Create an additional instance of hydra (canvas and synth scoped) for post-post-...-processing! This function has already been called once, setting the global variable `H`. Only needed for extra-wild experiments, see `hydra » p5 » hydra` demo for details.

```js
var H2 = HY5.hydra('hydra2', 'synth') // hydra scoped behind 'synth'
synth.s0.initP5() // p5 » hydra2's instance
// H2.z(2) // bring to front

H2.pixelDensity(2) // retina 2x resolution

synth.src(synth.s0)
	.out(synth.o0)
```

## SNIPPETS
The following snippets have been added to Ace's editor.  
Type a given snippet word, followed by the `TAB` key:  

**p5**  
Inserts necessary code for using p5.js + setting hydra's `s0` source to its canvas.

**p5detail**   
Inserts necessary code for using p5.js + overview of available functions specific for p5.

**p52hydra**  
Inserts complete code for using p5.js canvas within hydra.

**hydra2p5**  
Inserts complete code for using hydra canvas within p5.js.

**hydra2p5x4**  
Inserts complete code for using hydra's 4x outputs (o0,o1,o2,o3) within p5.js as 4x separate images/textures (h0,h1,h2,h3).

**src**  
Inserts `src(s0).out(o0)` for pulling p5 into hydra

**h2**  
Adds complete code for a 2nd instance of HY5 hydra for post-processing.

## SAVING
*HY5LIVE uses the browser's localStorage, so only have open in ONE tab to avoid overwriting data! It's ok to run both online + offline mode, since localStorage is based on URL:PORT.*

### Current Sketch
All changes to the current editor live in the *volatile* (yet localStorage saved) space. You can close the window and keep working on it the next time you load HY5LIVE. 

If there's a serious problem/bug with the current sketch, add `#bug` to the URL and reload the site. This disables the compiling engine so you can fix the issue. Remove `#bug` and refresh to disable.

### Saving Sketches
Saving a sketch, adds it as a `readonly` file, meaning that you can remix yourself as often as you like. Consider these as `templates` for future play. HY5LIVE will take the first line `// comment` as the default name for your sketch.

If you ever need to change a saved sketch, you can first activate it, then click the `Sketch Editor` button to reveal the panel for making adjustments to that sketch (or any other). Be sure to `Save` the changes if you want before closing the editor. You can also customize what a `New Sketch` base code includes.

### Snapshots
Save a snapshot `SHIFT + CTRL + S` to save multiple files:

- code as .js file
- png of hydra canvas
- png of p5 canvas

*If using 2nd hydra, you'll need to custon trigger image, ie: `H2.save()`*

### Backup often!
Sketches are **_ONLY_** saved in your browser's localStorage!  
Export all (<img class="svg" src="includes/icons/download.svg" height="12px">) sketches regularly, re-import by drag+dropping file into window.  
Clearing browser history/data will likely erase all sketches + settings.

## IMPORTING
### Sketches
#### Gallery
You can use HY5LIVE to review a handful of sketches (homework, saved outputs) by dragging and dropping multiple files over the editor. This creates a `Gallery` panel within the sketches panel. You can click on each one or view randomly – each one is marked as viewed, to help review all imported sketches. Press the `X` button to clear the gallery. 

#### Sketch
Drag and drop a single .js file for importing a single sketch to the editor.

#### HY5LIVE Sketches
Drag and drop an exported HY5LIVE .json file to reimport your sketches. You'll have the option to skip duplicates. Useful if syncing between online/offline, sharing with others, or re-importing after changing URL/ports.

### Libraries
You can import any additional libraries/frameworks either locally with offline mode or using CDN (remotely hosted). Add them to the following array at the top of your code:

```js
let libs = ['']
```

### Assets
Same as libraries, load locally within suggested `/data` directory, or online hosting them somewhere CORS friendly. 

## AUDIO REACTIVITY
Both Hydra + p5.js (via p5.sound) can listen in realtime to your microphone (plus sound cards) for audio-reactive visuals! Both have pros/cons and can be applied to each others contexts, so mix + match! 

### Hydra
Hydra's [Audio Responsiveness](https://github.com/hydra-synth/hydra?tab=readme-ov-file#audio-responsiveness) is activated by default.  
To disable, add `H.audio(false)` to your code. 

The main functions to use are:

```js
a.show() // show audio-in preview
a.hide() // hide audio-in preview

a.fft[] // array of bins stored with audio values

a.setBins() // set number of bins
a.setSmooth() // set fft[] easing (0 - 1, jittery - smooth)

// example:
a.setSmooth(.95)
voronoi( ()=>a.fft[0]*20 ).out()
```

### p5.js
HY5LIVE introduces a mini-class called `AudioP5` which borrows from and improves upon the audio-snippet of P5LIVE. It also attempts to match the style of Hydra's wonderfully simple audio API. 

FYI, the [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) library is always loaded by default, but only active when calling functions below. An older p5.sound v0.3.11 is loaded (2019), as it worked much smoother without bugs introduced since version 1.0 (weird browser/audio-worklet issues). If you want to manually load a newer version (or use tone.js), add `// no p5sound` to your code and manually include other libs (see Importing Libraries above).

The main functions to use are:

```js
// usage
a5.setup() // add to setup(), init audio-reactive functions
a5.update() // add to draw(), gets latest audio values
a5.ease = .075 // adjust easing/smoothing of eased audio analysis

// basic
a5.amp // average audio level across spectrum (max value, 1000)
a5.ampEase // avg audio, smoothed
a5.ampL // stereo left average audio (max value, 500)
a5.ampEaseL // stereo left avg, smoothed
a5.ampR // stereo right average audio (max value, 500)
a5.ampEaseR // stereo right avg, smoothed

// fancy
a5.fft[] // array of 128 freq. bins ~ equalizer (0 «» 255)
a5.fftEase[] // smoothed fft
a5.wave[] // array of 512 points along waveform (-1 «» 1)
a5.waveEase[] // smoothed wave

```

## OFFLINE MODE
You can run the downloaded HY5LIVE folder within any localhost server setup you have, or easily run HY5LIVE offline using nodejs/npm for an `express` webserver.

- [Download HY5LIVE](https://github.com/ffd8/HY5LIVE/archive/refs/heads/main.zip) or [Clone GitHub repo](https://github.com/ffd8/HY5LIVE)
- [Install Node.js + npm](https://nodejs.org/en/download/)
- Open Terminal/Command-Prompt
- type `cd + [spacebar]` + drag/drop HY5LIVE folder, press `ENTER`
- type `npm install`, press `ENTER`
- type `npm start`, press `ENTER`  
*(can also use custom port, ie. `npm start 5050`, default is 5555)*
- HY5LIVE is live! Visit » [http://localhost:5555](http://localhost:5555)
- Quit or `CTRL + C` to cancel process.

## SOURCE
Found a bug/idea/question?  
» [https://github.com/ffd8/hy5live](https://github.com/ffd8/hy5live)

## THANKS

- [ojack](https://ojack.xyz/work/hydra/), making [hydra-synth](https://github.com/hydra-synth/hydra-synth)(!) + canvas wizardy setting bug for p5 + hydra magic
- [Lauren Lee McCarthy](https://lauren-mccarthy.com/p5-js), making [p5.js](https://p5js.org/) (+ [amazing contributors](https://github.com/processing/p5.js#contributors)!)
- [Flor de Fuego](https://flordefuego.github.io/), constantly pushing boundries with hydra + p5 ( + p5.glitch)
- [nervousdata](https://nervousdata.com/wiese/txt_phydra.html), sharing amazing ways to use and combine hydra + p5
- [HGK Basel IDCE Students](https://www.fhnw.ch/en/about-fhnw/schools/academy-of-art-and-design/institute-digital-communication-environments), making hydra sketches, forcing this project to begin...
- [you](), making it this far down the readme!