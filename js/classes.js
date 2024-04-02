class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 50;
        this.velIncrease = 1;
    }

    update() {
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y)); // ensure the paddle stays within the vertical boundaries
        this.draw();
        this.velIncrease += 0.00006;
    }

    compMove(ballY) {
        this.y = this.velIncrease * (ballY - (ball.r * 2))
    }

    playerMove(y) {
        this.y = y - (ball.r * 2);
    }

    draw() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.vel = 4;
        this.velIncrease = 1;
        this.direction = { x: 0 };

        while (Math.abs(this.direction.x) <= .3 || Math.abs(this.direction.x) >= .9) {
            const headingTowards = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {
                x: Math.cos(headingTowards),
                y: Math.sin(headingTowards)
            }
        }
    }

    update() {
        this.x += this.direction.x * this.vel * this.velIncrease;
        this.y += this.direction.y * this.vel * this.velIncrease;

        this.draw();

        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.direction.y *= -1; // Reverse vertical velocity on collision
        }

        if (isCollision(this, playerPaddle) || isCollision(this, computerPaddle)) {
            this.direction.x *= -1;
        }

        this.velIncrease += 0.0001;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}