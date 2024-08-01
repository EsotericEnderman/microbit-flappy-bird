class Pipe {

    public static pipes: Pipe[] = [];

    private readonly squares: Square[];

    public constructor(squares: Square[]) {
        this.squares = squares;

        Pipe.pipes.push(this);
    }

    public update() {
        for (const square of this.squares) {
            if (bird.xLocation === square.x && bird.yLocation === square.y) {
                gameOver();
            }

            square.x -= 1/500;
        }

        this.draw();
    }

    private draw() {
        for (const square of this.squares) {
            const x = Math.round(square.x);
            const y = Math.round(square.y);

            const brightness = led.pointBrightness(x, y);

            if (brightness === 0) {
                led.plot(x, y);
            }
        }
    }
}
