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
        this.marginX = 2;
        this.marginY = 5;
        this.vel = 2;
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

        this.checkForAllCollision();
        this.draw();

        this.velIncrease += 0.0001;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    checkForAllCollision() {
        if (this.y + this.r > canvas.height) {
            this.y = canvas.height - this.r;
            this.direction.y *= -1; // Reverse vertical velocity on collision
        }

        else if (this.y - this.r < 0) {
            this.y = this.r;
            this.direction.y *= -1;
        }

        if (isCollision(this, playerPaddle) || isCollision(this, computerPaddle)) {
            this.direction.x *= -1;
        }

        if (this.x + this.r >= playerPaddle.x + this.marginX && (this.y + this.r >= playerPaddle.y && this.y + this.r <= playerPaddle.y + this.marginY)) { // if the botttom of the ball is touching the top of the player paddle
            this.x -= playerPaddle.width / 2;
            this.y -= 10;
            this.vel *= -1;
        }

        else if (this.x + this.r >= playerPaddle.x + this.marginX && (this.y - this.r <= playerPaddle.y + playerPaddle.height && this.y - this.r >= (playerPaddle.y + playerPaddle.height) - this.marginY)) { // if the top of the ball is touching the bottom of the player paddle
            this.x -= playerPaddle.width / 2;
            this.y += 10;
            this.vel *= -1;
        }

        else if (this.x - this.r <= (computerPaddle.x + computerPaddle.width) - this.marginX && (this.y + this.r >= computerPaddle.y && this.y + this.r <= computerPaddle.y + this.marginY)) { // if the bottom of the ball is touching the top of the computer paddle
            this.x -= computerPaddle.width / 2;
            this.y -= 10;
            this.vel *= -1;
        }

        else if (this.x - this.r <= (computerPaddle.x + computerPaddle.width) - this.marginX && (this.y - this.r <= computerPaddle.y + computerPaddle.height && this.y - this.r >= (computerPaddle.y + computerPaddle.height) - this.marginY)) { // if the top of the ball is touching the bottom of the computer paddle
            this.x -= computerPaddle.width / 2;
            this.y += 10;
            this.vel *= -1;
        }
    }
}