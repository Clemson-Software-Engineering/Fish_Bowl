var bowlArray = [];
var randArray = [];
var Team1 = [];
var Team2 = [];
var active = 0;
var Team1Score = 0;
var Team2Score = 0;
var activeTeam = 1;
var roundCounter = 1;

function switchMembers(array, location){
    var hold = array[location];
    array[location] = array[0];
    array[0] = hold;
}

function addPrompts(){
    var prompt1 = document.getElementById("prompt1").value;
    var prompt2 = document.getElementById("prompt2").value;
    var prompt3 = document.getElementById("prompt3").value;

    document.getElementById("prompt1").value = ' ';
    document.getElementById("prompt2").value = ' ';
    document.getElementById("prompt3").value = ' ';

    bowlArray[bowlArray.length]=prompt1;
    bowlArray[bowlArray.length]=prompt2;
    bowlArray[bowlArray.length]=prompt3;

    randArray = arrayClone(bowlArray);

    showTeams();
}

function show(showArray){
    var content="<b>All Elements of the Array :</b><br>";
    for(var i = 0; i < showArray.length; i++) {
       content +=showArray[i]+"<br>";
    }
    document.getElementById('display').innerHTML = content;
}

function randomItem(){
    var content="<b>Your Clue Is: </b><br>";
    var rand = Math.floor(Math.random() * randArray.length);
    switchMembers(randArray, rand);
    content+=randArray[0]+"<br>";
    

    document.getElementById('yourRand').innerHTML = content;
}

function arrayClone(srcArray){
    var destArray = [];
    for(i = 0; i < srcArray.length; i++){
        destArray[i]=srcArray[i];
    }
    return destArray;
}

function joinTeam1(){
    var pName = document.getElementById("playerName").value;

    document.getElementById("playerName").value = ' ';

    Team1[Team1.length] = pName;

    addPrompts();    
}

function joinTeam2(){
    var pName = document.getElementById("playerName").value;

    document.getElementById("playerName").value = ' ';

    Team2[Team2.length] = pName;

    addPrompts();    
}

function showTeams(){
    var t1 = "<h1>Team 1 Players</h1><br>";
    for(var i = 0; i < Team1.length; i++) {
        t1 +=Team1[i]+"<br>";
    }

    var t2 = "<h1>Team 2 Players</h1><br>";
    for(var i = 0; i < Team2.length; i++) {
        t2 +=Team2[i]+"<br>";
    }

    document.getElementById('team1').innerHTML = t1;
    document.getElementById('team2').innerHTML = t2;
}

function ready(){
    
    document.getElementById("gameStart").innerHTML = '';
    document.getElementById("promptForm").innerHTML = '';
    var readyText = '<input type="button" class="game" value="Start Game" onclick="startGame()">'

    currentPlayer();

    document.getElementById('ready').innerHTML = readyText;

    var rulesText;

    if(roundCounter == 1){
        rulesText = 'For this round, you may speak any words except those within the clue!';      
        document.getElementById('rules').innerHTML = rulesText;
    }
    else if(roundCounter == 2){
        rulesText = 'For this round, you may only say one word! It cannot be contained within the clue.';      
        document.getElementById('rules').innerHTML = rulesText;
    }
    else if(roundCounter == 3){
        rulesText = 'For this round, you must act out the clue! You cannot speak, but sounds are allowed.';      
        document.getElementById('rules').innerHTML = rulesText;
    }

}

function startGame(){

    var newButtons = '<input type="button" class="game" value="Correct Guess!" onclick="goodGuess()">';
    newButtons += '<input type="button" class="game" value="SKIP!" onclick="skipped()"><br><br>';
    newButtons += '<input type="button" class="game" value="Round Over" onclick="endRound()"><br>';
    document.getElementById("gamePlay").innerHTML = newButtons;
    document.getElementById('ready').innerHTML = '';

    startRound();
}

function startRound(){
    randomItem();
    updateScoreboard();
}

function endRound(){
    ready();
    document.getElementById("gamePlay").innerHTML = '';
    document.getElementById("yourRand").innterHTML = '';
}

function updateScoreboard(){
    var t1 = "<h1>Team 1 Score</h1><br>";
     t1 +=Team1Score+"<br>"; 

    var t2 = "<h1>Team 2 Score</h1><br>";
    t2 +=Team2Score+"<br>";


    document.getElementById('team1Score').innerHTML = t1;
    document.getElementById('team2Score').innerHTML = t2;
}

function currentPlayer(){
    if(active >= Team1.length + Team2.length){
        active = 0;
    }
    var actPlayer = "<h2>Active Player: </h2>";
    var currTeam = active % 2;
    var currPlayer = Math.floor(active/2);
    if(active == 0){
        activeTeam = 1;
        actPlayer += Team1[currPlayer] + "<br>";
    }
    else{
        activeTeam = 2;
        actPlayer += Team2[currPlayer] + "<br>";
    }

    document.getElementById('activePlayer').innerHTML = actPlayer;
    active++;
}

function goodGuess(){
    if(activeTeam == 1){
        Team1Score++;
    }
    else{
        Team2Score++;
    }
    if(randArray.length == 1){
        roundAdvance();
    }
    else{
        randArray.shift();
        randomItem();
    }

    updateScoreboard();
}

function roundAdvance(){
    if(roundCounter == 3){
        gameOver();
    }
    else{
        roundCounter++;
        randArray = arrayClone(bowlArray);
        endRound();
    }
}

function gameOver()
{
    document.getElementById("gamePlay").innerHTML = '';
    document.getElementById("activePlayer").innerHTML = '';
    document.getElementById("yourRand").innerHTML = '';
    document.getElementById("rules").innerHTML = '';

    if(Team1Score > Team2Score){
        document.getElementById("results").innerHTML = "Team 1 has won the game!";
    }
    else if(Team2Score > Team1Score){
        document.getElementById("results").innerHTML = "Team 2 has won the game!";
    }
    else{
        document.getElementById("results").innerHTML = "It's a tie!";
    }

}

function skipped(){
    var content="<b>Your Clue Is: </b><br>";
    if(randArray.length != 0){
        var rand = Math.floor(Math.random() * (randArray.length-1)) + 1;
        switchMembers(randArray, rand);
        content+=randArray[0]+"<br>";
        document.getElementById('yourRand').innerHTML = content;
    }
    else{
        content = document.getElementById('yourRand').innerHTML;
        content += "No more clues!<br>";
        document.getElementById('yourRand').innerHTML = content;
    }
}