import { createGameInfo, createPopup, createSpaceshipContainer } from "./DOMElements.js";
import { Spaceship } from "./Spaceship2.js";


class Game {
    htmlElements = {}

    init = () => {
        createGameInfo(); //utworzenie info o grze na stronie
        createSpaceshipContainer(); //utworzenie kontenera na statek na stronie
        this.createSpaceship(); //utworzenie obiektu i odpalenie metody init()
    }

    createSpaceship = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        const spaceshipContainer = document.querySelector('[data-id="spaceship"]'); //pobranie kontenera statku kosmicznego
        const spaceship = new Spaceship(spaceshipContainer, gameContainer); // utworzenie statku kosmicznego
        spaceship.init(); //inicjalizacja jego życia
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});