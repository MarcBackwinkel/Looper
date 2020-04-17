import { Position } from "./Position";

class Circle {

    radius: number;
    pos: Position;
    style: any;
    dead: boolean;

	constructor(radius, style = {}){
		this.radius = radius;
		this.pos = {x: 0, y: 0};
        this.style = style;
        this.dead = false;
    }
    
    public update(dt, t){

    }
}


class Arc {

    radius: number;
    arcLength: number;
    pos: Position;
    style: any;

	constructor(radius, arcLength, style = {}){
		this.radius = radius;
		this.arcLength = arcLength;
		this.pos = {x: 0, y: 0};
		this.style = style;
	}
}

export { Circle, Arc };