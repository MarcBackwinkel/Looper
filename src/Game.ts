import CanvasRenderer from "./Renderer/CanvasRenderer";
import { Container } from "./Container";

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

class Game {

    w: number;
    h: number;
    renderer: CanvasRenderer;
    background: Container;
    scene: Container;

	constructor(w: number, h: number, parent: string = "#board"){
		this.w = w;
		this.h = h;
		this.renderer = new CanvasRenderer(w, h);
		document.querySelector(parent).appendChild(this.renderer.view);
		this.background = new Container();
		this.scene = new Container();
	}
    
    public run(gameUpdate = (dt: number, t: number) => {}){
		let dt = 0;
		let last = 0;
		const loopy = ms => {
			requestAnimationFrame(loopy);
			const t = ms/1000;				//let's work in seconds
			dt = Math.min(t - last, MAX_FRAME);
			last = t;
			
			this.background.update(dt, t);
			this.scene.update(dt, t);
			gameUpdate(dt, t);

			this.renderer.render(this.background, true);
			this.renderer.render(this.scene, false);
		}
		requestAnimationFrame(loopy);
	}
}

export { Game };