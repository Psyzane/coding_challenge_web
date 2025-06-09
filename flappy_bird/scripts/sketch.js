let bird;
let pipes = [];
let score = 0;
let gameOver = false;
let pause = false;

function newGame() {
    bird = new Bird();
    pipes = [];
    score = 0;
    gameOver = false;
    pause = true;
}

function setup() {
    createCanvas((400, 600));
    frameRate(60);
    newGame();
}

function draw() {
    background(0);
    GameLoop();
}

function GameLoop() {

    if (!gameOver) {
        bird.show();
        if (pause) {
            fill(255);
            textSize(32);
            textAlign(CENTER);
            text('Press space to start', width / 2, height / 2);
            return;
        }

        bird.update();

        // Add new pipes
        if (frameCount % 75 === 0) {
            pipes.push(new Pipe());
        }

        // Update and show pipes
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            pipes[i].show();

            // Check for collision
            if (pipes[i].hits(bird)) {
                gameOver = true;
            }

            // Remove off-screen pipes and increase score
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
                score++;
            }
        }

        // Display score
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text(`Score: ${score}`, width / 2, 50);
    } else {
        fill(255, 0, 0);
        textSize(64);
        textAlign(CENTER);
        text('Game Over', width / 2, height / 2 - 20);
        textSize(32);
        text(`Final Score: ${score}`, width / 2, height / 2 + 30);

        textSize(32);
        text(`Tap 'space' to restart`, width / 2, height * 0.80 + 30);
    }
}

function keyPressed() {
    if (key === ' ') {
        if (gameOver) {
            newGame();
        } else if (pause) {
            pause = false;
        } else {
            bird.flap();
        }
    }
}