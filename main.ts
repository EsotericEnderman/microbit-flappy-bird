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

function gameOver() {
    update = () => {};

    Pipe.pipes = [];

    basic.showString("GAME OVER");
}

loops.everyInterval(1, update);
loops.everyInterval(8000, Pipe.spawnPipe);
