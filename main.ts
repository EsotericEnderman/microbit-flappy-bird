const bird = new Bird();

Pipe.beginSpawningPipes();

const update = () => {
    if (bird.isGameOver) {
        return;
    }

    basic.clearScreen();

    bird.update();

    for (const pipe of Pipe.pipes) {
        pipe.update();
    }
}

loops.everyInterval(1, update);
