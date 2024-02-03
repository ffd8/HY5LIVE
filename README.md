# HY5LIVE
v 0.3  
cc [teddavis.org](http://teddavis.org) – 2023  
hydra 🙏 p5.js live-coding environment!

[HY5LIVE](https://hy5live.teddavis.org) is a minimal live-coding editor to showcase [HY5](https://github.com/ffd8/hy5) which bridges the gap between [hydra-synth](https://github.com/hydra-synth/hydra-synth) and [p5.js](https://p5js.org), enabling global-mode code in both frameworks, for the best of both worlds! (`hydra` » `p5` || `p5` » `hydra`). 

*FYI, global-mode refers to the functions from each library being available without a scoped prefix (ie. `p.` or `synth.`) which is commonly used when combining multiple libraries to avoid function name conflicts. While helpful to avoid conflicts, scoping requires extra characters per line and can easily trip one up when only sometimes necessary (ie, chaining).*  

HY5LIVE an experimental editor, compiling on every keypress for instant feedback, focused on combining these two powerful frameworks with small tricks to help them communicate. For more in-depth live-coding specific to each framework, see:  
- [hydra editor](https://hydra.ojack.xyz), official hydra editor  
- [P5LIVE](https://p5live.org/), p5.js collaborative live-coding vj environment!

## SHORTCUTS

|  |  |
|--:|:--|
|`CTRL` + `ENTER`|compile block|
|`CTRL` + `SHIFT` + `ENTER`|compile all|
|`CTRL` + `ALT` + `ENTER`|compile selection|
|`CTRL` + `E`|toggle editor|
|`CTRL` + `M`|toggle menu|
|`CTRL` + `N`|new sketch|
|`CTRL` + `SHIFT` + `T`|tidy code|
|`CTRL` + `SHIFT` + `S`|save snapshot (.js + .png)|
|`META` + `ALT` + `UP/DOWN`|duplicate lines up/down|
|`ALT` + `UP/DOWN`|shift lines up/down|

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

While HY5LIVE tries to automatically compile your code on every keypress, using lots of error catching, you can always force your own recompiles. You can compile the current block (where text cursor is) with `CTRL + ENTER`, a selection of code with `CTRL + SHIFT + ENTER` or the whole iframe + sketch with `CTRL + SHIFT + ENTER`. Therefore, be sure to separate hydra `init` functions like `s0.initScreen()` with separate lines to try and prevent it from re-displaying dialog box unnecessarily.

### tldr;
If your code isn't compiling, press `CTRL + SHIFT + ENTER`.  
This does a complete recompile, usually needed for p5.js due to setup/draw.

## API
### Overview
Under the hood, HY5 creates a few global variables (`HY5`, `P5`, `H`) which are your keys to briding the global p5.js and hydra space:
 
- `HY5` stores delay prefs (for global init issues) and inits `H` instances.
- `P5` affects p5.js.
- `H` affects hydra. *It's a class, allowing multiple hydras for post-post-processing?! See below for details.*

### HY5
*Ignore this section except for advanced use.*  

**HY5.delay(newDelay)**
Set cusom `setTimeout()` delay (default is 100 ms) necessary when referring to dynamically build canvases in further functions below. Default delay worked fine in testing (M1 Mac), but if computer/connection are slower, you may want to set to higher value (in milliseconds).

**HY5.hydra(hydraName, synthName)**
Create an additional instance of hydra (canvas and synth scope) for post-post-...-processing. This function has already been called once, setting the global variable `H` (see below). Only needed for extra-wild experiments, see demos for details.

### P5
*p5.js specific – mostly used in the global code space (not within other functions).*

**P5.init()**  
**P5.init( [ source, layer ] )**  
Send p5.js canvas/layer as a hydra source. If no values are set, takes main p5.js canvas and sets hydra's `s0` external source. Use `src(s0).out()` to access it within hydra. Optionally pass it to a specific hydra source (s0, s1, s2, s3). Optionally you can also send another p5.js layer/image. If passing the p5.js webcam capture, use `capture.get()` to dynamically convert to a passible image.  
Without params, (`s0`, `drawingContext.canvas`)

**P5.hide()**  
Hide p5.js canvas.

**P5.show()**  
Show p5.js canvas.

**P5.zIndex()**  
**P5.zIndex( [index] )**  
Set css `z-index` of p5.js canvas.  
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
Without params, (2.0)

**H.get()<br>H.get( [layer] )**  
Get hydra canvas and set to a p5 layer (`createGraphics`). You can pass an existing p5 layer or a string for preferred name of output layer, ie. `H.get('tex')`.   
Without params, creates layer called `h0`.

**H.getOutput()**  
**H.getOutput( [src] )**  
**H.getOutput( [src, layer] )**  
Get specific hydra output (ie, `o0`, `o1`) when hydra is in `render()` mode (4up view).  and set to a p5 layer (`createGraphics`). You can specify the output layer (`o0`, `o1`, `o2`, `o3`) and you can pass an existing p5 layer or a string for preferred name of output layer, ie. `H.getOutput(o2, 'tex2')`.   
Without params, grabs `o0` and creates layer called `h0`.

**H.getCanvas(canvas, layer)**  
Draw alt canvas to a p5 layer. *(go wild?!)*

**H.render()**  
**H.render( [prefix] )**  
**H.render( [output] )**  
**H.render( [output, layer] )**  
Draw all hydra outputs (`o0`, `o1`, `o2`, `o3`) to p5 layers, *only* when hydra's `render()` (4up view) is active. This creates 4x p5.js layers (`h0`, `h1`, `h2`, `h3` and `h[0-3]` for looped index access). If `output` is given a string prefix, ie. `tex`, then all outputs will be created with a custom prefix (`tex` instead of `h`). If `output` is given a hydra output (ie. `o2`), will draw specific hydra output to default `h0` layer (similar to `H.get()`, however in same syntax as hydra's `render(output)`.  If layer is also given, will draw specific hydra output to specific p5.js layer.  
Without params, grabs `o0-o3` and creates layers called `h0-h3`.

**H.hide()**  
Hide hydra canvas.

**H.show()**  
Show hydra canvas.

**H.zIndex()**  
**H.zIndex( [index] )**  
Set css `z-index` of hydra canvas.  
Without params, (`-1`) to place behind other canvases.

**H.z()**  
**H.z( [index] )**  
Alias of P5.zIndex()

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

## SAVING
Sketches are **_ONLY_** saved in your browser's localStorage(!).  
Export all (<img class="svg" src="includes/icons/download.svg" height="12px">) sketches + settings regularly.  
Clearing browser history/data will likely erase all sketches + settings.

All changes live in the 'volatile' (yet saved on refresh) editing space. When saving a sketch, a 'read-only' version is saved for future reference and building upon again (contrary to P5LIVE, where every keypress auto-saves). Incase there's a bug or to make a change, either save a new sketch, or use the 'sketch editor' to modify one. 