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

    public static spawnPipe() {
        const squareLocations = [new Square(4, 0), new Square(4, 1), new Square(4, 2), new Square(4, 3), new Square(4, 4)];

        let indexToRemove = Math.floor(Math.random() * squareLocations.length);
        let direction = Math.random() >= 0.5 ? 1 : -1;
        let squaresToRemove = 1 + Math.floor(Math.random() * 4);

        while (squaresToRemove != 0 && indexToRemove >= 0 && indexToRemove < squareLocations.length) {
            indexToRemove+=direction;
            squareLocations.splice(indexToRemove, 1);

            squaresToRemove--;
        }

        new Pipe(squareLocations);
    }
}
