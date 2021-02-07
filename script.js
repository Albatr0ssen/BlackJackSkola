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

function gameStart(){
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
  dealerSide.innerHTML += '<div class="card hidden"></div>';
  playerSide.innerHTML += createCard(createNumber(playerNumber[0]));
  playerSide.innerHTML += createCard(createNumber(playerNumber[1]));
  footer.innerHTML += '<input id="hit-button" type="button" value="hit" onclick="hit();" />';
  footer.innerHTML += '<input id="hit-button" type="button" value="stand" onclick="stand();" />';
  checkWin(playerScore);
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
    console.log(totalScore(playerScore));
}

function hit(){
  playerNumber[playerNumber.length] = rng();
  playerScore[playerScore.length] = cardScore[playerNumber[playerNumber.length-1]]
  playerSide.innerHTML += createCard(createNumber(playerNumber[playerNumber.length-1]));
  checkWin(playerScore);
}

function gameMenu(){
  
}



function gameEnd(){
  footer.innerHTML = '<input id="deal-button" type="button" value="deal" onclick="deal();" />';
}

gameStart();