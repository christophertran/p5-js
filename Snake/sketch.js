let snake;
let scl = 20;
let cols, rows;
let food;

function setup() {
    createCanvas(600, 600);
    frameRate(10);

    cols = width / scl;
    rows = height / scl;

    snake = new Snake(width, height, scl);

    food = createFood();
}

function draw() {
    background(0);

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
        this.x = constrain(this.x, 0, this.w - this.scl);
        this.y = constrain(this.y, 0, this.h - this.scl);
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
        // let head;
        // if (this.tail.length > 0) {
        //     let end = this.tail.length - 1;
        //     head = { x: this.tail[end].x, y: this.tail[end].y };
        // } else {
        //     head = { x: this.x, y: this.y };
        // }

        // if (head.x == 0 || head.x == width || head.y == 0 || head.y == length) {
        // }

        // for (let i = 0; i < this.tail.length; i++) {
        //     if (dist(head.x, head.y, this.tail[i].x, this.tail[i].y) <= 1) {
        //         return true;
        //     }
        // }

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
}
