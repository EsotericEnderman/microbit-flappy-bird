class Pipe {

    public static pipes: Pipe[] = [];

    private readonly squares: Square[];

    public constructor(squares: Square[]) {
        this.squares = squares;

        Pipe.pipes.push(this);
    }

    public update() {
        if (bird.isGameOver) {
            return;
        }

        for (const square of this.squares) {
            if (Math.abs(bird.xLocation - square.x) < 0.1 && Math.abs(bird.yLocation - square.y) < 0.1) {
                bird.gameOver();
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

    public static beginSpawningPipes() {
        loops.everyInterval(8000, () => Pipe.spawnPipe());
    }

    public static spawnPipe() {
        const squareLocations = [new Square(4, 0), new Square(4, 1), new Square(4, 2), new Square(4, 3), new Square(4, 4)];

        let indexToRemove = 1 + Math.floor(Math.random() * (squareLocations.length - 2));
        let direction = Math.random() >= 0.5 ? 1 : -1;
        let squaresToRemove = 2 + Math.floor(Math.random() * 3);

        while (squaresToRemove != 0 && indexToRemove >= 0 && indexToRemove < squareLocations.length) {
            indexToRemove+=direction;
            squareLocations.splice(indexToRemove, 1);

            squaresToRemove--;
        }

        new Pipe(squareLocations);
    }
}
