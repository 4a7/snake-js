/*
//canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
//apariencia
var gane_mensaje="Ganador";
var perdida_mensaje="Perdedor";
var final_mensaje="";
var colors=['Red','Green','Blue','Chartreuse','DarkSlateBlue','DarkOrange','Yellow']
var ballRadius = 10;
var dx = 1;
var dy = -1;
var color=colors[getRandom(colors.length)];
//paleta
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
//control
var finalizar=false;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0,status:1 };
	}
}
//score
var score=0;
var lives=3;
function establecerValores(){
	x = canvas.width/2;
	y = canvas.height-30;
	ballRadius = 10;
	dx = 2;
	dy = -2;
	paddleHeight=10;
	paddleWidth=75;
	paddleX=(canvas.width-paddleWidth)/2;
	rightPressed = false;
	leftPressed = false;
	finalizar=false;
	score=0;
	lives=3;
	brickRowCount = 3;
	brickColumnCount = 5;
	brickWidth = 75;
	brickHeight = 20;
	brickPadding = 10;
	brickOffsetTop = 30;
	brickOffsetLeft = 30;
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0,status:1 };
		}
	}
	
}
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}
function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
		}
}
function incrementSpeed(){
	if(dx>0){
		dx++;
	}
	else{
		dx--;
	}
	if(dy>0){
		dy++;
	}
	else{
		dy--;
	}
}
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
function getRandom(max){
	return Math.floor(Math.random() * (max));
}
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}
function bounce(){
	var hit=false;
	if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
		dx=-dx;
		hit=true;
	}
	if(y+dy<ballRadius){
		dy=-dy;
		hit=true;
	}
	else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
			incrementSpeed();
		}
		else {
			lives--;
			if(!lives){
				finalizar=true;
				final_mensaje=perdida_mensaje;
				//alert("GAME OVER");
				//document.location.reload();
			}
			else{
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
			
		}
	}
	if(hit){
		color=colors[getRandom(colors.length)];
	}
}
function drawPaddle(){
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = colors[getRandom(colors.length)];
	ctx.fill();
	ctx.closePath();
}
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status==1){
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status=0;
					color=colors[getRandom(colors.length)];
					score++;
					if(score==(brickColumnCount*brickRowCount)){
						final_mensaje=gane_mensaje;
						finalizar=true;
						//alert("EOG");
						//document.location.reload();
					}
				}
			}
		}
	}
}
function drawBricks(){
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status==1){
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = colors[getRandom(color.length)];
				ctx.fill();
				ctx.closePath();
			}
			
		}
	}
}
function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawResult(mensaje){
	ctx.font = "50px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(mensaje, canvas.width/3.5, canvas.height/2);
}

function draw(){
	if(finalizar){
		drawResult(final_mensaje);
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	collisionDetection();
	drawBricks();
	drawScore();
	drawLives();
	x+=dx;
	y+=dy;
	bounce();
	requestAnimationFrame(draw);
	
}
function Reiniciar(){
	return function(){
		finalizar=false;
		establecerValores();
		draw();	
	}
	
}
//setInterval(draw,10);
btnReiniciar=document.getElementById("btn_reiniciar");
btnReiniciar.onclick=Reiniciar();
draw();
*/
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
//asterisco
var asteriscoPresente=false;
var lastAsterisco=Math.floor(date.getTime()/1000);
var xAsterisco=Math.floor(canvas.width/(snakeSize*2))*snakeSize;
var yAsterisco=Math.floor(canvas.height/(snakeSize*2))*snakeSize;
var indiceAgregacionComponentes=10;
//control del juego
var finalizar=false;
var presencia=[];
for(i=0;i<Math.floor(wWidth/15);i++){
	var data=[];
	for(j=0;j<Math.floor(wHeight/15);j++){
		data.push(false);
	}
	presencia.push(data);
}
//funciones
function setValores(){
	speed=200;
	dx = -1;
	dy = 0;
	snake=[[x,y,dx,dy],[x+(dx*snakeSize),y+(dy*snakeSize),dx,dy],[x+2*(dx*snakeSize),y+2*(dy*snakeSize),dx,dy],[x+3*(dx*snakeSize),y+3*(dy*snakeSize),dx,dy],[x+4*(dx*snakeSize),y+4*(dy*snakeSize),dx,dy]];
	snakeComps=5;
	colorSnake=colors[getRandom(colors.length)];
	colorScore=colors[getRandom(colors.length)];
	score=0;
	presencia=[];
	for(i=0;i<Math.floor(wWidth/15);i++){
		var data=[];
		for(j=0;j<Math.floor(wHeight/15);j++){
			data.push(false);
		}
		presencia.push(data);
	}
	
}
function keyDownHandler(e) {
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
	else if (e.keyCode==65){
		//draw();
		agregarComponentes();
	}
	bufferTeclado.unshift([dx,dy]);
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
	presencia[Math.floor(cx/snakeSize)][Math.floor(cy/snakeSize)]=true;
	snakeComps++;
	snake.push(ultimoCom);
}
//se encarga de hacer wrap en la pantalla
function setXY(){
	//snake[0][0]+=(dx*speed*snakeSize);
	//snake[0][1]+=(dy*speed*snakeSize);
	if(snake[0][0]<-1*snakeSize){
		snake[0][0]=canvas.width-1;
	}
	if(snake[0][1]<-1*snakeSize){
		snake[0][1]=canvas.height-1;
	}
	snake[0][0]=(snake[0][0]%canvas.width);
	snake[0][1]=(snake[0][1]%canvas.height);
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
				presencia[cx][cy]=false;
			}
			snake[i]=[snake[i-1][ix],snake[i-1][iy],snake[i-1][idx],snake[i-1][idy]];
		}
		else{
			var newx=snake[i][ix]+(snake[i][idx]*snakeSize);
			var newy=snake[i][iy]+(snake[i][idy]*snakeSize);
			var cx=Math.floor(newx/snakeSize);
			var cy=Math.floor(newy/snakeSize);
			if(presencia[cx][cy]==true){
				finalizar=true;
				clearInterval(intervalid);
				drawResult(perdida_mensaje);
			}
			checkAsterisco(newx,newy);
			snake[i]=[newx,newy,snake[i][idx],snake[i][idy]];//[snake[i][0]+(dx*snakeSize*speed),snake[i][1]+(dy*snakeSize*speed)]
			presencia[cx][cy]=true;
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
	if(Math.floor(date.getTime()/1000)-lastAsterisco>25 || !asteriscoPresente){
		xAsterisco=getRandom(Math.floor(canvas.width/snakeSize)-1)*snakeSize;
		yAsterisco=getRandom(Math.floor(canvas.height/snakeSize)-1)*snakeSize;
		console.log(getRandom(Math.floor(canvas.width/snakeSize)-1)*snakeSize);
		console.log(getRandom(Math.floor(canvas.height/snakeSize)-1)*snakeSize);
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
	setXY();
	//drawPaddle();
	//collisionDetection();
	//drawBricks();
	drawScore();
	drawAsterisco();
	//drawLives();
	
	//bounce();
	//requestAnimationFrame(draw);
	
}
var intervalid=setInterval(draw, speed);
function Reiniciar(){
	return function(){
		
		finalizar=false;
		setValores()
	}
	
}
btnReiniciar=document.getElementById("btn_reiniciar");
btnReiniciar.onclick=Reiniciar();