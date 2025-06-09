class Bird {
    constructor() {
        this.x = 50;
        this.y = height / 2;
        this.size = 32;
        this.gravity = 0.4;
        this.lift = -6;
        this.velocity = 0;
    }

    show() {
        fill(255, 204, 0);
        ellipse(this.x, this.y, this.size);
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Prevent bird from going off the top of the screen
        if (this.y < this.size / 2) {
            this.y = this.size / 2;
            this.velocity = 0;
        }

        // Prevent bird from going off the bottom of the screen
        if (this.y > height - this.size / 2) {
            this.y = height - this.size / 2;
            this.velocity = 0;
        }
    }

    flap() {
        this.velocity = this.lift;
    }
}