import Container from "./Container";

class Mesh{

    mesh: Container;

    constructor(){
        this.mesh = new Container();
    }

    public initMesh(w, h){
	    /*for (let i=10; i < w; i+=squareSize/2){
		    for (let j=10; j < h; j+=squareSize/2){
			    const rect = new Square(squareSize, squareSize, {
			    	stroke: "Lightgrey"
    			});
	    		rect.pos.x = i;
		    	rect.pos.y = j;
			    mesh.add(rect);
    		}
	    }*/
    	const rect = new Square(w, h, {
	    	stroke: "Black"
	    });
    	rect.pos.x = 0;
	    rect.pos.y = 0;
	    this.mesh.add(rect);
    }
}

export { Mesh };