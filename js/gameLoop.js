var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var tempo = 0;
var ativo = true;

canvas.width = 1920;
canvas.height = 1200;

document.body.appendChild(canvas);

//Cenário
var bgReady = false;
var bgImage = new Image ();
	bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "image/background.jpg";

//Jogador
var playerReady = false;
var playerImage = new Image ();
	playerImage.onload = function(){
	playerReady = true;
};
playerImage.src = "./image/player.png";
//Monster

//Jogador
var monsterReady = false;
var monsterImage = new Image ();
	monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "./image/monster.png";

//Configurações do jogo

	var player = {
		speed: 500
	};

	var monster = {};
	var monstersCaught = 0;

	var keysDown = {};
	addEventListener("keydown", function(e){
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function(e){
		delete keysDown[e.keyCode];
	}, false);

	var reset = function(){
		player.x = canvas.width / 2.5;
		player.y = canvas.height / 2.5;
	
		monster.x = 32 + (Math.random() * (canvas.width - 280));
		monster.y = 32 + (Math.random() * (canvas.height - 280));
	}

//Controles do Jogador


var update = function (modifier){
	if (ativo == true)
	{	
		if(37 in keysDown){
			player.x -= player.speed * modifier //esquerda
		}
		if(38 in keysDown){
			player.y -= player.speed * modifier //cima
		}
		if(39 in keysDown){
			player.x += player.speed * modifier //direita
		}
		if(40 in keysDown){
			player.y += player.speed * modifier //baixo
		}
	}
	//Colisão
	if(
	player.x <= (monster.x +250)
	&& monster.x <= (player.x +250)
	&& player.y <= (player.y+250)
	&& monster.y <= (player.y + 250)){
		++monstersCaught;
		reset();
		tempo = 0;
	}
};


var timer = function(){
	if (tempo >=6)
	{
		tempo = 0;
		monstersCaught = 0;
		reset();
		ativo = true;
	}
}

var ganhou = function(){
	
	ctx.fillText("GANHOU" , 800, 500);
}

//Desenhar na tela
var render = function(){
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (playerReady){
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if (monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	ctx.fillText("Monstros capturados: " + monstersCaught, 32, 32);
	ctx.fillText("Tempo: " + parseInt(tempo) , 800, 32);
	
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = "50px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	
};

var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	tempo = tempo + 0.009;
	
	update(delta / 1000);
	render();
	timer();
	
	if (monstersCaught >= 25)
	{
		ganhou();
		ativo = false;
	}
	
	then = now;
};

//Iniciar o jogo 
reset();
var then = Date.now();
setInterval(main, 1);