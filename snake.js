//key codes
var left=37;
var up=38;
var right=39;
var down=40;
var bufferTeclado=[];
//canvas
var snakeSizeReferencia=15;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var wHeight=(window.screen.availHeight);
var wWidth=(window.screen.availWidth);
wWidth=(Math.floor((wWidth*3/4)/15)*15);
wHeight=(Math.floor((wHeight*2/3)/15)*15);
canvas.width=wWidth;
canvas.height=wHeight;
var x = 4*snakeSizeReferencia;
var y = (4*snakeSizeReferencia);
var xReferencia=x;
var yReferencia=y;
//movimiento
var speed=200;
var dx = 1;
var dy = 0;
//apariencia
var gane_mensaje="Ganador";
var perdida_mensaje="Perdedor";
var final_mensaje="Fin del Juego";
var snakeSize=snakeSizeReferencia;		//tamano de los cuadritos de la culebra
var ix=0;
var iy=1;
var idx=2;
var idy=3;
var snake=[[x,y,dx,dy],[x+(dx*snakeSize),y+(dy*snakeSize),dx,dy],[x+2*(dx*snakeSize),y+2*(dy*snakeSize),dx,dy],[x+3*(dx*snakeSize),y+3*(dy*snakeSize),dx,dy],[x+4*(dx*snakeSize),y+4*(dy*snakeSize),dx,dy]];
var snakeComps=5;	//numero de cuadritos de la culebra
var colors=['Red','Green','Blue','RoyalBlue','Navy','Chartreuse','DarkSlateBlue','DarkOrange','Black','Tomato','Purple','Teal','SeaGreen','Salmon','Peru'];
var colorSnake=colors[getRandom(colors.length)];
var colorScore=colors[getRandom(colors.length)];
var colorAsterisco=colors[getRandom(colors.length)];
document.addEventListener("keydown", keyDownHandler, false);
//datos
var score=0;
var date = new Date();
var gameStart=Math.floor(date.getTime()/1000);
//asterisco
var asteriscoPresente=false;
var lastAsterisco=Math.floor(date.getTime()/1000);
var xAsterisco=Math.floor(canvas.width/(snakeSize*2))*snakeSize;
var yAsterisco=Math.floor(canvas.height/(snakeSize*2))*snakeSize;
var indiceAgregacionComponentes=10;
//control del juego
var finalizar=false;
var presencia=[];
for(i=0;i<=Math.floor(wHeight/snakeSize);i++){
	var data=[];
	for(j=0;j<=Math.floor(wWidth/snakeSize);j++){
		data.push(false);
	}
	presencia.push(data);
}
//funciones
function setValores(){
	speed=200;
	dx = 1;
	dy = 0;
	snake=[[x,y,dx,dy],[x+(dx*snakeSize),y+(dy*snakeSize),dx,dy],[x+2*(dx*snakeSize),y+2*(dy*snakeSize),dx,dy],[x+3*(dx*snakeSize),y+3*(dy*snakeSize),dx,dy],[x+4*(dx*snakeSize),y+4*(dy*snakeSize),dx,dy]];
	snakeComps=5;
	colorSnake=colors[getRandom(colors.length)];
	colorScore=colors[getRandom(colors.length)];
	score=0;
	presencia=[];
	for(i=0;i<=Math.floor(wHeight/15);i++){
		var data=[];
		for(j=0;j<=Math.floor(wWidth/15);j++){
			data.push(false);
		}
		presencia.push(data);
	}
	
}
function keyDownHandler(e) {
	if (e.keyCode==65){//a
		//draw();
		agregarComponentes();
	}
	else if (e.keyCode==83){//s
		incrementSpeed(10);
	}
	else if (e.keyCode==68){//d
		decrementSpeed(10);
	}
	else{
		if(e.keyCode == right) {
			dx=1;
			dy=0;
		}
		else if(e.keyCode == left) {
			dx=-1;
			dy=0;
		}
		else if(e.keyCode == up) {
			dy=-1;
			dx=0;
		}
		else if(e.keyCode == down) {
			dy=1;
			dx=0;
		}
		bufferTeclado.unshift([dx,dy]);
	}
}
function getRandom(max){
	return Math.floor(Math.random() * (max));
}
function drawResult(mensaje){
	ctx.font = "50px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(mensaje, canvas.width/2.5, canvas.height/2);
}
function agregarComponentes(){
	var ultimoCom=snake[snake.length-1];
	var cx=ultimoCom[ix];
	var cy=ultimoCom[iy];
	presencia[Math.floor(cy/snakeSize)][Math.floor(cx/snakeSize)]=true;
	snakeComps++;
	snake.push(ultimoCom);
}
//se encarga del wrap
function setXY(numx,numy){
	//snake[0][0]+=(dx*speed*snakeSize);
	//snake[0][1]+=(dy*speed*snakeSize);
	if(numx<snakeSize){
		numx=Math.floor(canvas.width/snakeSize)*snakeSize-snakeSize;
	}
	if(numy<snakeSize){
		numy=Math.floor(canvas.height/snakeSize)*snakeSize-snakeSize;
	}
	numx=(numx%canvas.width);
	numy=(numy%canvas.height);
	return [numx,numy];
}
function incrementSpeed(s){
	if(speed-s>1){
		speed-=s;
	}
	clearInterval(intervalid);
	intervalid=setInterval(draw,speed);
}
function decrementSpeed(s){
	speed+=s
	clearInterval(intervalid);
	intervalid=setInterval(draw,speed);
}
//se encarga de cambiar las direcciones y controlar el buffer del teclado
function controlTeclado(){
	if(bufferTeclado.length==0){
		return;
	}
	else{
		var dirs=bufferTeclado.pop();
		snake[0][idx]=dirs[0];
		snake[0][idy]=dirs[1];
	}
}
function checkAsterisco(xcheck,ycheck){
	if(xAsterisco==xcheck && yAsterisco==ycheck){
		asteriscoPresente=false;
		score++;
		incrementSpeed(5);
		agregarComponentes();
	}
}
//se encarga de dibujar la serpiente
function drawSnake(){
	ctx.beginPath();
	for(i=snake.length-1;i>=0;i--){
		ctx.rect(snake[i][ix],snake[i][iy],snakeSize,snakeSize);
		if(i!=0){
			if(i==snake.length-1){
				var cx=Math.floor(snake[i][ix]/snakeSize);
				var cy=Math.floor(snake[i][iy]/snakeSize);
				presencia[cy][cx]=false;
			}
			snake[i]=[snake[i-1][ix],snake[i-1][iy],snake[i-1][idx],snake[i-1][idy]];
		}
		else{
			var newx=snake[i][ix]+(snake[i][idx]*snakeSize);
			var newy=snake[i][iy]+(snake[i][idy]*snakeSize);
			nuevo=setXY(newx,newy);
			var cx=Math.floor(nuevo[0]/snakeSize);
			var cy=Math.floor(nuevo[1]/snakeSize);
			if(presencia[cy][cx]==true){
				finalizar=true;
				clearInterval(intervalid);
				drawResult(perdida_mensaje);
			}
			checkAsterisco(nuevo[0],nuevo[1]);
			snake[i]=[nuevo[0],nuevo[1],snake[i][idx],snake[i][idy]];//[snake[i][0]+(dx*snakeSize*speed),snake[i][1]+(dy*snakeSize*speed)]
			presencia[cy][cx]=true;
		}
		
		
	}
	ctx.fillStyle = colorSnake;
	ctx.fill();
	ctx.closePath();
	//snake.unshift([snake[0][ix]+(snake[0][idx]*snakeSize),snake[0][iy]+(snake[0][idy]*snakeSize),snake[0][idx],snake[0][idy]]);//[snake[0][0]+(dx*snakeSize),snake[0][1]+(dy*snakeSize)]
	//snake=snake.slice(0,snakeComps);
}
function drawScore(){
	ctx.font = "18px Verdana";
	ctx.fillStyle = colorScore;
	ctx.fillText("Score: "+score, 8, 20);
}
function drawAsterisco(){
	ctx.beginPath();
	date=new Date();
	if(Math.floor(date.getTime()/1000)-lastAsterisco>30 || !asteriscoPresente){
		xAsterisco=getRandom(Math.floor(canvas.width/snakeSize)-1)*snakeSize;
		yAsterisco=getRandom(Math.floor(canvas.height/snakeSize)-1)*snakeSize;
		colorAsterisco = colors[getRandom(colors.length)];
		ctx.fillStyle = colorAsterisco;
		lastAsterisco=Math.floor(date.getTime()/1000);
		asteriscoPresente=true;
	}
	else{
		asteriscoPresente=true;
		ctx.fillStyle = colorAsterisco;
	}
	ctx.rect(xAsterisco,yAsterisco,snakeSize,snakeSize);
	ctx.fill();
	ctx.closePath();
}
function draw(){
	if(finalizar){
		drawResult(final_mensaje);
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	controlTeclado();
	drawSnake();
	drawScore();
	drawAsterisco();
}
var intervalid=setInterval(draw, speed);
function Reiniciar(){
	return function(){
		/*
		finalizar=true;
		clearInterval(intervalid);
		setValores();
		finalizar=false;
		intervalid=setInterval(draw,speed);
		*/
		document.location.reload();
	}	
}
btnReiniciar=document.getElementById("btn_reiniciar");
btnReiniciar.onclick=Reiniciar();