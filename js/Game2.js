import { createGameInfo, createPopup } from "./DOMElements.js";


class Game {
    htmlElements = {

    }

    init() {
        createGameInfo();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});