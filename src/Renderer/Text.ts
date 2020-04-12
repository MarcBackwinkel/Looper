class Text {

pos = {};
text: string;
style: string;

	constructor(text: string = "", style = {}){
		this.pos = {x: 0, y: 0};
		this.text = text;
		this.style = style;
	}
}

//export default Text;