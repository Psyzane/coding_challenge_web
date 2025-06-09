let bubbles = [];

function setup() {
    createCanvas(400, 400);
    background(220);
    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(1, 2);
        let b = new Bubble(x, y, r);
        bubbles.push(b);
    }
}

function draw() {
    // let x = random(width);
    // let y = random(height);
    // let r = random(1, 2);
    // let b = new Bubble(x, y, r);
    // bubbles.push(b);

    for (let bubble of bubbles) {
        for (let other of bubbles) {
            if (bubble !== other && !bubble.checkCollision(other)) {
                bubble.grow();
            }
            bubble.display();
        }
        noLoop();
    }
}

class Bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    grow() {
        this.r += 0.5;
    }

    checkCollision(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < (this.r + other.r + 2);
    }

    display() {
        fill(100, 150, 255, 150);
        ellipse(this.x, this.y, this.r * 2);
    }
}