class KeyControls {

    keys: boolean[];

	constructor() {
		//Bind event handlers
		document.addEventListener("keydown", e => {
			if ([37, 38 , 39, 40].indexOf(e.which) >= 0){
				e.preventDefault();							//verhindert, dass der Browser scrollt, wenn die Pfeiltasten gedrueckt werden
			}
			this.keys[e.which] = true;
		}, false);
		document.addEventListener("keyup", e => {
			this.keys[e.which] = false;
		}, false);
	}
	//Handle key actions
	get action() {				//action property tells us, if the key (e.g. 32 = space bar) is currently pressed
		return this.keys[32];
	}
	get x1() {					//x property tells us, if a horizontal movement is requested: A / left arrow or D / right arrow
		if (this.keys[37]){
			return -1;
		}
		if (this.keys[39]){
			return 1;
		}
		return 0;		//no relevant key pressed, no horizontal movement requested
	}
	get y1() {					//y property tells us, if a vertical movement is requested: W / up arrow or S / down arrow
		if (this.keys[38]){
			return -1;
		}
		if (this.keys[40]){
			return 1;
		}
		return 0;		//no relevant key pressed, no vertical movement requested
	}
	get x2() {					//x property tells us, if a horizontal movement is requested: A / left arrow or D / right arrow
		if (this.keys[65]){
			return -1;
		}
		if (this.keys[68]){
			return 1;
		}
		return 0;		//no relevant key pressed, no horizontal movement requested
	}
	get y2() {					//y property tells us, if a vertical movement is requested: W / up arrow or S / down arrow
		if (this.keys[87]){
			return -1;
		}
		if (this.keys[83]){
			return 1;
		}
		return 0;		//no relevant key pressed, no vertical movement requested
	}
}
export { KeyControls };

//to find out, which number equals a key use:
//document.addEventListener("keydown", e => {console.log(`${e.which}: ${e.key}`)}, false);