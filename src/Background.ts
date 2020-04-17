import { Circle } from "./Renderer/Circle";
import { Container } from "./Container";

class Background{
    
    bkGround: Container;
    bkWidth: number = 0;
    bkHeight: number = 0;

    constructor(w: number, h: number){
        this.bkGround = new Container();
	    this.bkWidth = w;
        this.bkHeight = h;
    }

    public addRing(fillColor){
	    const ring = new Circle(0,{
		    fill: fillColor,
    		//stroke: "#fff"
	    	stroke: fillColor,
    	});
	    ring.pos.x = this.bkWidth / 2;
    	ring.pos.y = this.bkHeight / 2;
	    ring.dead = false;
    	ring.update = function(dt, t){
	    	ring.radius += dt * 100;
		    if (ring.radius > 900){
			    ring.dead = true;
    		}
	    }
	    this.bkGround.add(ring);
    }
}

export { Background };