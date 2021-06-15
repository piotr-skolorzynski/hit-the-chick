//klasa Spaceship wyrażająca nasz statek kosmiczny
import { Spaceship } from './Spaceship.js';

// klasa game ma tworzyć obiekt, który będzie zarządzał całą rozgrywką
class Game {
    //kolekcja pobieranych elementów
    htmlElements = {
        spaceship: document.querySelector('[data-spaceship]')
    }
    //statek kosmiczny na bazie klasy Spaceship, argument div reprezentujący statek kosmiczny
    ship = new Spaceship(this.htmlElements.spaceship);
    //metoda inicjalizująca życie na stronie
    init() {
        //uruchamia metodę klasy spaceship
        this.ship.init();
    }
}

//uruchom grę po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});




// const spaceShip = document.querySelector('.spaceship');

// console.log(spaceShip);

// const controlSpaceship = e => {
//     console.log(`${e.code}`);

//     if (e.code === 'ArrowRight') {
//         spaceShip.style.left = 75 + '%';
//     } else if (e.code === 'ArrowLeft') {
//         spaceShip.style.left = 25 + '%';
//     }

// };

// document.addEventListener('keyup', controlSpaceship);


//     /* const operations = {
//         '+': (a, b) => a + b,
//         '-': (a, b) => a - b,
//         '/': (a, b) => b === 0 ? 'Nie można dzielić przez zero' : a / b,
//         '*': (a, b) => a * b,
//     }
//     return (operations[operator] || (() => 'Nie znany operator'))(num1, num2); */