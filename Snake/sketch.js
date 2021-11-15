let snake;
let scl = 20;
let cols, rows;
let food;
let scoreP;
let highscore, highscoreP;

function setup() {
    createCanvas(600, 600);
    frameRate(10);

    cols = width / scl;
    rows = height / scl;

    snake = new Snake(width, height, scl);

    food = createFood();

    scoreP = createP("");
    scoreP.style("font-size", "32pt");
    scoreP.html(`Score: ${snake.score()}`);

    highscore = 0;
    highscoreP = createP("");
    highscoreP.style("font-size", "32pt");
    highscoreP.html(`High Score: ${highscore}`);
}

function draw() {
    background(0);

    highscore = max(highscore, snake.score());
    highscoreP.html(`High Score: ${highscore}`);
    scoreP.html(`Score: ${snake.score()}`);

    if (snake.dead()) {
        snake.reset();
        food = createFood();
    }

    if (snake.eat(food)) {
        food = createFood();
    }

    showFood();
    snake.show();
    snake.update();
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        snake.dir(0, -1);
    } else if (keyCode == DOWN_ARROW) {
        snake.dir(0, 1);
    } else if (keyCode == LEFT_ARROW) {
        snake.dir(-1, 0);
    } else if (keyCode == RIGHT_ARROW) {
        snake.dir(1, 0);
    }
}

function createFood() {
    return { x: floor(random(cols)) * scl, y: floor(random(rows)) * scl };
}

function showFood() {
    fill(255, 0, 0);
    rect(food.x, food.y, scl, scl);
}

class Snake {
    constructor(_w, _h, _scl) {
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;

        this.w = _w;
        this.h = _h;
        this.scl = _scl;

        this.total = 0;
        this.tail = [];
    }

    show() {
        fill(255, 255, 255);

        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
        }

        rect(this.x, this.y, this.scl, this.scl);
    }

    update() {
        if (this.tail.length < this.total) {
            // If current length of the tail is less than the
            // necessary length of the tail (total).
            // Then we want to add the new position to the tail
            this.tail.push({ x: this.x, y: this.y });
        } else if (this.tail.length > 0 && this.tail.length == this.total) {
            // If current length of the tail is equal to the
            // necessary length of the tail (total).
            // Then we want to remove the oldest part of the tail
            // before we add the newest part of the tail.
            this.tail.shift();
            this.tail.push({ x: this.x, y: this.y });
        }

        this.x += this.xspeed * this.scl;
        this.y += this.yspeed * this.scl;

        // Width wrap around
        if (this.x >= width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width - scl;
        }

        // Height wrap around
        if (this.y >= height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = height - scl;
        }
    }

    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    eat(_food) {
        if (dist(this.x, this.y, _food.x, _food.y) <= 1) {
            this.total++;
            return true;
        }

        return false;
    }

    dead() {
        for (let i = 0; i < this.tail.length; i++) {
            if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) <= 1) {
                return true;
            }
        }

        return false;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;

        this.total = 0;
        this.tail = [];
    }

    score() {
        return this.tail.length;
    }
}
