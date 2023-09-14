const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000001;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    getPosition() {
        return this.ballElem.getBoundingClientRect();
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };

        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const headingTowards = randomNumberBetween(0, 2 * Math.PI);
            this.direction = {
                x: Math.cos(headingTowards),
                y: Math.sin(headingTowards)
            }
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rect = this.getPosition();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1 // flip the direction
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}