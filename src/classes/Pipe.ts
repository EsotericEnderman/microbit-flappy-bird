class Pipe {

    public static pipes: Pipe[] = [];

    private static spawnIntervalMilliseconds = 8000;

    private readonly squares: Square[];

    private pipeSize = 0.1;
    private velocity = -1 / 500;

    public constructor(squares: Square[]) {
        this.squares = squares;

        Pipe.pipes.push(this);
    }

    public update() {
        if (bird.isGameOver) {
            return;
        }

        for (const square of this.squares) {
            if (Math.abs(bird.xLocation - square.x) < this.pipeSize && Math.abs(bird.yLocation - square.y) < this.pipeSize) {
                bird.gameOver();
            }

            square.x += this.velocity;
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
        loops.everyInterval(Pipe.spawnIntervalMilliseconds, () => Pipe.spawnPipe());
    }

    public static spawnPipe() {
        const pipeXLocations = 4;

        const squareLocations = [];
        for (let y = minY; y <= maxY; y++) {
            squareLocations.push(new Square(pipeXLocations, y));
        }

        let indexToRemove = 1 + Math.floor(Math.random() * (squareLocations.length - 2));
        let direction = Math.random() >= 0.5 ? 1 : -1;
        let squaresToRemove = 2 + Math.floor(Math.random() * 3);

        while (squaresToRemove != 0 && indexToRemove >= 0 && indexToRemove < squareLocations.length) {
            indexToRemove += direction;
            squareLocations.splice(indexToRemove, 1);

            squaresToRemove--;
        }

        new Pipe(squareLocations);
    }
}
