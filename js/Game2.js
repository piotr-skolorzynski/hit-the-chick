import { createGameInfo, createPopup, createSpaceshipContainer } from "./DOMElements.js";
import { Spaceship } from "./Spaceship2.js";
import { Enemy } from "./Enemy2.js";


class Game {
    enemiesStartingPositions = [
        {left: 15, top: 15}, {left: 25, top: 15}, {left: 35, top: 15}, {left: 45, top: 15}, {left: 55, top: 15},
        {left: 20, top: 25}, {left: 30, top: 25}, {left: 40, top: 25}, {left: 50, top: 25}, 
        {left: 15, top: 35}, {left: 25, top: 35}, {left: 35, top: 35}, {left: 45, top: 35}, {left: 55, top: 35}
    ]

    enemiesArray = []; //tablica przeciwników

    enemiesPositionsArray = []; //tablica aktualnego położenia przeciwników w pikselach

    init = () => {
        createGameInfo(); //utworzenie info o grze na stronie
        createSpaceshipContainer(); //utworzenie kontenera na statek na stronie
        this.createSpaceship(); //utworzenie obiektu statek kosmiczny
        this.createEnemies(); //utworzenie wrogów
        this.controlEnemiesPositionsInPixels(); //monitoruj położenie przeciwników w pixelach
        console.log(this.enemiesPositionsArray)
    }

    createSpaceship = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        const spaceshipContainer = document.querySelector('[data-id="spaceship"]'); //pobranie kontenera statku kosmicznego
        const spaceship = new Spaceship(spaceshipContainer, gameContainer); // utworzenie statku kosmicznego
        spaceship.init(); //inicjalizacja jego życia
        // setInterval(() => {
        //     console.log(spaceship.firedProjectilesArray)
        // }, 1000);
    }

    createEnemies = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        //utwórz przeciwnika i zapisz w tablicy
        this.enemiesStartingPositions.map(position => {
            const enemy = new Enemy(gameContainer, position.left, position.top);
            enemy.init();
            this.enemiesArray = [...this.enemiesArray, enemy];
        })
        //skonwertuj odległości przeciwnika na mapie z procentów na pixele
        console.log(this.enemiesArray)
    }

    controlEnemiesPositionsInPixels = () => {
        this.enemiesArray.map(enemy => {
            const enemyOnGameboard = document.querySelector(`[data-id="${enemy.id}"]`)
            const enemyPosition = {
                id: enemy.id,
                top: enemyOnGameboard.offsetTop,
                left: enemyOnGameboard.offsetLeft,
                right: enemyOnGameboard.offsetLeft + enemyOnGameboard.offsetWidth,
                bottom: enemyOnGameboard.offsetTop + enemyOnGameboard.offsetHeight
            }
            this.enemiesPositionsArray = [...this.enemiesPositionsArray, enemyPosition];
        })
        requestAnimationFrame(this.controlEnemiesPositionsInPixels);
    }

    // checkProjectilesColisions = () => {
        
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});