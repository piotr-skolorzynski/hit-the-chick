import { createGameInfo, createPopup, createSpaceshipContainer } from "./DOMElements.js";
import { Spaceship } from "./Spaceship2.js";


class Game {
    htmlElements = {
        //uchwycenie kontenera reprezentującego statek kosmiczny na stronie
        spaceship_container: document.querySelector('[data-spaceship]'),
    }

    init = () => {
        createGameInfo();
        createSpaceshipContainer();
        this.createSpaceship();
    }

    createSpaceship = () => {
        const gameContainer = document.querySelector('[data-id="game"]');
        const spaceship = new Spaceship(this.htmlElements.spaceship_container, gameContainer);
        spaceship.init(); 
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});