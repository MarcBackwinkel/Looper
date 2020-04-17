import Position from './Renderer/Position';
import { CanvasElement } from './Renderer/CanvasElement';

class Container {

    pos: Position;
    children[]: CanvasElement;
    counter: number;

	constructor(){
		this.pos = new Position(0, 0);
		this.children = [];
		this.counter = 0;
	}
	//Container methods
	add (child){
		this.children.push(child);
		return child;
	}
	remove (child){
		this.children = this.children.filter(c => c !== child);
		return child;
	}
	removeAll(){
		this.children = [];
	}
	update(dt, t){
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