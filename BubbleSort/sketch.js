let values = [];
let i = 0;
let j = 0;

function setup() {
    createCanvas(600, 400);

    values = new Array(width);

    for (let i = 0; i < values.length; i++) {
        values[i] = noise(i/100.0) * height;
    }
}

function draw() {
    background(0);

    for (let i = 0; i < values.length; i++) {
        stroke(255);
        line(i, height, i, height - values[i]);
    }

	if (i < values.length) {
		for (let j = 0; j < values.length - i - 1; j++) {
			if (values[j] > values[j + 1]) {
				[values[j], values[j + 1]] = [values[j + 1], values[j]];
			}
		}
		i++;
	} else {
		noLoop();
	}
}
