import { Container } from "./Container";
import { Player } from "./Player";
import { Circle } from "./Renderer/Circle";
import { Square } from "./Renderer/Square";
import { Sprite } from "./Renderer/Sprite";
import { Texture } from "./Renderer/Texture";

class Cookie {
    
    isInTheGame: boolean;
    droppingInProgress: boolean;
    delicious: Container;
    w: number;
    h: number;
    player1: Player;
    player2: Player;

    //#unsicher bei Default-Wert fuer Player2
    //alt: constructor(w: number, h: number, player1: Player, player2: Player = {}}){
	constructor(w: number, h: number, player1: Player, player2: Player = null){
		this.isInTheGame = false;
		this.droppingInProgress = false;
//		this.animationSequence = 0;
		this.delicious = new Container();
		this.w = w;
		this.h = h;
		this.player1 = player1;
		this.player2 = player2;
	}
	
	drop(){
		let x = this.w / 2;
		let y = this.h / 2;
		this.droppingInProgress = true;
		do {
			x = Math.random() * (this.w - 30) + 15;
			y = Math.random() * (this.h - 30) + 15;
		} while (this.player1.coordsXYAreWithinDistanceRange(x, y, 20) || this.player2.coordsXYAreWithinDistanceRange(x, y, 20));
		
		const blackHole = new Circle(0, {
			fill: "Black",
			stroke: "Black"
        });
        const cookieRef = this.createCookie();
        const transpBlock = this.createTranspBlock();
		
		const dropCookie = new Container();
		let animationSequence: number = 1;
		
		const cookieObjRef = this;
		
		const cookieIsInTheGame = () => {
			this.isInTheGame = true;
		};
        
        //Ueberschreiben der Update-Funktion des Containers
		dropCookie.update = function(dt: number, t: number){
			if (animationSequence > 0){
				if (animationSequence <= 20){
					//doNothing
				} else if (animationSequence <= 24){
					blackHole.radius += 20;
					if (animationSequence === 24){
						const cookiePic = new Sprite(new Texture("res/Images/cookie.png"));
		                cookiePic.scale = {x: 0.5, y: 0.5};
		                cookiePic.pos.x = cookiePic.pos.y = -15;
					}
				} else if (animationSequence <= 64){
					cookieRef.vanishBlock();
				} else if (animationSequence <= 68){
					blackHole.radius -= 20;
			        if (blackHole.radius === 0){
				        blackHole.dead = true;
			        }
				}
				animationSequence++;
			}
			if (animationSequence === 64){
				cookieObjRef.isInTheGame = true;
				cookieRef.deleteBlock();
			} else if (animationSequence > 68){
				this.remove(blackHole);
				animationSequence = 0;
				cookieObjRef.droppingInProgress = false;
			}
		}
		dropCookie.pos.x = this.x;
		dropCookie.pos.y = this.y;
		
		dropCookie.add(blackHole);
		dropCookie.add(cookieRef);
		
		this.delicious.add(dropCookie);
	}
	
	createCookie(){
		const fullCookie = new Container();
		const cookiePic = new Sprite(new Texture("res/Images/cookie.png"));
		cookiePic.scale = {x: 0.5, y: 0.5};
		cookiePic.pos.x = cookiePic.pos.y = -15;
		
		const transparentBlock = new Square(60, 60, {
			fill: "Black",
			stroke: "Black",
			globalAlpha: 1
		});
		transparentBlock.pos.x = transparentBlock.pos.y = -15;
		
		fullCookie.resetTransparentBlock = function(){
			//transparentBlock.style.globalAlpha = 1;
			this.add(cookiePic);
			this.add(transparentBlock);
		}
		fullCookie.vanishBlock = function(){
			transparentBlock.style.globalAlpha -= 0.025;
		}
		fullCookie.deleteBlock = function(){
			this.remove(transparentBlock);
		}
		
		return fullCookie;
    }
    
    createTranspBlock(){
        const transparentBlock = new Square(60, 60, {
			fill: "Black",
			stroke: "Black",
			globalAlpha: 1
		});
		transparentBlock.pos.x = transparentBlock.pos.y = -15;
		
		transparentBlock.resetTransparentBlock = function(){
			//transparentBlock.style.globalAlpha = 1;
			this.add(cookiePic);
			this.add(transparentBlock);
		}
		transparentBlock.vanishBlock = function(){
			transparentBlock.style.globalAlpha -= 0.025;
		}
		transparentBlock.deleteBlock = function(){
			this.remove(transparentBlock);
		}
    }
	
	eaten(){
		const distPly1Head = getDistance(this.x, this.y, this.player1.pos.x, this.player1.pos.y);
		const distPly2Head = getDistance(this.x, this.y, this.player2.pos.x, this.player2.pos.y);
		
		if (((distPly1Head < 15) || (distPly2Head < 15)) && this.isInTheGame){
			this.delicious.removeAll();
			if (distPly1Head < distPly2Head){
				return this.player1;
			} else {
				return this.player2;
			}
		}
		
		return undefined;
	}
}

export { Cookie };