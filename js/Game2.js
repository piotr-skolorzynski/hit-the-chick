import { createGameInfo, createPopup, createSpaceshipContainer } from "./DOMElements.js";
import { Spaceship } from "./Spaceship2.js";
import { Enemy } from "./Enemy2.js";


class Game {

    init = () => {
        createGameInfo(); //utworzenie info o grze na stronie
        createSpaceshipContainer(); //utworzenie kontenera na statek na stronie
        this.createSpaceship(); //utworzenie obiektu statek kosmiczny
        this.createEnemies(); //utworzenie wrogów
    }

    createSpaceship = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        const spaceshipContainer = document.querySelector('[data-id="spaceship"]'); //pobranie kontenera statku kosmicznego
        const spaceship = new Spaceship(spaceshipContainer, gameContainer); // utworzenie statku kosmicznego
        spaceship.init(); //inicjalizacja jego życia
    }

    createEnemies = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        const enemy = new Enemy(gameContainer);
        enemy.init();
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});