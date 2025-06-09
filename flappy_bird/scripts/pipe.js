class Pipe {
    constructor() {
        this.top = random(height / 6, (height * 2) / 3);
        this.bottom = height - (this.top + random(50, 100));
        this.x = width;
        this.w = 50;
        this.speed = 3;
        console.log(`Pipe created: top=${this.top}, bottom=${this.bottom}, x=${this.x}`);
    }

    update() {
        this.x -= this.speed;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }
}