import { createGameInfo, createPopup, createSpaceshipContainer } from "./DOMElements.js";
import { Spaceship } from "./Spaceship2.js";
import { Enemy } from "./Enemy2.js";


class Game {
    storedEnemiesPosition = []; //tablica na położenie każdego z wygenerowanych przeciwników

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

    showFiredProjectiles = () => {
        console.log(spaceship.firedProjectilesArray)
        requestAnimationFrame(this.showFiredProjectiles)
    }

    createEnemies = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        const enemy = new Enemy(gameContainer, 30, 30);
        enemy.init();
        const enemyPosition = enemy.getEnemyPosition();
        this.storedEnemiesPosition = [...this.storedEnemiesPosition, enemyPosition];
        const enemy2 = new Enemy(gameContainer, 60, 30);
        enemy2.init();
        const enemy2Position = enemy2.getEnemyPosition();
        this.storedEnemiesPosition = [...this.storedEnemiesPosition, enemy2Position];
        console.log(this.storedEnemiesPosition)
        
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});