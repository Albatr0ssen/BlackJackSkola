
//Starta programmet när spelaren trycker deal knappen

//Ta bort antalet pengar spelaren satsade (local storage)

let cardColors = ["♠", "♥", "♦", "♣"];
let cardNumbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Kn", "Q", "K", "E",];
let cardScore = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
let dealerNumber = [rng(), rng()];
let playerNumber = [rng(), rng()];
let dealerScore = [cardScore[dealerNumber[0]], cardScore[dealerNumber[1]]];
let playerScore = [cardScore[playerNumber[0]], cardScore[playerNumber[1]]];
let main;
let footer;
let dealerSide;
let playerSide;
let gameBoard;

body = document.querySelector("body");
body.innerHTML = '<div id="game-board"></div>';
gameBoard = document.querySelector("#game-board");
gameBoard.innerHTML = '<header></header>';
gameBoard.innerHTML += '<main></main>';
gameBoard.innerHTML += '<footer class="flex-center"></footer>';
main = document.querySelector("main");
main.innerHTML = '<div id="dealer-side" class="flex-center"></div>'
main.innerHTML += '<div id="line"></div>'
main.innerHTML += '<div id="player-side" class="flex-center"></div>'


function gameMenu(){
  body.style.background += "black";
  gameBoard.style.opacity = "0.25";
  body.class = "absolute";
  body.innerHTML += '<input id="" class="absolute" type="button" value="START GAME" onclick="gameStart();" />';
}

function gameStart(){
  gameBoard.style.opacity = "1";
  body = document.querySelector("body");
  body.innerHTML = '<header></header>';
  body.innerHTML += '<main></main>';
  body.innerHTML += '<footer class="flex-center"></footer>';
  main = document.querySelector("main");
  footer = document.querySelector("footer");
  main.innerHTML = '<div id="dealer-side" class="flex-center"></div>'
  main.innerHTML += '<div id="line"></div>'
  main.innerHTML += '<div id="player-side" class="flex-center"></div>'
  dealerSide = document.querySelector("#dealer-side");
  playerSide = document.querySelector("#player-side");
  dealerSide.innerHTML += createCard(createNumber(dealerNumber[0]));
  dealerSide.innerHTML += '<div id="hidden-card" class="card hidden"></div>';
  playerSide.innerHTML += createCard(createNumber(playerNumber[0]));
  playerSide.innerHTML += createCard(createNumber(playerNumber[1]));
  footer.innerHTML += '<input id="hit-button" type="button" value="hit" onclick="hit();" />';
  footer.innerHTML += '<input id="hit-button" type="button" value="stand" onclick="stand();" />';
  checkWin(playerScore);
}

function gameEnd(){
  footer.innerHTML = '<input id="deal-button" type="button" value="deal" onclick="deal();" />';
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
  let cardNumber = cardNumbers[number];
  cardNumber += cardColors[rng("Color")];
  return cardNumber;
}

function rng(max) {
  if (max == undefined) {
    max = cardNumbers.length;
  } else if (max == "Color") {
    max = 4;
  }
  return Math.floor(Math.random() * Math.floor(max));
}

function totalScore(user) {
  let total = 0;
  for (let x = 0; x < user.length; x++) {
    total += user[x];
  }
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
  for(let x = 0; x < dealerScore.length; x++) {
    if(dealerScore[x] == 11){
      console.log("check soft")
      return true;
    }
  }
  return false;
}

function hit(){
  playerNumber[playerNumber.length] = rng();
  playerScore[playerScore.length] = cardScore[playerNumber[playerNumber.length-1]]
  playerSide.innerHTML += createCard(createNumber(playerNumber[playerNumber.length-1]));
  checkWin(playerScore);
}

function stand(){
  console.log("stand")
  document.getElementById("hidden-card").remove();
  dealerSide.innerHTML += createCard(createNumber(dealerNumber[1]));
  footer.innerHTML = "";
  checkWin(dealerScore);
  while(true)
  {
    if(totalScore(dealerScore) == 17 && checkSoft17() == true){
      for(let x = 0; x < dealerScore.length; x++) {
        console.log(x);
        if(dealerScore[x] == 11){
          dealerScore[x] = 1;
          continue;
        }
      }
    }

    else if(totalScore(dealerScore) >= 17){
      checkWin(dealerScore);
      break;
    }

    else if(totalScore(dealerScore) <= 17){
      dealerNumber[dealerNumber.length] = rng();
      dealerScore[dealerScore.length] = cardScore[dealerNumber[dealerNumber.length-1]]
      dealerSide.innerHTML += createCard(createNumber(dealerNumber[dealerNumber.length-1]));
    }
  }  
}

gameMenu();
//gameStart();