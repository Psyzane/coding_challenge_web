let width = 400, height = 400;
let randomValues = [];
let step = 0;
let speed = 1;
let w = 10; // Width of each bar

// BUTTON SELECTION
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    });
    buttons.forEach(b => b.classList.remove('selected'));
});
buttons[0].classList.add('selected');
buttons[0].addEventListener('click', () => {
    step = 0;
    initValues(0, height - 10);
    drawValues();
});

// INITIALIZE RANDOM VALUES
function initValues(min, max) {
    for (let i = 0; i < floor(width / w); i++) {
        randomValues.push(floor(random(min, max)));
    }
}

// DRAW VALUES ON CANVAS
function drawValues() {
    colorMode(RGB);
    background(24,49,83);
    for (let i = 0; i < randomValues.length; i++) {
        stroke(195, 56, 232);
        strokeWeight(2);
        fill(116, 192, 232);
        rect(i * w, height - randomValues[i], w, randomValues[i]);
        // line(i*w, height, i*w, randomValues[i]);
    }
}

// SETUP FUNCTION
function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('main__canvas');
    initValues(0, height - 10);
    drawValues();
    noLoop();
}

// TOGGLE LOOPING
const start_btn = document.querySelector('.start__sort');
start_btn.addEventListener('click', () => {
    if (isLooping()) {
        noLoop();
        start_btn.textContent = 'Start Sorting';
    } else {
        loop();
        start_btn.textContent = 'Stop Sorting';
    }
});


function draw() {
    background('red');

    if (buttons[0].classList.contains('selected')) {
        BubbleSort(step);
    } else {
        noLoop();
    }
}

function BubbleSort(j) {
    if (randomValues[j] > randomValues[j + 1]) {
        let temp = randomValues[j];
        randomValues[j] = randomValues[j + 1];
        randomValues[j + 1] = temp;
    }
    drawValues();
    step++;
    if (step >= randomValues.length - 1) {
        step = 0;
    }
}