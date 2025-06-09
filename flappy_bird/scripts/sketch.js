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

function mousePressed() {

    if (mouseY > height * 0.46 + 100 && mouseY < height * 0.46 + 100 + r_tbn.height &&
        mouseX > width / 2 - r_tbn.width / 2 && mouseX < width / 2 + r_tbn.width / 2) {
        newGame();
        return;
    }

    if (gameOver) {
        // newGame();
    } else if (pause) {
        pause = false;
    } else {
        bird.flap();
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
    scoreBoard.resize(0, 180);
    image(scoreBoard, width / 2 - scoreBoard.width/2, height * 0.30, scoreBoard.width, scoreBoard.height);

    r_tbn.resize(0, 40);
    image(r_tbn, width / 2 - r_tbn.width / 2, height * 0.46 + 100, r_tbn.width, r_tbn.height);

    fill(255, 0, 0);
    textAlign(CENTER);
    
    push();
    textFont('assets/ka1.ttf');
    fill(0);
    textSize(30);
    text(`${score}`, width / 2, height / 2 - 50);
    pop();
    
    textSize(20);
    text(`Press 'SPACE' to Restart` , width/2, Number(3.8*height/5));
    
}