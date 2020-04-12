class position{
    x: Number;
    y: Number;

    constructor (x, y){
        this.x = x;
        this.y = y;
    }
}

class CanvasElement{
    pos: position;
    scale: Number;

}

export default {position, CanvasElement};