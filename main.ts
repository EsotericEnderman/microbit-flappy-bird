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

    let indexToRemove = Math.floor(Math.random() * squareLocations.length);
    let direction = Math.random() >= 0.5 ? 1 : -1;
    let squaresToRemove = 1 + Math.floor(Math.random() * 4);

    while (squaresToRemove != 0 && indexToRemove >= 0 && indexToRemove < squareLocations.length) {
        indexToRemove+=direction;
        squareLocations.splice(indexToRemove, 1);

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
