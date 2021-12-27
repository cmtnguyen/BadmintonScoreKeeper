/*
First to 21 unless score is 20 to 21 / 21 to 20
Then is first to 2 points above e.g: 22 to 20 / 25 to 23
If 28 to 29 / 29 to 28 -> it is first to 30
*/
let winningScore = 21;
let gameOver = false;
let p1CurrentScore = 0;
let p2CurrentScore = 0;

// Manipulate Scores for both players

let p1Score = document.querySelector("#p1Score");
let p2Score = document.querySelector("#p2Score");
let p1Add = document.querySelector("#p1Add");
let p2Add = document.querySelector("#p2Add");
let p1Sub = document.querySelector("#p1Sub");
let p2Sub = document.querySelector("#p2Sub");

p1Sub.disabled = true;
p2Sub.disabled = true;

p1Add.addEventListener('click', function () {
    if (!gameOver) {
        p1Score.innerText = add("p1");
        gameOver = checkScores();
    }
})
p2Add.addEventListener('click', function () {
    if (!gameOver) {
        p2Score.innerText = add("p2");
        gameOver = checkScores();
    }
})
p1Sub.addEventListener('click', function () {
    p1Score.innerText = sub("p1");
    gameOver = checkScores();
})
p2Sub.addEventListener('click', function () {
    p2Score.innerText = sub("p2");
    gameOver = checkScores();
})

//checks scores to see if the game is done
const checkScores = () => {
    let p1 = parseInt(p1Score.innerText);
    let p2 = parseInt(p2Score.innerText);
    //winningScore is 21
    if (winningScore == 21 || p1 < 20 || p2 < 20) {
        winningScore == 21;     // in case user subtracts score while winningScore = 30
        if (p1 <= 20 && p2 <= 20) {
            // in case user subtracts score
            p1Add.disabled = false;
            p2Add.disabled = false;
            if (p1 == 0) {
                p1Sub.disabled = true;
            }
            else {
                p1Sub.disabled = false;
            }
            if (p2 == 0) {
                p2Sub.disabled = true;
            }
            else {
                p2Sub.disabled = false;
            }
            winningScore = 21;
            p1Score.className = "";
            p2Score.className = "";
            return false;
        }
        else if ((p1 < 20 && p2 == winningScore) || (p2 < 20 && p1 == winningScore)) {
            p1Add.disabled = true;
            p2Add.disabled = true;
            if (p2 == winningScore) {
                p2Score.classList.add("winner");
                p1Score.classList.add("loser");
                p1Sub.disabled = true;
            }
            else {
                p1Score.classList.add("winner");
                p2Score.classList.add("loser");
                p2Sub.disabled = true;
            }
            return true;
        }
        else {
            winningScore = 30;
            return false;
        }
    }
    //winningScore is now 30 and both scores are at least 20
    else {
        if (p2 >= (p1 + 2) || p1 >= (p2 + 2)) {
            p1Add.disabled = true;
            p2Add.disabled = true;
            if (p2 >= p1 + 2) { //p2 is winner by 2 pts
                p2Score.classList.add("winner");
                p1Score.classList.add("loser");
                p1Sub.disabled = true;
            }
            else { //p1 is winner by 2 pts
                p1Score.classList.add("winner");
                p2Score.classList.add("loser");
                p2Sub.disabled = true;
            }
            return true;
        }
        else if (p1 == winningScore || p2 == winningScore) {
            p1Add.disabled = true;
            p2Add.disabled = true;
            if (p2 == winningScore) {
                p2Score.classList.add("winner");
                p1Score.classList.add("loser");
                p1Sub.disabled = true;
            }
            else {
                p1Score.classList.add("winner");
                p2Score.classList.add("loser");
                p2Sub.disabled = true;
            }
            return true;
        }
        else {
            // in case user subtracts score
            p1Score.className = "";
            p2Score.className = "";
            p1Add.disabled = false;
            p2Add.disabled = false;
            if (p1 == 0) {
                p1Sub.disabled = true;
            }
            else {
                p1Sub.disabled = false;
            }
            if (p2 == 0) {
                p2Sub.disabled = true;
            }
            else {
                p2Sub.disabled = false;
            }
            return false;
        }
    }
}

const add = (player) => {
    if (player === "p1") {
        player = p1Score;
        playerSub = p1Sub;
    }
    else {
        player = p2Score;
        playerSub = p2Sub;
    }
    let total = parseInt(player.innerText) + 1;
    return total;
}

const sub = (player) => {
    if (player === "p1") {
        player = p1Score;
        playerSub = p1Sub;
    }
    else {
        player = p2Score;
        playerSub = p2Sub;
    }
    let current = parseInt(player.innerText);
    if (current > 0) {
        current--;
    }
    return current;
}

// Reset Scores
let reset = document.querySelector("#reset");
reset.addEventListener('click', function () {
    p1Score.innerText = p2Score.innerText = 0;
    gameOver = false;
    winningScore = 21;
    p1Score.className = "";
    p2Score.className = "";
    p1Add.disabled = false;
    p2Add.disabled = false;
    p1Sub.disabled = true;
    p2Sub.disabled = true;
})

// Continues to Next Set and Saves Scores
let set = document.querySelector("#set");
let setNum = document.querySelector("#setNum");
let setList = document.querySelector("#setList");
let p1Name = document.querySelector('#p1Name');
let p2Name = document.querySelector('#p2Name');
set.addEventListener('click', function () {
    setNum.innerText = parseInt(setNum.innerText) + 1;
    const li = document.createElement("li");
    if (!p1Name.value) {
        p1Name.value = "Player 1";
    }
    if (!p2Name.value) {
        p2Name.value = "Player 2";
    }
    li.innerText = `${p1Name.value}: ${p1Score.innerText}pts | ${p2Name.value}: ${p2Score.innerText}pts`;
    setList.append(li);
    p1Score.innerText = p2Score.innerText = 0;
    gameOver = false;
    winningScore = 21;
    p1Score.className = "";
    p2Score.className = "";
    p1Add.disabled = false;
    p2Add.disabled = false;
    p1Sub.disabled = true;
    p2Sub.disabled = true;
})

//New Game resets everything and deletes saved scores
let newGame = document.querySelector("#game");
newGame.addEventListener('click', function () {
    p1Score.innerText = p2Score.innerText = 0;
    setNum.innerText = 1;
    setList.innerHTML = "";
    gameOver = false;
    winningScore = 21;
    p1Score.className = "";
    p2Score.className = "";
    p1Add.disabled = false;
    p2Add.disabled = false;
    p1Sub.disabled = true;
    p2Sub.disabled = true;
    p1Name.value = "";
    p2Name.value = "";
})
