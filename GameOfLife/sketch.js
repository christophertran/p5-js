function make2DArray(rows, cols) {
    let arr = new Array(rows);

    for (let r = 0; r < rows; r++) {
        arr[r] = new Array(cols);
    }

    return arr;
}

function checkNeighbors(grid, r, c) {
    m = grid.length;
    n = grid[0].length;

    let sum = 0;
    let directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    for (const direction of directions) {
        let x = r + direction[0];
        let y = c + direction[1];

        if (0 <= x && x < m && 0 <= y && y < n) {
            sum += grid[x][y];
        }
    }

    return sum;
}

let grid;
let resolution = 5;

function setup() {
    createCanvas(600, 600);

    rows = width / resolution;
    cols = height / resolution;

    grid = make2DArray(rows, cols);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            grid[r][c] = floor(random(2));
        }
    }
}

function draw() {
    background(0);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let x = r * resolution;
            let y = c * resolution;

            if (grid[r][c] == 1) {
                fill(255);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next = make2DArray(rows, cols);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let neighbors = checkNeighbors(grid, r, c);
            let state = grid[r][c];

            if (state == 0 && neighbors == 3) {
                state = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                state = 0;
            }

            next[r][c] = state;
        }
    }

    grid = next;
}
