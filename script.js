"use strict";
let dealerSide,playerSide,startGame,betAmount,body,gameBoard,startMenu,header,main,footer,player;
let message = "WELCOME TO BLACK JACK";
let storage = window.localStorage;
storage.clear();
console.table(storage);

let card = {
  colors: ["♠", "♥", "♦", "♣"],
  numbers: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Kn", "Q", "K", "E",],
  value: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
}

let dealer = {
  number: [],
}

function startUp(){
  body = document.querySelector("body");
  body.innerHTML = '<div id="game-board"></div>';
  body.innerHTML += '<div id="game-menu"></div>';
  gameBoard = document.querySelector("#game-board");
  startMenu = document.querySelector("#game-menu");
  startMenu.class = "absolute";
  gameBoard.innerHTML = '<header></header>';
  gameBoard.innerHTML += '<main></main>';
  gameBoard.innerHTML += '<footer class="flex-center"></footer>';
  header = document.querySelector("header");
  main = document.querySelector("main");
  footer = document.querySelector("footer");
}

function login(){
  shadowBoard();
  let menuPage = '<div class="menu"><span class="font-size-4vmin">WELCOME TO BLACK JACK <br> <br>'; 
  menuPage += 'LOGIN <br></span><form login-form><label class="font-size-4vmin">';
  menuPage += '<input class="text-align bet-amount-text-box" placeholder="Username" type="name" maxlength="12" required username><br>';
  menuPage += '<button>LOGIN</button></form></div>';
  startMenu.innerHTML += menuPage;
  let loginForm = document.querySelector("[login-form]");
  let username = document.querySelector("[username]");
  loginForm.addEventListener("submit", (e) => {
    let usedName = false;
    Object.keys(storage).forEach(obj => {
      let parsedObj = JSON.parse(storage[obj]);
      if(parsedObj.name == username.value){
        usedName = true;
        establishUser(parsedObj.name, parsedObj.money);
      }
    })
    if(usedName == false){
      let user = "user" + (storage.length+1);
      storage.setItem(user, JSON.stringify({name: username.value, money: "1000"}));
      establishUser(username.value, 1000);
    }
    gameMenu();
  })
}

function establishUser(playerName, playerMoney){
  player = {
    name: playerName,
    number: [],
    money: playerMoney,
  }
}

function gameMenu(){
  shadowBoard();
  let menuPage = '<div class="menu"><span class="font-size-4vmin">' + message +  '<br> <br>'; 
  menuPage += 'YOU HAVE $' + player.money + '<br> <br></span><form start-game-bet><label class="font-size-4vmin">';
  menuPage += 'ENTER BET AMOUNT:<br></label><input class="text-align bet-amount-text-box" type="number" required bet-amount><br>';
  menuPage += '<button>START</button></form></div>';
  startMenu.innerHTML = menuPage;
  startGame = document.querySelector("[start-game-bet]");
  betAmount = document.querySelector("[bet-amount]");
  startGame.addEventListener("submit", (e) => {
    if(parseInt(betAmount.value) <= player.money && parseInt(betAmount.value) > 0)
    {
      player.money -= parseInt(betAmount.value);
      Object.keys(storage).forEach(obj => {
        let parsedObj = JSON.parse(storage[obj]);
        if(parsedObj.name == player.name){
          storage[obj] = JSON.stringify({name: player.name, money: player.money});
        }
      })
      gameStart();
    }
    else{
      return;
    }
  })
}

function gameStart(){
  resetScore();
  gameBoard.style.opacity = "1";
  startMenu.innerHTML = "";
  main.innerHTML = '<div id="dealer-side" class="flex-center"></div>'
  main.innerHTML += '<div id="line"></div>'
  main.innerHTML += '<div id="player-side" class="flex-center"></div>'
  dealerSide = document.querySelector("#dealer-side");
  playerSide = document.querySelector("#player-side");
  dealerSide.innerHTML += createCard(createNumber(dealer.number[0]));
  dealerSide.innerHTML += '<div id="hidden-card" class="card hidden"></div>';
  playerSide.innerHTML += createCard(createNumber(player.number[0]));
  playerSide.innerHTML += createCard(createNumber(player.number[1]));
  footer.innerHTML += '<input id="hit-button" type="button" value="hit" onclick="hit();" />';
  footer.innerHTML += '<input id="stand-button" type="button" value="stand" onclick="stand();" />';
  checkWin(player.score);
}

function gameEnd(){
  gameMenu();
}

function shadowBoard(){
  body.style.background += "black";
  gameBoard.style.opacity = "0.25";
}

function createCard(cardNumber) {
  if (cardNumber == undefined) {
    cardNumber = createNumber();
  }
  return (
    '<div class="card shown"><span class="card-num-top">' +
    cardNumber +
    '</span><span class="card-num-bot">' +
    cardNumber +
    "</span></div>"
  );
}

function createNumber(number) {
  let cardNumber = card.numbers[number];
  cardNumber += card.colors[rng("Color")];
  return cardNumber;
}

function resetScore(){
  player.number = [rng(), rng()];
  dealer.number = [rng(), rng()];
  dealer.score = [card.value[dealer.number[0]], card.value[dealer.number[1]]];
  player.score = [card.value[player.number[0]], card.value[player.number[1]]];
}

function rng(max) {
  if (max == undefined) {
    max = card.numbers.length;
  } else if (max == "Color") {
    max = 4;
  }
  return Math.floor(Math.random() * Math.floor(max));
}

function totalScore(user) {
  let total = 0;
  user.forEach((value) => {
    total += value; 
  })
  return total;
}
function checkOver21(user){
    if(totalScore(user) > 21){
        for(let x = 0; x < user.length; x++) {
            if(user[x] == 11){
                user[x] = 1;
                break;
            }
        }
    }
    if(totalScore(user) > 21){
      message = "BUSTED";
      console.log("BUSTED");
      if(user == dealer.score){
        balanceChange("won");
      }
      gameEnd();
    }
    return user;
}

function checkBlackJack(user){
  console.log(user);
  if(totalScore(user) == 21){
    message = "BLACKJACK";
    console.log("blackjack")
    if(user == player.score){
      console.log("bwack jawck won playert won lol")
      balanceChange("won");
    }
    gameEnd();
  }
}

function checkWin(userScore) {
    userScore = checkOver21(userScore);
    checkBlackJack(userScore);
}

function checkSoft17(){
  console.log("check soft")
  for(let x = 0; x < dealer.score.length; x++) {
    if(dealer.score[x] == 11){
      return true;
    }
  }
  return false;
}

function balanceChange(playerResult){
  let betAmountInt = parseInt(betAmount.value);
  if(playerResult == "won"){
    Object.keys(storage).forEach(obj => {
      console.log("won")
      let parsedObj = JSON.parse(storage[obj]);
      if(parsedObj.name == player.name){
        player.money += betAmountInt * 2;
        storage[obj] = JSON.stringify({name: player.name, money: player.money});
      }
    })
  }
  else if(playerResult == "push"){
    console.log("NaN?")
    Object.keys(storage).forEach(obj => {
      console.log("push")
      console.log(obj)
      console.log(storage[obj])
      let parsedObj = JSON.parse(storage[obj]);
      if(parsedObj.name == player.name){
        console.log(player.money);
        player.money += betAmountInt;
        storage[obj] = JSON.stringify({name: player.name, money: player.money});
      }
    })
  }
}

function hit(){
  player.number[player.number.length] = rng();
  console.log(player.score);
  player.score[player.score.length] = card.value[player.number[player.number.length-1]];
  playerSide.innerHTML += createCard(createNumber(player.number[player.number.length-1]));
  checkWin(player.score);
}

function stand(){
  console.log("stand")
  document.getElementById("hidden-card").remove();
  dealerSide.innerHTML += createCard(createNumber(dealer.number[1]));
  footer.innerHTML = "";
  checkWin(dealer.score);
  while(true)
  {
    console.log("whilte ture")
    if(totalScore(dealer.score) == 17 && checkSoft17() == true){
      console.log("schack woft")
      for(let x = 0; x < dealer.score.length; x++) {
        console.log(x);
        if(dealer.score[x] == 11){
          dealer.score[x] = 1;
          continue;
        }
      }
    }
    else if(totalScore(dealer.score) <= 17){
      console.log("dealerscoarf <= 17")
      if(totalScore(dealer.score) > totalScore(player.score)){
        gameEnd();
        break;
      }
      else{
        dealer.number[dealer.number.length] = rng();
        dealer.score[dealer.score.length] = card.value[dealer.number[dealer.number.length-1]]
        dealerSide.innerHTML += createCard(createNumber(dealer.number[dealer.number.length-1]));
      }   
    }
    else if(totalScore(dealer.score) >= 17){
      console.log("totscore delar >= 17")
      console.log(player.score)
      console.log(dealer.score)
      if(totalScore(player.score) > totalScore(dealer.score) && totalScore(player.score) < 21){
        console.log("playuer won")
        message = "PLAYER WON";
        balanceChange("won");
        gameEnd();
        break;
      }
      else if(totalScore(player.score) < totalScore(dealer.score)  && totalScore(dealer.score) < 21){
        console.log("dealur won")
        message = "DEALER WON";
        gameEnd();
        break;
      }
      else if(totalScore(player.score) == totalScore(dealer.score)){
        console.log("paugs")
        message = "PUSH";
        balanceChange("push")
        gameEnd();
        break;
      }
      else if(totalScore(dealer.score) >= 21){
        console.log("ceahk win")
        checkWin(dealer.score);
        break;
      }
    }
  }  
}

startUp();
login();