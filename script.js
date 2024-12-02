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