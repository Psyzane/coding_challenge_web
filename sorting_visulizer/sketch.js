let width = 400, height = 400;
let randomValues = [];
let w = 1;

function initValues(min, max) {
    for (let i = 0; i < floor(width/w); i++) {
        randomValues.push(floor(random(min, max)));
    }

}

function drawValues() {
    background(220);
    for (let i = 0; i < randomValues.length; i++) {
        strokeWeight(2);
        line(i*w, 0, i*w, randomValues[i]);
    }
}

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('main__canvas');
    background(220);
    initValues(0, height-10);
    text("Random Values: " + randomValues.join(", "), 10, 20);

}

function draw() {
    drawValues();
}