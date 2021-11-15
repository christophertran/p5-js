let scores = {
    X: 1,
    O: -1,
    tie: 0,
};

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

let w;
let h;

let ai = "X";
let human = "O";
let currentPlayer = human;

function setup() {
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;

    nextTurn();
}

function equals3(a, b, c) {
    return a == b && b == c && a == c && a != "";
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return "tie";
    } else {
        return winner;
    }
}

function mousePressed() {
    if (currentPlayer == human) {
        // Human make turn
        let r = floor(mouseX / w);
        let c = floor(mouseY / h);

        // If valid turn
        if (board[r][c] == "") {
            board[r][c] = human;
            currentPlayer = ai;
            nextTurn();
        }
    }
}

function draw() {
    background(255);
    strokeWeight(4);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let x = w * r + w / 2;
            let y = h * c + h / 2;
            let spot = board[r][c];

            let xr = w / 4;

            if (spot == human) {
                noFill();
                ellipse(x, y, xr * 2);
            } else if (spot == ai) {
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
        }
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP("");
        resultP.style("font-size", "32pt");
        if (result == "tie") {
            resultP.html("Tie!");
        } else {
            resultP.html(`${result} wins!`);
        }
    }
}

function nextTurn() {
    // AI to make its turn
    let bestScore = -Infinity;
    let bestMove = null;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            // Is the spot available?
            if (board[r][c] == "") {
                board[r][c] = ai;
                let score = minimax(board, 0, false);
                board[r][c] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { r, c };
                }
            }
        }
    }
    board[bestMove.r][bestMove.c] = ai;
    currentPlayer = human;
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinner();

    if (result != null) {
        return scores[result];
    }

    let bestScore;

    if (isMaximizing) {
        bestScore = -Infinity;
    } else {
        bestScore = Infinity;
    }

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] == "") {
                if (isMaximizing) {
                    board[r][c] = ai;
                    bestScore = max(bestScore, minimax(board, depth + 1, false));
                } else {
                    board[r][c] = human;
                    bestScore = min(bestScore, minimax(board, depth + 1, true));
                }
                board[r][c] = "";
            }
        }
    }
    return bestScore;
}
