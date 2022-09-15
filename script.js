let fields = [];
let curentShape = 'stick';
let PointsHomeTeam = 0;
let PointsVisitorTeam = 0;
let drawGame = false;


function fillFields(number) {
    if (!fields[number]) {
        if (curentShape == 'stick') {
            curentShape = 'puck';
            playerTwoInactive();
        } else {
            curentShape = 'stick';
            playerOneInactive();
        }
        fields[number] = curentShape;
        draw();
        checkForWin();
    }
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'puck') {
            document.getElementById('puck-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'stick') {
            document.getElementById('stick-' + i).classList.remove('d-none');
        }
    }

}


function checkForWin() {
    let winner = false;
    checkHorizontalLines(winner);
    checkVerticalLines(winner);
    checkDiagonalLines(winner);
    checkForDraw(winner);
}


function checkHorizontalLines(winner) {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        document.getElementById('line-1').style.transform = 'scaleX(1)';
        winner = true;
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        document.getElementById('line-2').style.transform = 'scaleX(1)';
        winner = true;
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        document.getElementById('line-3').style.transform = 'scaleX(1)';
        winner = true;
    }
    showEndScreen(winner);
}


function checkVerticalLines(winner) {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
        winner = true;
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
        winner = true;
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        document.getElementById('line-6').style.transform = 'rotate(90deg) scaleX(1)';
        winner = true;
    }
    showEndScreen(winner);
}


function checkDiagonalLines(winner) {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        document.getElementById('line-7').style.transform = 'rotate(45deg) scaleX(1.2)';
        winner = true;
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scaleX(1.2)';
        winner = true;
    }
    showEndScreen(winner);
}


function checkForDraw(winner) {
    if (!winner && fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5] && fields[6] && fields[7] && fields[8]) {
        showDrawScreen();
    }
}


function showDrawScreen() {
    setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
    }, 1200);
    document.getElementById('winner-text').innerHTML = 'DRAW!';
    drawGame = true;
}


function showEndScreen(winner) {
    if (winner) {
        setTimeout(function () {
            document.getElementById('game-over').classList.remove('d-none');
        }, 1200);
        checkWinnerText();
    }
}


function restartGame() {
    document.getElementById('game-over').classList.add('d-none');
    playersInactive();
    resetLines();
    resetFields();
    resetScore();
    curentShape = 'stick';
    drawGame = false;
}


function NextRound() {
    document.getElementById('game-over').classList.add('d-none');
    updateScore();
    resetLines();
    resetFields();
}


function checkWinnerText() {
    if (curentShape == 'puck') {
        document.getElementById('winner-text').innerHTML = 'SCORE HOME-TEAM!';
    } else {
        document.getElementById('winner-text').innerHTML = 'SCORE VISITOR!';
    }
}


function updateScore() {
    if (!drawGame) {
        if (curentShape == 'puck') {
            PointsHomeTeam++;
            document.getElementById('home').innerHTML = `${PointsHomeTeam}`;
        } else {
            PointsVisitorTeam++;
            document.getElementById('visitor').innerHTML = `${PointsVisitorTeam}`;
        }
    }
    drawGame = false;
}


function resetScore() {
    PointsHomeTeam = 0;
    PointsVisitorTeam = 0;
    document.getElementById('visitor').innerHTML = `${PointsVisitorTeam}`;
    document.getElementById('home').innerHTML = `${PointsHomeTeam}`;
}


function resetLines() {
    for (let i = 1; i < 9; i++) {
        document.getElementById(`line-${i}`).style.transform = 'scaleX(0)';
    }
}

function resetFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`puck-${i}`).classList.add('d-none');
        document.getElementById(`stick-${i}`).classList.add('d-none');
    }
    fields = [];
}


function playerOneInactive() {
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
}


function playerTwoInactive() {
    document.getElementById('player-1').classList.add('player-inactive');
    document.getElementById('player-2').classList.remove('player-inactive');
}


function playersInactive() {
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.remove('player-inactive');
}