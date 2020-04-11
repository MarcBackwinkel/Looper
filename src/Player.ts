function getAngle(dirX, dirY, headAngle){
	if (dirX === -1){
		return 0 - headAngle;
	} else if (dirY === -1){
		return 90 + headAngle;
	} else if (dirX === 1){
		return 180 + headAngle;
	} else if (dirY === 1){
		return 270 - headAngle;
	}
}

function getDistance(x1, y1, x2, y2){
	const dx = x1 - x2;
	const dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
}

class Player {
	constructor(dir = {}, position = {}, fillColor, strokeColor){
		this.direction = dir;
		this.pos = position;
		this.headAngle = 0;
		this.head = new Container();
		this.actAngle = 45;
		this.snakeLength = 40;
		this.fillColor = fillColor;
		this.strokeColor = strokeColor;
		this.angleEachStep = gameLogic.angleEachStep;
		this.speed = 1;
		this.bodyParts = new Container();
		this.head = new Container();
		this.lastBody = {x: 0, y: 0};
		this.defineHead();
		this.gameOver = false;
	}
	
	defineHead(){
		const shape = new Circle(Math.floor(squareSize / 2) - Math.abs(gameLogic.deviationEachStep), {
			fill: this.strokeColor,
			stroke: this.strokeColor
		});
		
		const leftEye = new Circle(Math.round(squareSize / 20), {
			fill: "black",
			stroke: "black"
		});
		leftEye.pos.x = 0;
		leftEye.pos.y = -1 * Math.round(squareSize / 10);
		
		const rightEye = new Circle(Math.round(squareSize / 20), {
			fill: "black",
			stroke: "black"
		});
		rightEye.pos.x = 0;
		rightEye.pos.y = 1 * Math.round(squareSize / 10);

		const nose = new Circle(Math.round(squareSize / 10), {
			fill: "red",
			stroke: "red"
		});
		nose.pos.x = -2 * Math.round(squareSize / 10);
		nose.pos.y = 0;
	
		this.head.add(shape);
		this.head.add(leftEye);
		this.head.add(rightEye);
		this.head.add(nose);
	}
	
	moveHead(){
		this.head.pos.x = this.pos.x;
		this.head.pos.y = this.pos.y;
		this.head.angle = getAngle(this.direction.x, this.direction.y, this.actAngle);
		
		if (getDistance(this.head.pos.x, this.head.pos.y, this.lastBody.x, this.lastBody.y) > (15-1.5*this.speed)){
			this.addBodyElement(this.head.pos.x, this.head.pos.y);
		}
	}

	addBodyElement(x, y){
//		const body = new Circle(Math.floor(squareSize / 2) - 1.5 * Math.abs(gameLogic.deviationEachStep), {
		const body = new Circle(Math.round(12-1.5*this.speed), {
			fill: this.fillColor,
			stroke: this.strokeColor
		});
		body.pos.x = this.lastBody.x = x;
		body.pos.y = this.lastBody.y = y;
		body.index = 0;
		body.visible = true;
		body.dead = false;
		/*body.update = function(dt, t){
			body.index++;
			if (body.index > (2 * gameLogic.snakeLength)){
				body.dead = true;
			}
		}*/
		this.bodyParts.add(body);
		this.bodyParts.children.forEach(bodyPart => {
			bodyPart.index++;
			if (bodyPart.index > (this.snakeLength)){
				bodyPart.dead = true;
			}
		});	
	}
	
	getControls(inputX, inputY){
		//console.log(`${inputX}, ${inputY}`);
		//wenn der Spieler sich in x-Richtung bewegt, werden nur y-Eingaben angenommen
		if ((this.direction.x !== 0) && (inputY !== 0)){
			this.direction.y = inputY;
			if (this.direction.x === 1){
				this.actAngle = 45;
				this.angleEachStep = 5;
			} else {
				this.actAngle = -45;
				this.angleEachStep = -5;
			}
			//console.log(`x: ${player.direction.x}, y: ${player.direction.y}, angle: ${player.actAngle}`);
			this.direction.x = 0;
			this.speed = 1;
		}
		//wenn der Spieler sich in y-Richtung bewegt, werden nur x-Eingaben angenommen
		if ((this.direction.y !== 0) && (inputX !== 0)){
			this.direction.x = inputX;
			if (this.direction.y === 1){
				this.actAngle = 45;
				this.angleEachStep = 5;
			} else {
				this.actAngle = -45;
				this.angleEachStep = -5;
			}
			this.direction.y = 0;
			this.speed = 1;
		}	
		
		//Tastatureingaben in Laengsrichtung beschleunigen Wurm
		if (((this.direction.x === inputX) && (this.direction.y === 0)) || ((this.direction.y === inputY) && (this.direction.x === 0))){
			this.speed *= 1.03;
			if (this.speed > 4){
				this.speed = 4;
			}
		} else {
			this.speed /= 1.06;
			if (this.speed < 1){
				this.speed = 1;
			}
		}
	}
	
	updatePos(dt){
		//Bewegung in Vorwaerts- und Seitwaertsrichtung festlegen
		const forwardSpeed = 0.8 * squareSize * timePerSquareInSeconds * this.speed * dt;
		const sideBank = squareSize * timePerSquareInSeconds * dt * Math.tan(2 * Math.PI * this.actAngle / 360);
		//x- und y-Koordinate des naechsten Spielerelements setzen
		if (this.direction.x === 1){
			this.pos.x += forwardSpeed;
			this.pos.y += sideBank;
		} else if (this.direction.x === -1){
			this.pos.x -= forwardSpeed;
			this.pos.y += sideBank;
		} else if (this.direction.y === 1){
			this.pos.x += sideBank;
			this.pos.y += forwardSpeed;
		} else if (this.direction.y === -1){
			this.pos.x += sideBank;
			this.pos.y -= forwardSpeed;
		}
		
		//Wechsel von oberer in untere Sinus-Schleife und anderherum
		if (Math.abs(this.actAngle) === 45){
			this.angleEachStep *= (-1);
		} 
		this.actAngle += this.angleEachStep;
	}
	
	checkForCollisionAgainst(snake, startPos){
		let gameOver = false;
		snake.children.forEach(bodyPart => {
			//wenn der Abstand zu klein ist; die aktuellsten fuenf Body-Elemente werden ausgeschlossen, da sie zu nah am Kopf sind
			//console.log(`x: ${bodyPart.pos.x}, y: ${bodyPart.pos.y}, index: ${bodyPart.index}, Distance: ${Math.sqrt(dx * dx + dy * dy)}`);
			if ((getDistance(bodyPart.pos.x, bodyPart.pos.y, this.head.pos.x, this.head.pos.y) < collisionDistance) && (bodyPart.index > startPos)){
				gameOver = true;
			}
		});
		return gameOver;
	}
	
	coordsXYAreWithinDistanceRange(x, y, distance){
		let withinDistance = false;
		this.bodyParts.children.forEach(bodyPart => {
			//wenn der Abstand zu klein ist; die aktuellsten fuenf Body-Elemente werden ausgeschlossen, da sie zu nah am Kopf sind
			//console.log(`x: ${bodyPart.pos.x}, y: ${bodyPart.pos.y}, index: ${bodyPart.index}, Distance: ${Math.sqrt(dx * dx + dy * dy)}`);
			if ((getDistance(bodyPart.pos.x, bodyPart.pos.y, x, y) < distance)){
				withinDistance = true;
			}
		});
		if (getDistance(this.head.pos.x, this.head.pos.y, x, y) < distance*2){
			withinDistance = true;
		}
		return withinDistance;
	}
	
	isOutOfBounds(){
		const tolerance = -5;
		return ((this.pos.x + tolerance < 0) || (this.pos.x - tolerance > w) || (this.pos.y + tolerance < 0) || (this.pos.y - tolerance > h));
	}
}