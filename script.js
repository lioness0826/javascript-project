// start button and 
const $ = (selector) => document.querySelector(selector);

function resetPlayer(){
    $("#player-1").style.boxShadow = "none";
    $("#player-2").style.boxShadow = "none";
}

function order() {
    resetPlayer();
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

        this.handOne.sort((x, y) => x.value - y.value);

        return this.handOne

    }

    getHandTwo () {

        while (this.handTwo.length < 3) {
    
            this.handTwo.push(this.deck.pop())
            
        }
        
        this.handTwo.sort((x, y) => x.value - y.value);

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

            } else if(this.handOne[i].value < this.handTwo[i].value) {
                handTwoScore += 1

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

const playingDeck = new Deck();

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

let betOne = {

    playerOne: 0,
    playerTwo: 0

}

let betTwo = {
    
    playerOne: 0,
    playerTwo: 0
    
    }


let finalBet = {

    playerOne: 0,
    playerTwo: 0

}

finalBet.playerOne = betOne.playerOne + betTwo.playerOne;
finalBet.playerTwo = betOne.playerTwo + betTwo.playerTwo;

// Going to be using 'playerNum' to represent which player is having their points changed.

//Function below is for deducting a hundred points from forfeiting in the first round.

function startForfeit(playerNum) {

    if (playerNum === 1) {
        return pointCount.playerOne -= 100;
    } else if (playerNum === 2) {
        return pointCount.playerTwo -= 100;
    }

    playingDeck.emptyHand();
    playingDeck.getShuffledDeck()

}

function secondForfeit(playerNum, betOne) {

    if (playerNum === 1) {

        pointCount.playerOne -= betOne.playerOne;
        pointCount.playerTwo += betOne.playerOne;

    } else if (playerNum === 2) {
        
        pointCount.playerTwo -= betOne.playerTwo;
        pointCount.playerOne += betOne.playerTwo;

    };

    playingDeck.emptyHand();
    playingDeck.getShuffledDeck();

}

//End (Eric)

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
