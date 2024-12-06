/*
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

*/

// Card Management (Eric)

/*

These classes set up the deck and the cards. The deck element also has attributes for both the type
and suit, so it's easier to keep track of which card is which.


The deck class will also have the methods for setting up the deck and playing. More details and stuff
can be found underneath them in another comment.

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
    
    Straight flush – three consecutive cards of the same suit
    Three-of-a-kind – three cards of the same rank
    Straight – three consecutive cards of mixed suits
    Flush – three cards of the same suit
    Pair – two cards of the same rank
    High card

    */

    getHandScores () {

        let fstValOne = this.handOne[0].value
        let fstValTwo = this.handOne[1].value
        let fstValThree = this.handOne[2].value

        let sndValOne = this.handTwo[0].value
        let sndValTwo = this.handTwo[1].value
        let sndValThree = this.handTwo[2].value

        //This is just to make writing the elif statments shorter and easier.
        
        //Straight flush
        //Three-of-a-kind
        //Straight
        //Flush

        if(this.handOne[0].suit == this.handOne[1].suit & this.handOne[1].suit == this.handOne[2].suit) {
            console.log("Flush, Player 1")
        }

        
        if(this.handTwo[0].suit == this.handTwo[1].suit & this.handTwo[1].suit == this.handTwo[2].suit) {
            console.log("Flush, Player 2")
        }
        //Pair      
        
        if(fstValOne === fstValTwo || fstValTwo === fstValThree || fstValOne === fstValThree) {
            console.log("Pair, Player 1")
        }
        if (sndValOne === sndValTwo || sndValTwo === sndValThree || sndValOne === sndValThree) {
            console.log("Pair, Player 2")
        }

        //High card
        
        for (let i = 2; i >= 0;) {

            if(this.handOne[i].value > this.handTwo[i].value) {
                return console.log("High Card, Player 1")

            } else if(this.handOne[i].value < this.handTwo[i].value) {
                return console.log("High Card, Player 2")

            }
            
            i--

        }

        /*
        if (fstValThree > sndValThree) {
            console.log("Player One Wins")
        } else if (fstValThree < sndValThree) {
            console.log("Player Two Wins") 
        } else if (fstValTwo > sndValTwo) {
            console.log("Player One Wins")
        } else if (fstValTwo < sndValTwo) {
            console.log("Player Two Wins")
        } else if (fstValOne > sndValTwo) {
            console.log("Player One Wins")
        } else if (fstValOne < sndValTwo) {
            console.log("Player Two Wins")
        } else {console.log("Draw")}
        */
    }

}                

const playingDeck = new Deck();
/* playingDeck.getShuffledDeck()
playingDeck.getHandOne()
playingDeck.getHandTwo()
playingDeck.getHandScores() */

for (let i = 1; i < 100; i++) {
    console.log(i)
    playingDeck.getShuffledDeck()
    playingDeck.getHandOne()
    playingDeck.getHandTwo()
    playingDeck.getHandScores()
    playingDeck.emptyHand()
}

/*  Below here is a list of methods you can use to set up the deck.

    
playingDeck.getShuffledDeck() - Shuffles the Deck (Do this every time before you deal the cards)
playingDeck.getHandOne() - Gets player one's hand
playingDeck.getHandTwo() - Gets player two's hand
playingDeck.emptyHand() - Empties the hands of both players and adds them back to the deck.


*/

//Point Variable Definitions

let pointCount = {

    playerOne: 1000,
    playerTwo: 1000,

}

// Bet Variable Definitions

let betOne = {

    playerOne: 0,
    playerTwo: 0

}

let betTwo = {
    
    playerOne: 0,
    playerTwo: 0
    
    }


// Going to be using 'playerNum' to represent which player is having their points changed.

//Function below is for deducting a hundred points from forfeiting in the first round.

function startForfeit(playerNum) {

    if (playerNum == 1) {
        return pointCount.playerOne -= 100;
    } else if (playerNum == 2) {
        return pointCount.playerTwo -= 100;
    }

}

function secondForfeit(playerNum, bet) {

    if (playerNum == 1) {

        pointCount.playerOne -= bet.playerOne;
        pointCount.playerTwo += bet.playerOne;

    } else if (playerNum == 2) {
        
        pointCount.playerTwo -= bet.playerTwo;
        pointCount.playerOne += bet.playerTwo;

    };

}






function getScore (hand) {



}



//End (Eric)