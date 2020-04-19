import { Position } from "./Position";
import { Updatable } from "./Updatable"

class Circle implements Updatable{

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
    
    public update(dt: number, t: number):void {
        //Per Default do Nothing
    }
}


class Arc extends Container implements Updatable{

    radius: number;
    arcLength: number;
    pos: Position;
    style: any;

	constructor(radius, arcLength, style = {}){
        super();
		this.radius = radius;
		this.arcLength = arcLength;
		this.pos = {x: 0, y: 0};
		this.style = style;
    }
    
    public update(dt: number, t: number):void {
        //Per Default do Nothing
    }
}

export { Circle, Arc };