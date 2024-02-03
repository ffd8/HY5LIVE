class Files{
	constructor(name, elm, opts = {}){
		this.name = name
		this.files = []
		this.elm = document.getElementById(elm)
		this.views = []
		this.viewsActive = true
		this.navActive = true
		this.current = null

		for(const [key, value] of Object.entries(opts)){
			this[key] = value
		}
	}

	init(){
		this.getCurrent()
		this.render()
		toggleElm(this.name)
		this.parseCode(0)
	}

	clear(){
		this.files = []
		localStorage.removeItem(this.name)
	}

	add(name, code, activate = true){
		this.files.unshift({
			name : name,
			code : code
		})
		this.set()
		if(activate){
			setTimeout(()=>{this.activeSet(0)}, 100)
		}
	}

	update(index, code){
		this.files[index].code = code
		this.set()
	}

	remove(index){
		// let remove = confirm(`Remove Sketch: \n${this.files[index].name}`)
		// if(remove){
		this.files.splice(index, 1);
		if(index == this.current){
			this.current = null
			this.setCurrent()
		}
		this.set()
		this.render()
		// }
	}

	set(){
		localStorage.setItem(this.name, JSON.stringify(this.files))
	}

	get(){
		this.files = JSON.parse(localStorage.getItem(this.name))
		this.render()
	}

	setCurrent(){
		localStorage.setItem(this.name + '-current', this.current)
	}

	getCurrent(){
		this.current = localStorage.getItem(this.name + '-current')
	}

	export(){
		let exportJSON = {
			app : 'HY5LIVE',
			time : Math.floor(Date.now() / 1000),
			files: this.files
		}
		const blob = new Blob([JSON.stringify(exportJSON)]);
		const link = document.createElement("a");
		link.download = `HY5LIVE_${this.name}.json`;
		link.href = window.URL.createObjectURL(blob);
		link.click()
	}

	render(){
		let self = this
		// toggleElm(this.name)
		this.elm.innerHTML = ''
		this.views = []
		// var filesHTML = ''
		// this.files.reverse()
		for(let i=0; i < this.files.length ;i++){
		// for(let i=this.files.length-1; i >= 0 ;i--){
			let hf = this.files[i]
			// filesHTML += `<div class="file" onclick="parseCode('${this.name}', ${i})">${hf.name}</div>`
			let o = document.createElement("div");
				o.id = i//hf.name
				o['data-id'] = i
				o.classList.add('file')// = 'file'
				o.innerHTML = '<div class="file-name">'+(hf.name.length > 19 ? `${hf.name.substring(0, 19).trim()}...`:hf.name) +'</div>' + (this.navActive?`<span class="file-nav" style="float:right;"></span>`:'');
				o.onclick = ()=>{self.parseCode(i)}
				if(this.navActive){
					o.onmouseenter = ()=>{this.showNav(i)}
					o.onmouseleave = ()=>{this.hideNav(i)}
				}

				// o.addEventListener('click', () => { self.parseCode(i) } );
			this.elm.appendChild(o)
			this.views.push(i)
		}

		if(this.current != null){
			this.activeSet(this.current)
		}
		// this.elm.innerHTML = filesHTML
		// this.parseCode(0)


		if(this.navActive){
			this.sortable = Sortable.create(this.elm, {
				scroll: true,
				scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
				scrollSpeed: 10, // px, speed of the scrolling
				bubbleScroll: true, // apply autoscroll to all parent elements, allowing for easier movement
				revertOnSpill: true,
				group: this.name,
				animation: 0,
				dataIdAttr: 'id',
				ghostClass: 'sort-ghost',
				dragClass: 'sort-drag',
				onEnd: (evt) => {
					var order = this.sortable.toArray();
					var tempFiles = []
					for(let o of order){
						tempFiles.push(this.files[o])
					}
					this.files = tempFiles
					this.set()
					this.render()
				}
			})
		}
		

	}

	showNav(index){
		let self = this
		let navHolder = document.createElement("div");
		
		let navRename= document.createElement("div");
			navRename.innerHTML = `<div class="nav-svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div>`;
			navRename.onclick = ()=>{sketchRename(self.name, index)}
		navHolder.appendChild(navRename)

		let navTrash = document.createElement("div");
			navTrash.innerHTML = `<div class="nav-svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></div>`;
			navTrash.onclick = ()=>{sketchRemove(self.name, index)}
		navHolder.appendChild(navTrash)
		
		var filesNav = this.elm.getElementsByClassName('file-nav')[index]
		filesNav.innerHTML = ''
		filesNav.appendChild(navHolder)
	}

	hideNav(index){
		var filesNav = this.elm.getElementsByClassName('file-nav')[index]
		if(this.current != index)
		filesNav.innerHTML = ''
	}

	parseCode(index){
		// hydraSketch = {files:this.name, name:this.files[index].name}
		parseHydra(this.files[index].code)
		this.activeSet(index)
	}

	getCode(){
		return this.files[this.current].code
	}

	activeSet(index){
		this.activeClear()

		let files = this.elm.getElementsByClassName('file')
		files[index].classList.add('active')
		if(this.viewsActive){
			files[index].classList.add('viewed')
			this.view(index)
		}
		this.current = index
		if(this.navActive){
			this.showNav(index)
		}
		setTimeout(()=>{this.setCurrent()}, 0)
	}

	activeClear(){
		let docfiles = this.elm .getElementsByClassName('file')
		for(let f of docfiles){
			f.classList.remove('active')
			if(this.navActive){
				f.querySelector('.file-nav').innerHTML = ''
			}
			
		}
		this.current = null
		this.setCurrent()
	}

	random(){
		if(this.views.length > 0){
			let rando = this.views[Math.floor(Math.random()*this.views.length)]
			this.view(rando)
			this.parseCode(rando)
		}
	}

	view(value){
		const index = this.views.indexOf(value);
		if (index > -1) { // only splice array when item is found
			this.views.splice(index, 1); // 2nd parameter means remove one item only
		}
	}
}