//Starta programmet när spelaren trycker deal knappen

//Ta bort antalet pengar spelaren satsade (local storage)

let cardColors = ["♠", "♥", "♦", "♣"];
let cardNumbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Kn", "Q", "K", "E",];
let cardScore = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
let dealerSide = document.querySelector("#dealer-side");
let playerSide = document.querySelector("#player-side");
let dealerNumber = [rng(), rng()];
let playerNumber = [rng(), rng()];
let dealerScore = [cardScore[dealerNumber[0]], cardScore[dealerNumber[1]]];
let playerScore = [cardScore[playerNumber[0]], cardScore[playerNumber[1]]];

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

function checkBlackJack(){
    if (totalScore("dealerScore") == 21) {
        if (totalScore("playerScore") == 21) {
            console.log("push")
        }
        else{
            console.log("dealer blackjack");
        }
    }
    else if (totalScore("playerScore") == 21) {
        console.log("player blackjack");
    }
}

function checkOver21(userScore){
    if(totalScore(userScore) > 21){
        for(let x = 0; x < userScore.length; x++) {
            console.log(userScore[x]);
            if(userScore[x] == 11){
                userScore[x] = 1;
                break;
            }
        }
        
    }
    if(totalScore(userScore) > 21){
        console.log("busted");
    }
    return userScore;
}

function checkWin(dealerScore, playerScore) {
    dealerScore = checkOver21(dealerScore);
    playerScore = checkOver21(playerScore);
    checkBlackJack();
    return [dealerScore, playerScore];
}

function table(){
    console.log("Dealer Score: " + totalScore(dealerScore));
    console.table(dealerScore);
    console.log("Player Score: "+ totalScore(playerScore));
    console.table(playerScore);
}

dealerSide.innerHTML += createCard(createNumber(dealerNumber[0]));
dealerSide.innerHTML += '<div class="card hidden"></div>';
playerSide.innerHTML += createCard(createNumber(playerNumber[0]));
playerSide.innerHTML += createCard(createNumber(playerNumber[1]));
[dealerScore, playerScore] = checkWin(dealerScore, playerScore);
table();

