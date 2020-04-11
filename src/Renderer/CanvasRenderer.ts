class CanvasRenderer {
	constructor(w, h){
		const canvas = document.createElement("canvas");
		this.w = canvas.width = w;
		this.h = canvas.height = h;
		this.view = canvas;
		this.ctx = canvas.getContext("2d");						//with the canvas element in hand we ask for the drawing content called "2d"
		this.ctx.textBaseline = "top";							//default: bottom, where text at message.pos.y === 0 is not drawn
	}
	render(container, clear = true){
		const { ctx } = this;
		function renderRec(container){
			//Render the container children
			container.children.forEach(child => {
				if (child.visible == false){
					return;										//do not continue if child is set to not visible
				}
				ctx.save();
				//Draw the leaf node
				if (child.pos){
					ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
					ctx.rotate(child.angle * Math.PI / 180	);
				} 
				if (child.text){
					const { font, fill, align } = child.style;
					if (font) ctx.font = font;
					if (fill) ctx.fillStyle = fill;
					if (align) ctx.textAlign = align;
					ctx.fillText(child.text, 0, 0);
				} 
				if (child.scale){
					ctx.scale(child.scale.x, child.scale.y);
				}
				if (child.texture){
					ctx.drawImage(child.texture.img, child.pos.x, child.pos.y);
				} 
				if (child.width){
					const { fill, stroke, globalAlpha } = child.style;
					if (globalAlpha){
						ctx.globalAlpha = globalAlpha;
					}
					if (fill) {
						ctx.fillStyle = fill;
						ctx.fillRect(child.pos.x, child.pos.y, child.width, child.height);
					}
					if (stroke){
						ctx.strokeStyle = stroke;
						ctx.strokeRect(child.pos.x, child.pos.y, child.width, child.height);
					} 
				}
				if (child.radius){
					const { fill, stroke, globalAlpha } = child.style;
					if (fill) ctx.fillStyle = fill;
					if (stroke) ctx.strokeStyle = stroke;
					if (globalAlpha) ctx.globalAlpha = globalAlpha;
					ctx.beginPath();

					if (child.arcLength){
						debugger;
						ctx.arc(0, 0, child.radius, 0, child.arcLength, false);
					} else {
						if (child.radius < 0){
							debugger;
						}
						ctx.arc(0, 0, child.radius, 0, Math.PI * 2, false);
					}
					ctx.fill();
					ctx.stroke();
				}
				//Handle the child types
				if (child.children){
					renderRec(child);
				}
				ctx.restore();
			});
		}
		if (clear){												//flag "clear" steers if screen shall be cleared --> for debugging purposes
			ctx.clearRect(0, 0, this.w, this.h);				//clear screen
		}
		renderRec(container);									//renderRec --> render recursive
	}
}

//export default CanvasRenderer;
