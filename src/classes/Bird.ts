class Bird {

    private readonly gravity = -4.0;

    private verticalVelocity = 0;

    private jumpVelocity = 5;
    private diveVelocity = -5;

    private x = 1;
    private y = 2;

    public isGameOver = false;

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

        if (this.y > maxY + 2 || this.y < minY - 2) {
            this.gameOver();
        }
    }

    public jump() {
        this.verticalVelocity = this.jumpVelocity;
    }

    public dive() {
        this.verticalVelocity = this.diveVelocity;
    }

    public gameOver() {
        this.isGameOver = true;

        Pipe.pipes = [];

        basic.showString("GAME OVER");
    }

    private draw() {
        led.plot(this.x, this.y);
    }
}
