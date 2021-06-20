//klasa Spaceship wyrażająca nasz statek kosmiczny
import { Spaceship } from './Spaceship.js';
//klasa Enemy wyrażająca przeciwnika
import { Enemy } from './Enemy.js';

// klasa game ma tworzyć obiekt, który będzie zarządzał całą rozgrywką
class Game {
    //kolekcja pobieranych elementów
    htmlElements = {
        //uchwycenie statku kosmicznego
        spaceship: document.querySelector('[data-spaceship]'),
        //uchwycenie div-a container, w którm mieści się cała gra
        container: document.querySelector('[data-container]'),
        //uchwycenie rodzica na przeciwników
        allenemies: document.querySelector('[data-enemies]')
    }
    //statek kosmiczny na bazie klasy Spaceship, argument div reprezentujący statek kosmiczny oraz cały container potrzebny do monitorowania przemieszczających się przeciwników
    ship = new Spaceship(this.htmlElements.spaceship, this.htmlElements.container);
    //kontroler interwału dla metody clearUselessProjectiles
    controlGameParametersInterval = null; 
    //liczba wrogów do wygenerowania
    enemyCounter = 25;
    //tablica gromadząca wszystkich przeciwników
    enemies = [];
    //metoda inicjalizująca życie gry
    init = () => {
        //uruchamia metodę klasy spaceship
        this.ship.init();
        //uruchom metodę monitorującą parametry
        this.controlGameParameters();
        //utwórz przeciwników
        this.createEnemies();
    }
    //interwał sprawdzający cyklicznie parametry gry, na tąchwilę tylko czyści zbędne pociski
    controlGameParameters = () => {
        this.controlGameParametersInterval = setInterval(() => this.checkPosition(), 1); //Pamiętaj o zrobieniu czyszczenia interwału na zakończenie gry
    }
    //metoda kontrolująca położenie każdego wystrzelonego pocisku i jego usunięcie z tablicy jeśli przekroczy górną krawędź planszy
    checkPosition = () => {
        //odwołanie do tablicy przechowującej pociski
        this.ship.projectiles.forEach((projectile, projectileIndex, projectileArray) => {   
            const projectilePosition = {
                //odległość dolnej krawędzi pocisku od górnej krawędzi planszy 
                bottom: projectile.element.offsetTop
            }
            //jeśli dolna krawędź pocisku przekroczyła górną krawędź planszy usuń pocisk, wyczyść jego interwał
            if (projectilePosition.bottom < 0) {
                projectile.removeProjectile();
                projectileArray.splice(projectileIndex, 1);
            }
        });
    }
    //metoda tworząca przeciwników na rozpoczęcie gry
    createEnemies = () => {
        for (let i = 0; i < this.enemyCounter; i+=1) {
            let enemyId = this.genrateID(0, 1000000)
            const enemy = new Enemy(this.htmlElements.allenemies, enemyId);
            enemy.init();
            this.enemies.push(this.enemy);
        }
    }

    //generator id
    genrateID(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

//uruchom grę po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});
