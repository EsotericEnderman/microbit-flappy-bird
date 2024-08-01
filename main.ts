const bird = new Bird();

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
