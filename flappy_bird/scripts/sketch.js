let bird;
let pipes = [];
let score = 0;
let gameOver = false;
let pause = false;
let bg, ground, scoreBoard, r_tbn

function preload() {
    bg = loadImage('assets/background.png');
    ground = loadImage('assets/floor.png');
    scoreBoard = loadImage('assets/scoreboard.png');
    scoreBoard.resize(0, 200);
    r_tbn = loadImage('assets/restart_button.png');
}

function newGame() {
    bird = new Bird();
    pipes = [];
    score = 0;
    gameOver = false;
    pause = true;
}

function setup() {
    createCanvas(400, 600);
    frameRate(60);
    newGame();
}

function draw() {
    background(0);
    movingBG();
    GameLoop();
    gameOverScreen();
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

        pipelogic();

        // Display score
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text(`${score}`, width / 2, 40);
    } else {
        gameOverScreen();
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

function pipelogic() {
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
            console.log('Game Over');
        }

        if (pipes[i].score()) {
            score++;
        }

        // Remove off-screen pipes and increase score
        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }
}


let bgX = 0;
function movingBG() {
    // Draw the background image
    image(bg, 0 - bgX, 0, width, height);
    image(bg, width - bgX, 0, width, height);

    // Draw the ground image
    image(ground, 0 - bgX, height - 75, width, 75);
    image(ground, width - bgX, height - 75, width, 75);

    // Reset background position
    if (bgX >= width) {
        bgX = 0;
    }
    bgX += 2;
}

function gameOverScreen() {
    image(scoreBoard, width / 2 - 2 * scoreBoard.width, height * 0.30, scoreBoard.width * 4, scoreBoard.height * 4);
    image(r_tbn, width / 2 - r_tbn.width, height * 0.46 + 100, r_tbn.width * 2, r_tbn.height * 2);

    fill(255, 0, 0);
    textSize(64);
    textAlign(CENTER);
    textSize(32);

    textFont('assets/press-start-2p.ttf');
    text(`${score}`, width / 2, height / 2 - 50);

}