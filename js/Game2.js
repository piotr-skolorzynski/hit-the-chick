import { createGameInfo, createPopupWin, createPopupLost, createSpaceshipContainer } from "./DOMElements.js";
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

    spaceship = null; //referencja do utworzonego statku kosmicznego

    score = 0; //zdobyte punkty

    init = () => {
        createGameInfo(); //utworzenie info o grze na stronie
        this.createEnemies(); //utworzenie wrogów
        createSpaceshipContainer(); //utworzenie kontenera na statek na stronie
        this.createSpaceship(); //utworzenie obiektu statek kosmiczny
        this.controlEnemiesPositionsInPixels(); //monitoruj położenie przeciwników w pixelach
        this.checkProjectilesCollisions(); //monitoruj kolizje pocisków
        // this.checkSpaceshipCollisions(); //monitoruj kolizje statku z jajami 
    }

    createSpaceship = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        const spaceshipContainer = document.querySelector('[data-id="spaceship"]'); //pobranie kontenera statku kosmicznego
        this.spaceship = new Spaceship(spaceshipContainer, gameContainer); // utworzenie statku kosmicznego
        this.spaceship.init(); //inicjalizacja jego życia
    }

    createEnemies = () => {
        const gameContainer = document.querySelector('[data-id="game"]'); //pobranie kontenera całej gry
        //utwórz przeciwnika i zapisz w tablicy
        this.enemiesStartingPositions.map(position => {
            const enemy = new Enemy(gameContainer, position.left, position.top);
            enemy.init();
            this.enemiesArray = [...this.enemiesArray, enemy];
        })
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
    }

    checkProjectilesCollisions = () => {
        this.spaceship.firedProjectilesArray.map ((projectile, projectileIndex, projectilesArray) => {
            this.enemiesPositionsArray.map(enemyPosition => {
                if (projectile.bottom <= enemyPosition.bottom && projectile.left >= enemyPosition.left && projectile.right <= enemyPosition.right) {
                    projectile.removeProjectile();//usuń pocisk z planszy
                    projectilesArray.splice(projectileIndex, 1); //usuń pocisk z tablicy
                    this.enemiesArray.map((enemy, enemyIndex, enemiesArray) => {
                        if (enemy.id === enemyPosition.id) {
                            enemy.isHitted = true; //zmień status bycia trafionym na true 
                            enemiesArray.splice(enemyIndex, 1); //usuń przeciwnika z tablicy
                            this.score += 1;
                            this.updateGameScore();
                        }
                    });
                    this.enemiesPositionsArray = this.enemiesPositionsArray.filter(enemy => enemy.id !== enemyPosition.id)
                }
            })
        })
        requestAnimationFrame(this.checkProjectilesCollisions);
    }

    updateGameScore = () => {
        const gameScore = document.querySelector('[data-id="score"]');
        gameScore.innerHTML = `${this.score}`;
    }

    checkSpaceshipCollisions = () => {
        const spaceshipOnGameboard = document.querySelector('[data-id="spaceship"]');
        const spaceshipLeft = spaceshipOnGameboard.offsetLeft;
        const spaceshipTop = spaceshipOnGameboard.offsetTop;
        const spaceshipInnerWidth = spaceshipOnGameboard.offsetWidth;
        const spaceshipInnerHeight = spaceshipOnGameboard.offsetHeight;

        // console.log(spaceshipLeft, spaceshipTop, spaceshipInnerWidth, spaceshipInnerHeight);
        this.enemiesArray.map(enemy => {
            enemy.firedEggsArray.map((egg, index) => {
                console.log('jajko', index)
            })
        })

        requestAnimationFrame(this.checkSpaceshipCollisions);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});