import { Position } from './Renderer/Position';

class Container {

    pos: Position;
    children: Container[];
    counter: number;
    dead: boolean;
    t0: number;

	constructor(){
		this.pos = new Position(0, 0);
		this.children = [];
        this.counter = 0;
        this.dead = false;
    }
    
    setStartTime(t: number){
        this.t0 = t;
    }

	//Container methods
	add (child: Container){
		this.children.push(child);
		return child;
	}
	remove (child: Container){
		this.children = this.children.filter(c => c !== child);
		return child;
	}
	removeAll(){
		this.children = [];
	}
	update(dt: number, t: number){
		this.children = this.children.filter(child => {
			if (child.update){
				child.update(dt, t);
			}
			return child.dead ? false : true;
		});
	}
	map(f){
		return this.children.map(f);
	}
}

export { Container };