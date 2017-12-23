const isSubset=function(list1,list2){
  return list2.every(function(num){
    return list1.includes(num);
  });
}
//-------------------modle-----------------------------
const Player = function(name,symbol,color){
  this.name = name;
  this.symbol = symbol;
  this.moves = [];
  this.color = color;
}

const Game = function(){
  this.players = [];
  this.currentPlayerIndex = 0;
  let p1 = new Player("player1","X","red");
  let p2 = new Player("player2","O","darkblue");
  this.players.push(p1);
  this.players.push(p2);
}

Game.prototype.updateMove = function(position){
  let player = this.players[this.currentPlayerIndex];
  player.moves.push(position);
  this.currentPlayerIndex= 1 - this.currentPlayerIndex;
}


Game.prototype.hasPlayerWon = function(player){
  let winsets=[[1,2,3],[4,5,6],
              [7,8,9],[1,5,9],[3,5,7],
              [1,4,7],[2,5,8],[3,6,9]];
  let moves  = player.moves;
  return winsets.some(function(winset){
    return isSubset(moves,winset);
  });
}

Game.prototype.hasGameDrawn = function(){
  let p1Moves = this.players[0].moves;
  let p2Moves = this.players[1].moves;
  let totalMovesMade=p1Moves.concat(p2Moves);
  return totalMovesMade.length==9;
}

Game.prototype.showTurn = function(){
  let player = game.players[game.currentPlayerIndex];
  updateDisplay(player.name+"'s turn")
}

Game.prototype.isMoveAlreadyPresent = function(position){
  let p1Moves = this.players[0].moves;
  let p2Moves = this.players[1].moves;
  let totalMovesMade=p1Moves.concat(p2Moves);
  return totalMovesMade.includes(position);
}

Game.prototype.getPlayer = function(){
  return this.players[this.currentPlayerIndex];
}

//-------------------xx modle xx-----------------------------


let game = new Game();

//-------------------view-----------------------------
const updateDisplay = function(text){
  let display = document.getElementById("display");
  display.innerText = text;
}

const updateMoveOnDisplay = function(position,player){
  let spot = document.getElementById(position);
  let color =  player.color;
  spot.innerText = player.symbol;
  spot.style= `color:${color}`;
}

const showDraw = function(){
  updateDisplay("Game Drawn");
}

const stopGame = function(){
  let table = document.getElementById("table");
  table.onclick = null;
}

const startGame = function(){
  let table = document.getElementById('table');
  table.onclick=actionOnClick;
}

//-------------------xx view xx-----------------------------

//-------------------controller-----------------------------

const actionOnClick = function(){
  let position = getMove();
  if(game.isMoveAlreadyPresent(position)){
    return;
  }
  let player = game.getPlayer();
  game.updateMove(position);
  updateMoveOnDisplay(position,player);
  if(game.hasPlayerWon(player)){
    updateDisplay(player.name+' won');
    stopGame();
  } else if(game.hasGameDrawn()) {
    showDraw();
    stopGame();
  }else {
    game.showTurn();
  }
}

const getMove = function(){
  let cell= event.target.id;
  return +cell;
}
//-------------------xx controller xx--------------------------

const loadGame = function(){
  startGame();
  game.showTurn();
}

window.onload = loadGame;

// module.exports = Game;
