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
    //metoda inicjalizująca życie gry
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
