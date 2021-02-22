"use strict";
//
//Ta bort antalet pengar spelaren satsade (local storage)
let dealerSide, playerSide, playerName, money;
let storage = window.localStorage;
storage.clear();
storage.setItem("name", "joe");
storage.setItem("money", "1000");
console.table(storage);

let card = {
  colors: ["♠", "♥", "♦", "♣"],
  numbers: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Kn", "Q", "K", "E",],
  value: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
}

let dealer = {
  number: [],
}

let player = {
  name: storage.playerName,
  number: [],
  money: storage[3],
}

resetScore();


let body = document.querySelector("body");
body.innerHTML = '<div id="game-board"></div>';
body.innerHTML += '<div id="game-menu"></div>';
let gameBoard = document.querySelector("#game-board");
let startMenu = document.querySelector("#game-menu");
gameBoard.innerHTML = '<header></header>';
gameBoard.innerHTML += '<main></main>';
gameBoard.innerHTML += '<footer class="flex-center"></footer>';
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
header.innerHTML += storage.money;


function gameMenu(){
  body.style.background += "black";
  gameBoard.style.opacity = "0.25";
  startMenu.class = "absolute";
  startMenu.innerHTML += '<span>YOOOOOOOOOOOOOO <input id="start-game-button" class="absolute" type="button" value="START GAME" onclick="gameStart();" /></span>';
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
  footer.innerHTML = '<input id="deal-button" type="button" value="deal" onclick="gameMenu();" />';
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
function checkOver21(userScore){
    if(totalScore(userScore) > 21){
        for(let x = 0; x < userScore.length; x++) {
            if(userScore[x] == 11){
                userScore[x] = 1;
                break;
            }
        }
        
    }
    if(totalScore(userScore) > 21){
        console.log("busted");
        gameEnd();
    }
    return userScore;
}

function checkBlackJack(userScore){
  if(totalScore(userScore) == 21){
    console.log("blackjack")
    gameEnd();
  }
}

function checkWin(userScore) {
    userScore = checkOver21(userScore);
    checkBlackJack(userScore);
    console.table(userScore);
    console.log(totalScore(userScore));
}

function checkSoft17(){
  for(let x = 0; x < dealer.score.length; x++) {
    if(dealer.score[x] == 11){
      console.log("check soft")
      return true;
    }
  }
  return false;
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
    if(totalScore(dealer.score) == 17 && checkSoft17() == true){
      for(let x = 0; x < dealer.score.length; x++) {
        console.log(x);
        if(dealer.score[x] == 11){
          dealer.score[x] = 1;
          continue;
        }
      }
    }

    else if(totalScore(dealer.score) >= 17){
      checkWin(dealer.score);
      break;
    }

    else if(totalScore(dealer.score) <= 17){
      dealer.number[dealer.number.length] = rng();
      dealer.score[dealer.score.length] = card.value[dealer.number[dealer.number.length-1]]
      dealerSide.innerHTML += createCard(createNumber(dealer.number[dealer.number.length-1]));
    }
  }  
}

gameMenu();
//gameStart();