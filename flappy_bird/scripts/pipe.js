class Pipe {
    constructor() {
        this.top = random(height / 6, (height * 2) / 3);
        // this.bottom = 100
        this.bottom = height - (this.top + random(50, 100));
        this.x = width;
        this.w = 50;
        this.speed = 3;
        this.scoreCounted = false;
    }

    update() {
        this.x -= this.speed;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    score() {
        if (this.scoreCounted) {
            return false;
        }
        if (this.x < 50 - this.w / 2 && this.scoreCounted === false) {
            this.scoreCounted = true;
            return true;
        }
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {

                fill(255, 0, 0);
                rect(this.x, 0, this.w, this.top);
                rect(this.x, height - this.bottom, this.w, this.bottom);
                // setTimeout(() => {
                //     return true
                // }, 1000);
                return true;
            }
        }
        return false;
    }
}