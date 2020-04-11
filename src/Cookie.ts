class Cookie {
	
	constructor(w, h, player1, player2 = {}){
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
		let x = w / 2;
		let y = h / 2;
		this.droppingInProgess = true;
		do {
			this.x = Math.random() * (this.w - 30) + 15;
			this.y = Math.random() * (this.h - 30) + 15;
		} while (this.player1.coordsXYAreWithinDistanceRange(this.x, this.y, 20) || this.player2.coordsXYAreWithinDistanceRange(this.x, this.y, 20));
		
		const blackHole = this.createBlackHole();
		const cookieRef = this.createCookie();
		
		const dropCookie = new Container();
		let animationSequence = 1;
		
		const cookieObjRef = this;
		
		const cookieIsInTheGame = function(){
			this.isInTheGame = true;
		}
		
		dropCookie.update = function(dt, t){
			if (animationSequence > 0){
				if (animationSequence <= 20){
					//doNothing
				} else if (animationSequence <= 24){
					blackHole.open();
					if (animationSequence === 24){
						cookieRef.resetTransparentBlock();
					}
				} else if (animationSequence <= 64){
					cookieRef.vanishBlock();
				} else if (animationSequence <= 68){
					blackHole.close();
				}
				animationSequence++;
			}
			if (animationSequence === 64){
				cookieObjRef.isInTheGame = true;
				cookieRef.deleteBlock();
			} else if (animationSequence > 68){
				this.remove(blackHole);
				animationSequence = 0;
				cookieObjRef.droppingInProgess = false;
			}
		}
		dropCookie.pos.x = this.x;
		dropCookie.pos.y = this.y;
		
		dropCookie.add(blackHole);
		dropCookie.add(cookieRef);
		
		this.delicious.add(dropCookie);
	}
	
	createBlackHole(){
		const blackHole = new Circle(0, {
			fill: "Black",
			stroke: "Black"
		});
		blackHole.open = function(){
			this.radius += 20;
		}
		blackHole.close = function(){
			this.radius -= 20;
			if (this.radius === 0){
				this.dead = true;
			}
		}
		return blackHole;
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