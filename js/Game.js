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
        // console.log(this.enemies)
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
                //odległość od górnej krawędzi pocisku
                top: projectile.element.offsetTop,
                //odległość do lewej krawędzi pocisku
                left: projectile.element.offsetLeft,
                //odległość od prawej krawędzi pocisku
                right: (projectile.element.offsetLeft + projectile.element.offsetWidth),
                //odległość dolnej krawędzi pocisku od górnej krawędzi planszy
                bottom: (projectile.element.offsetTop + projectile.element.offsetHeight)
            }
            // console.log(projectilePosition);

            //jeśli dolna krawędź pocisku przekroczyła górną krawędź planszy usuń pocisk, wyczyść jego interwał
            if (projectilePosition.bottom < 0) {
                projectile.removeProjectile();
                projectileArray.splice(projectileIndex, 1);
            }

            //sprawdź dla każdego przeciwnika czy jego położenie zgadza się z położeniem pocisku
            this.enemies.forEach((enemy, enemyIndex, enemyArr) => {

            //odległości kontenera na wrogów od krawędzi przeglądarki niezbędne do porównań położenia przeciwnika i pocisku

            const allenemiesContainerPosition = {
                top: this.htmlElements.allenemies.offsetTop,
                left: this.htmlElements.allenemies.offsetLeft,
            }
            
            // console.log(allenemiesContainerPosition)

            // położenie każdego z przeciwników
                const enemyPosition = {
                    top: enemy.element.offsetTop + allenemiesContainerPosition.top,
                    left: enemy.element.offsetLeft + allenemiesContainerPosition.left,
                    right: enemy.element.offsetLeft + enemy.element.offsetWidth + allenemiesContainerPosition.left,
                    bottom: enemy.element.offsetHeight + enemy.element.offsetTop + allenemiesContainerPosition.top
                }
                // console.log(enemyPosition);
                if (projectilePosition.top <= enemyPosition.bottom && projectilePosition.left >= enemyPosition.left && projectilePosition.right <= enemyPosition.right) {
                    console.log(`bang! trafiłeś przeciwnika o id ${enemy.dataset}`)
                }
            })

            //sprawdź co jest z położeniem przeciwników, zacznij od jednego

        });
    }
    //metoda tworząca przeciwników na rozpoczęcie gry
    createEnemies = () => {
        for (let i = 0; i < this.enemyCounter; i+=1) {
            let enemyId = this.genrateID(0, 1000000)
            const enemy = new Enemy(this.htmlElements.allenemies, enemyId);
            enemy.init();
            this.enemies.push(enemy);
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
