const bird = new Bird();

let update = () => {
    basic.clearScreen();
    bird.update();

    for (const pipe of Pipe.pipes) {
        pipe.update();
    }
}

loops.everyInterval(1, update);
loops.everyInterval(8000, Pipe.spawnPipe);
