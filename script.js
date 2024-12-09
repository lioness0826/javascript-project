

// Card Management and Scoring (Eric)

/*

-- METHODS AND FUNCTIONS --

Below here is a list of methods you can use to set up the deck:

    
playingDeck.getShuffledDeck() - Shuffles the Deck (Do this every time before you deal the cards)
playingDeck.getHandOne() - Gets player one's hand
playingDeck.getHandTwo() - Gets player two's hand
playingDeck.emptyHand() - Empties the hands of both players and adds them back to the deck.

// And the methods and functions here are for scoring and the game itself:

playingDeck.getHandScores() - Returns the winner if no one forfeits, 1 if player 1 wins, 2 if player 2 wins, and 0 if it's a draw.
startForfeit(playerNum) - If playerNum = 1, then player one forfeits and loses 100 points, if it equals 2, the same occurs for player 2.
secondForfeit(playerNum, betOne) - Same as above, but it also takes the first round bets, and awards the points accordingly.
startGame() - Starts the game and sets up the query selectors for the cards. Currently called by the start button.

-- VARIABLES --

To update the bet numbers:


*/

class Card {

    constructor(suit, type, value){

        this.suit = suit;
        this.type = type;
        this.value = value;

    }

}

class Deck {

    constructor() {
        
        this.deck = [];
        this.handOne = [];
        this.handTwo = [];

        const types = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
        const values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];




        for (let suit in suits) {

            let value = 0

            for (let type in types) {


                this.deck.push(new Card(suits[suit], types[type], values[value]));

                value += 1


            }

        }


    }

    getShuffledDeck() {

        for (let i = this.deck.length - 1; i >= 0; i--) {
    
            let s = Math.floor(Math.random() * (i + 1));
    
            let loopTemp = this.deck[i];
    
            this.deck[i] = this.deck[s];
            
            this.deck[s] = loopTemp;

            // console.log(this.deck[i])
            // This is just here so I can uncomment this line and check in the console to make sure the shuffle works.
            
        }
    
    
    }

    getHandOne () {

        while (this.handOne.length < 3) {
    
            this.handOne.push(this.deck.pop())
    
        }

        return this.handOne

    }

    getHandTwo () {

        while (this.handTwo.length < 3) {
    
            this.handTwo.push(this.deck.pop())
            
        }
        


        return this.handTwo
        
    }

    emptyHand () {

        while (this.handOne.length > 0) {

            this.deck.push(this.handOne.pop())

        }

        
        while (this.handTwo.length > 0) {

            this.deck.push(this.handTwo.pop())
            
        }
    }

    /* 

    For three card poker, the best hands from top to bottom are:
    
    Straight flush – three consecutive cards of the same suit - 100000
    Three-of-a-kind – three cards of the same rank - 10000
    Straight – three consecutive cards of mixed suits - 1000
    Flush – three cards of the same suit - 100
    Pair – two cards of the same rank - 10
    High card - 1 

    */

    getHandScores () {

        
        this.handOne.sort((x, y) => x.value - y.value);
        this.handTwo.sort((x, y) => x.value - y.value);

        let fstValOne = this.handOne[0].value
        let fstValTwo = this.handOne[1].value
        let fstValThree = this.handOne[2].value

        let sndValOne = this.handTwo[0].value
        let sndValTwo = this.handTwo[1].value
        let sndValThree = this.handTwo[2].value

        let handOneScore = 0
        let handTwoScore = 0
        let playerNumWin = 0

        //These variables are just used to write these values in shorter form at times.

        // Hand Type Calculations
        
        //Straight flush

        if(fstValOne + 1 === fstValTwo && fstValTwo + 1 === fstValThree && this.handOne[0].suit === this.handOne[1].suit
            && this.handOne[1].suit === this.handOne[2].suit) {
            handOneScore += 100000
        }

        if(sndValOne + 1 === sndValTwo && sndValTwo + 1 === sndValThree && this.handTwo[0].suit === this.handTwo[1].suit
            && this.handTwo[1].suit === this.handTwo[2].suit) {
            handTwoScore += 100000
        }

        //Three-of-a-kind

        if (fstValOne === fstValTwo && fstValTwo === fstValThree) {
            handOneScore += 10000
        }

        
        if (sndValOne === sndValTwo && sndValTwo === sndValThree) {
            handTwoScore += 10000
        }

        //Straight

        if(fstValOne + 1 === fstValTwo && fstValTwo + 1 === fstValThree ) {
            handOneScore += 1000
        }

        if(sndValOne + 1 === sndValTwo && sndValTwo + 1 === sndValThree ) {
            handTwoScore += 1000
        }

        //Flush

        if(this.handOne[0].suit === this.handOne[1].suit && this.handOne[1].suit === this.handOne[2].suit) {
            handOneScore += 100
        }

        
        if(this.handTwo[0].suit === this.handTwo[1].suit && this.handTwo[1].suit === this.handTwo[2].suit) {
            handTwoScore += 100
        }
        //Pair      
        
        if(fstValOne === fstValTwo || fstValTwo === fstValThree || fstValOne === fstValThree) {
            handOneScore += 10
        }
        if (sndValOne === sndValTwo || sndValTwo === sndValThree || sndValOne === sndValThree) {
            handTwoScore += 10
        }

        //High card
        
        for (let i = 2; i >= 0;) {

            if (this.handOne[i].value > this.handTwo[i].value) {
                handOneScore += 1
                break

            } else if(this.handOne[i].value < this.handTwo[i].value) {
                handTwoScore += 1
                break
            }

            i--

        }

        if (handOneScore > handTwoScore) {
            return playerNumWin = 1
        } else if (handOneScore < handTwoScore) {
            return playerNumWin = 2
        } else {
            return playerNumWin = 0
        }

    }

}

// CSS / HTML Counters


let roundOneText = document.querySelector("#round-1")
let roundTwoText = document.querySelector("#round-2")

let pOneScoreText = document.querySelector("#tracker-1")
let pTwoScoreText = document.querySelector("#tracker-2")


function updateCounters() {

roundOneText.textContent = `ROUND:`+roundNum
roundTwoText.textContent = `ROUND:`+roundNum

pOneScoreText.textContent = pointCount.playerOne
pTwoScoreText.textContent = pointCount.playerTwo

}

    // Query Selectors

    const cardOneImg = document.querySelector("#card-1-img")
    const cardTwoImg = document.querySelector("#card-2-img") 
    const cardThreeImg = document.querySelector("#card-3-img")

    const cardFourImg = document.querySelector("#card-4-img")
    const cardFifthImg = document.querySelector("#card-5-img") 
    const cardSixthImg = document.querySelector("#card-6-img")

    // Flip Functions

    function flipRndOne() {
        cardOneImg.src = `images/Cards/Fronts/${playingDeck.handOne[0].suit}_${playingDeck.handOne[0].type}.png` 
        cardFourImg.src = `images/Cards/Fronts/${playingDeck.handTwo[0].suit}_${playingDeck.handTwo[0].type}.png`
    }

    function flipRndTwo() {

        cardTwoImg.src = `images/Cards/Fronts/${playingDeck.handOne[1].suit}_${playingDeck.handOne[1].type}.png`
        cardFifthImg.src = `images/Cards/Fronts/${playingDeck.handTwo[1].suit}_${playingDeck.handTwo[1].type}.png`

    }
    
    function flipRndThree() {

        cardThreeImg.src = `images/Cards/Fronts/${playingDeck.handOne[2].suit}_${playingDeck.handOne[2].type}.png`
        cardSixthImg.src = `images/Cards/Fronts/${playingDeck.handTwo[2].suit}_${playingDeck.handTwo[2].type}.png`
        getWinner()
    }

//Game Initialization

const playingDeck = new Deck();

//Game Start Function

function startGame() {
    playingDeck.getShuffledDeck()
    playingDeck.getHandOne()
    playingDeck.getHandTwo()

    flipRndOne();

    cardTwoImg.src="images/Cards/red2.png"
    cardThreeImg.src="images/Cards/red2.png"
    cardFifthImg.src="images/Cards/red2.png"
    cardSixthImg.src="images/Cards/red2.png"

    updateCounters()
    bet.playerOne = 0
    bet.playerTwo = 0
    roundNum = 1
}

//

/* playingDeck.getShuffledDeck()
playingDeck.getHandOne()
playingDeck.getHandTwo()
playingDeck.getHandScores() */


//Point Variable Definitions

let pointCount = {

    playerOne: 1000,
    playerTwo: 1000,

}


// Bet Variable Initialization

let bet = {

    playerOne: 0,
    playerTwo: 0

}

// Round Counters

let roundNum = 1
let hasPlayerOneBet = false
let hasPlayerTwoBet = false

//End (Eric)

// start button and 
const $ = (selector) => document.querySelector(selector);

function resetPlayer(){
    $("#player-1").style.boxShadow = "none";
    $("#player-2").style.boxShadow = "none";
}

function order() {
    resetPlayer();
    startGame();
  let randomOrder = Math.random();
  let currentPlayer = randomOrder < 0.5 ? "#player-1" : "#player-2";
 $(currentPlayer).style.boxShadow = "0 0 5px 5px aliceblue";
}

function press(event){
   event.target.style.borderLeft="none";
   event.target.style.borderTop="none";

}

function release(event){
    event.target.style.border="3px solid rgb(45, 45, 45)";
}
$("#start").addEventListener("click", order);
$("#start").addEventListener("mousedown", press);
$("#reset").addEventListener("mousedown", press);
$("#start").addEventListener("mouseup", release);
$("#reset").addEventListener("mouseup", release);

$("#reset").addEventListener("mouseup", confirmReset);

//reset button
function confirmReset(){
    var reset = document.getElementById("reset")
    reset.innerHTML = ("Are you sure?")
    reset.style.fontSize = "1.9vw"
    reset.removeEventListener("mouseup", confirmReset)
    chReset()
}

function chReset(){
    $("#reset").addEventListener("mousedown", reallyReset)
}

function reallyReset(){
    location.reload()
}

/*

Lily

Betting system and flipping cards.

*/



// const start= document.querySelector("#start")


/*
    document.addEventListener("DOMContentLoaded", ()=>{
        start.addEventListener("click", ()=>{
            console.log("Start button clicked");
 
            flipRndOne();
             return;
        })
   )
     start.addEventListener("click", ()=>{
         flipRndOne();
    //     return;
     })

     */


    $("#bet-button-1").addEventListener("click", checkBet1)
    $("#bet-button-2").addEventListener("click", checkBet2)

    function setBet1() {
        bet.playerOne += parseInt(document.querySelector("#bet-1").value);
        console.log(bet.playerOne)
    }
    function setBet2() {
        bet.playerTwo +=parseInt(document.querySelector("#bet-2").value); 
        console.log(bet.playerTwo)
    }
 
    //const bet_1_input= document.querySelector("#bet-1");
    //const bet_2_input= document.querySelector("#bet-2");
 

    function checkBet1() {

        let betField1 = parseInt(document.querySelector("#bet-1").value)

        if(betField1 + bet.playerOne < bet.playerTwo / 2){
            alert("Player 1's bet must not be less than half of Player 2's bet.");
            bet_1_input.focus();

            } else if (bet.playerOne + betField1 <= pointCount.playerOne) {
                setBet1()
                hasPlayerOneBet = true

                if(hasPlayerTwoBet == true && roundNum == 1) {
                    console.log("Round Two")
                    flipRndTwo()
        
                    roundNum += 1
                    updateCounters()
                    hasPlayerOneBet = false
                    hasPlayerTwoBet = false
        
                } else if(hasPlayerTwoBet == true && roundNum == 2) {
                    console.log("Round Three")
                    flipRndThree()
                    hasPlayerOneBet = false
                    hasPlayerTwoBet = false
                }

            } else {
                alert("Bet is higher than remaining points, please enter a smaller bet.")
            }



    }

    function checkBet2(){

        let betField2 = parseInt(document.querySelector("#bet-2").value)

        if(betField2 + bet.playerTwo < bet.playerOne / 2){
            alert("Player 2's bet must not be less than half of Player 1's bet.");
            bet_2_input.focus();
        
            } else if (bet.playerTwo + betField2 <= pointCount.playerTwo) {
                setBet2()
                hasPlayerTwoBet = true

                if(hasPlayerOneBet == true && roundNum == 1) {
                    console.log("Round Two")
                    flipRndTwo()
    
                    roundNum += 1
                    updateCounters()
                    hasPlayerOneBet = false
                    hasPlayerTwoBet = false
    
                } else if(hasPlayerOneBet == true && roundNum == 2) {
                    console.log("Round Three")
                    flipRndThree()
                    hasPlayerOneBet = false
                    hasPlayerTwoBet = false
                }

            } else {
                alert("Bet is higher than remaining points, please enter a smaller bet.")
            }




        }

//flipRndTwo();
//alert("Please bet your second round!")

/*
    if(!isNaN(bet_1) && !isNaN(bet_2) && bet_1 >0 && bet_2 >0){
        flipRndThree();
        playingDeck.getHandScores();
    }
*/

// Get Winner (Eric)

function getWinner() {

    winner = playingDeck.getHandScores()
    alert(`Player: ${winner} wins!`)

    let pointsAwarded = 0

    if (bet.playerOne < bet.playerTwo) {
        pointsAwarded = bet.playerOne
    } else if (bet.playerTwo < bet.playerOne) {
        pointsAwarded = bet.playerTwo
    } else {
        pointsAwarded = bet.playerOne
    }

    if (winner === 1) {
        pointCount.playerOne += pointsAwarded
        pointCount.playerTwo -= pointsAwarded
    } else if (winner === 2) {
        pointCount.playerTwo += pointsAwarded
        pointCount.playerOne -= pointsAwarded
    } else {
        alert("Game was a draw, no points will be awarded.")
    }

    updateCounters

    playingDeck.emptyHand();
    playingDeck.getShuffledDeck();



}

// Forfeit Buttons

function forfeitOne() {

    if(roundNum === 1) {
        pointCount.playerOne -= 100
        pointCount.playerTwo += 100
    } else if (roundNum === 2) {
        pointCount.playerOne -= bet.playerOne
        pointCount.playerTwo += bet.playerTwo
    } else {
        alert("Error, cannot forfeit now.")
    }

    playingDeck.emptyHand()
    startGame()

}

function forfeitTwo() {

    if(roundNum === 1) {
        pointCount.playerTwo -= 100
        pointCount.playerOne += 100
    } else if (roundNum === 2) {
        pointCount.playerTwo -= bet.playerOne
        pointCount.playerOne += bet.playerTwo
    } else {
        alert("Error, cannot forfeit now.")
    }

    playingDeck.emptyHand()
    startGame()

}



document.querySelector("#fold-button-1").addEventListener("click", forfeitOne)
document.querySelector("#fold-button-2").addEventListener("click", forfeitTwo)
