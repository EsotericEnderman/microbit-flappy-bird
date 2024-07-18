const maxX = 4;
const maxY = 4;

const minX = 0;
const minY = 0;

class Square {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Bird {

    private readonly gravity = -8.0;

    private verticalVelocity = 0;

    private x = 1;
    private y = 2;

    get xLocation() {
        return this.x
    }

    get yLocation() {
        return this.y;
    }

    public constructor() { }

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

const bird = new Bird();

input.onButtonPressed(Button.A, () => bird.jump());
input.onButtonPressed(Button.B, () => bird.dive());

let update = () => {
    basic.clearScreen();
    bird.update();

    for (const pipe of Pipe.pipes) {
        pipe.update();
    }
}

let spawnPipe = () => {
    const squareLocations: Square[] = [new Square(4, 0), new Square(4, 1), new Square(4, 2), new Square(4, 3), new Square(4, 4)];

    let squaresToRemove = 1 + Math.floor(Math.random() * 4);

    while (squaresToRemove != 0) {
        const squareToRemoveIndex = Math.floor(Math.random() * squareLocations.length);
        squareLocations.splice(squareToRemoveIndex, 1);

        squaresToRemove--;
    }

    const pipe = new Pipe(squareLocations);
}

function gameOver() {
    update = () => {};
    spawnPipe = () => {};

    Pipe.pipes = [];

    basic.showString("GAME OVER");
}

loops.everyInterval(1, update);
loops.everyInterval(8000, spawnPipe);
