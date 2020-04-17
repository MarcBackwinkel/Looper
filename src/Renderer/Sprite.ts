import { Position } from "./Position";

class Sprite{

    texture: string;
    pos: Position;
    scale: any;

	constructor(texture){
		this.texture = texture;
		this.pos = { x: 0, y: 0};
		this.scale = { x: 1, y: 1};
	}
}

export { Sprite };