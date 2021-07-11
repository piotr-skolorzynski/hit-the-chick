class Game {
    htmlElements = {

    }


    init() {
        console.log(`żyję ;)`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});