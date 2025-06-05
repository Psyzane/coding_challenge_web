let grid;
let rows, cols, w = 5;
let hueValue = 1;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0); // Initialize all cells to 0
    }
    return arr;
}

function withinCols(i) {
    return i >= 0 && i < cols;
}

function withinRows(j) {
    return j >= 0 && j < rows;
}

function setup() {
    createCanvas(400, 400);
    colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
}

function mousePressed() {
    let i = Math.floor(mouseX / w);
    let j = Math.floor(mouseY / w);
    if (withinCols(i) && withinRows(j)) {
        grid[i][j] = hueValue;
    }
    hueValue = (hueValue + 0.3) % 360;
}

function mouseDragged() {
    let c = Math.floor(mouseX / w);
    let r = Math.floor(mouseY / w);
    let matrix = 5, extent = floor(matrix / 2);
    
    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            if (random(1) < 0.75) {
                let col = c + i;
                let row = r + j;
                if (withinCols(col) && withinRows(row)) {
                    grid[col][row] = hueValue;
                }
            }
        }
    }

    hueValue = (hueValue + 0.3) % 360;
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] > 0) {
                fill(grid[i][j], 255, 255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    // let nextGrid = grid.map(arr => [...arr]); // Deep copy of grid
    let nextGrid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            if (state > 0) {
                let dir = floor(random(-2, 3)); // Allow broader horizontal spread

                if (j + 1 < rows) { // Check bounds for row
                    let below = grid[i][j + 1];
                    let belowL = (withinCols(i - dir) && j + 1 < rows) ? grid[i - dir][j + 1] : -1;
                    let belowR = (withinCols(i + dir) && j + 1 < rows) ? grid[i + dir][j + 1] : -1;

                    if (below === 0) {
                        nextGrid[i][j + 1] = state;
                    } else if (belowL === 0) {
                        nextGrid[i - dir][j + 1] = state;
                    } else if (belowR === 0) {
                        nextGrid[i + dir][j + 1] = state;
                    } else {
                        nextGrid[i][j] = state;
                    }
                } else {
                    nextGrid[i][j] = state; // Prevent particles from disappearing at the bottom
                }
            }
        }
    }

    grid = nextGrid; // Apply the updated grid
}

let btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", () => {
    console.log(grid);
});
