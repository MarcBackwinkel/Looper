import canvasElement from './canvasElement';

class Sprite extends canvasElement{

	constructor(texture){
        super();
		this.texture = texture;
		this.pos = { x: 0, y: 0};
		this.scale = { x: 1, y: 1};
	}
}

//export default Sprite;