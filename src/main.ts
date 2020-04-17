import { Background } from "./Background";
import { Container } from "./Container";
import { Cookie } from "./Cookie";
import { Game } from './Game';
import { KeyControls } from "./KeyControls";
import { Player } from "./Player";



const game = new Game(800, 480);
const {background, scene, w, h} = game;
//const head = new Sprite(new Texture("res/Images/head.png"));
//const openEye = new Sprite(new Texture("res/Images/openEye.png"));
//const blinkEye = new Sprite(new Texture("res/Images/blinkEye.png"));
//const body = new Sprite(new Texture("res/Images/body.png"));

const textContent = new Container();
scene.add(textContent);


const bkGround = new Background(w, h);
background.add(bkGround);

const player: number = 2;
const keys = new KeyControls();
const player1 = new Player({x: 1, y: 0}, {x: 80, y: 240}, "Lightblue", "Blue");
const player2 = new Player({x: -1, y: 0}, {x: 720, y: 240}, "Lightgreen", "Green");
const cookie = new Cookie(w, h, player1, player2);

scene.add(cookie.delicious);

scene.add(player1.bodyParts);
scene.add(player1.head);

if (player === 2){
	scene.add(player2.bodyParts);
	scene.add(player2.head);
}

let gameOver = false;

/*
const player = {
	direction: {x: 1, y: 0},
	pos: {x: 2*squareSize, y: 2*squareSize},
	headAngle: 0,
	head: new Container(),
	actAngle: 45,
	snakeLength: gameLogic.snakeLength
}*/

let last = 0;
let lastHole = 0;
let lastBodyElement = 0;

function addText(x, y, content){
	const text = new Text(content);
	text.pos.x = x;
	text.pos.y = y;
	textContent.add(text);
}

function doGameOver(text){
	const shadeRect = new Square(w, h, {
		fill: "White",
		stroke: "Black",
		globalAlpha: 0.4
	});
	scene.add(shadeRect);
	const gameOverMessage = new Text("Game Over", {
		font: "30pt sans-serif",
//		fill: "#8B8994",
		fill: "Black",
		align: "center"
	});
	gameOverMessage.pos.x = w/2;
	gameOverMessage.pos.y = h/2 - 20;
	const gameOverMessage2 = new Text(text, {
		font: "30pt sans-serif",
//		fill: "#8B8994",
		fill: "Black",
		align: "center"
	});
	gameOverMessage2.pos.x = w/2;
	gameOverMessage2.pos.y = h/2 + 20;
	scene.add(gameOverMessage);
	scene.add(gameOverMessage2);
	gameOver = true;
}

const timePerSquareInSeconds = 2;
/*const timeStep = 0.02;*/
let ringColorIndex = 0;
const ringColors = ["lightgreen", "lightblue", "violet", "red", "orange", "yellow"];
let speed = 1;
let sideBank = 0;
const collisionDistance = 20;
let playerAteCookie;

function updateBody(dt, t){	
	//Body-Elemente darstellen
	
	//console.log(`x1: ${keys.x1}, y1: ${keys.y1}, x2: ${keys.x2}, y2: ${keys.y2}`)
	
	if (!player1.gameOver && !player2.gameOver){
		
		//Drop Cookie if none exists, start delay is 6 seconds
		if (!cookie.isInTheGame && !cookie.droppingInProgess && (t > 6)){
			cookie.drop();
			lastHole = t;
		}
		
		player1.getControls(keys.x2, keys.y2);
		
		if (player === 2){
			player2.getControls(keys.x1, keys.y1);
		}
		
		player1.updatePos(dt);
	
		if (player === 2){
			player2.updatePos(dt);
		}
	
		player1.moveHead();

		if (player === 2){
			player2.moveHead();
		}
		
		if (player === 1){
			if (player1.checkForCollisionAgainst(player1.bodyParts, 5) || player1.isOutOfBounds()){
				player1.gameOver = true;
			}
			if (player1.gameOver){
				doGameOver("Nice Game!");
			}
		} else {
			if (player1.checkForCollisionAgainst(player1.bodyParts, 5) || player1.checkForCollisionAgainst(player2.bodyParts, 1) || player1.isOutOfBounds()){
				player1.gameOver = true;
			}
			if (player2.checkForCollisionAgainst(player1.bodyParts, 1) || player2.checkForCollisionAgainst(player2.bodyParts, 5) || player2.isOutOfBounds()){
				player2.gameOver = true;
			}
			console.log(`$Ply1: ${player1.gameOver}, Ply2: ${player2.gameOver}`);
			if ((player1.gameOver === true) && (player2.gameOver === false)){
				doGameOver("Player 2 won! Congratulations!");
			} else if ((player1.gameOver === false) && (player2.gameOver === true)){
				doGameOver("Player 1 won! Good job!");
			} else if ((player1.gameOver === true) && (player2.gameOver === true)){
				doGameOver("Draw!");
			}
		}
		
		playerAteCookie = cookie.eaten();
		if (playerAteCookie !== undefined){
			playerAteCookie.snakeLength += 10;
			cookie.isInTheGame = false;
		};
		
	}
	//neuen Ring im Hintergrund hinzufuegen
	if ((t - last) > 1){
		last = t;
		addRing(ringColors[ringColorIndex++]);
		//Farbe des naechsten Rings festlegen
		if (ringColorIndex >= ringColors.length){
			ringColorIndex = 0;
		}
	}
}
game.run(updateBody);