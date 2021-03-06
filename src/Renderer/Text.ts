import { Position } from "./Position";

class Text {

pos: Position;
text: string;
style: any;

	constructor(text: string = "", style = {}){
		this.pos = {x: 0, y: 0};
		this.text = text;
		this.style = style;
	}
}

export { Text };