import { Position } from "./Position";

class Square {
    
    width: number;
    height: number;
    pos: Position;
    style: any;
    
    constructor(w, h, style = {}){
		this.width = w;
		this.height = h;
		this.pos = {x: 0, y: 0};
		this.style = style;
	}
}

export { Square };