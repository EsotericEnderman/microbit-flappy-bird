class Bird {

    private readonly gravity = -4.0;

    private verticalVelocity = 0;

    private x = 1;
    private y = 2;

    get xLocation() {
        return this.x
    }

    get yLocation() {
        return this.y;
    }

    public constructor() {
        input.onButtonPressed(Button.A, () => bird.jump());
        input.onButtonPressed(Button.B, () => bird.dive());
    }

    public update() {
        this.verticalVelocity += this.gravity * 1 / 1000;
        this.y -= this.verticalVelocity * 1 / 1000;

        this.draw();

        if (this.y > maxY || this.y < minY) {
            gameOver();
        }
    }

    public jump() {
        this.verticalVelocity = 5.0;
    }

    public dive() {
        this.verticalVelocity = -5.0;
    }

    private draw() {
        led.plot(this.x, this.y);
    }
}
