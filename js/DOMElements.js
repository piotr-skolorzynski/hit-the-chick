//uchwycenie kontenera w którym będzie toczyła się gra
const gameContainer = document.querySelector('[data-id="game"]');

//wrzucenie do kontenera info o grze tzn. punkty i życia
export const createGameInfo = () => {
    const html = `<section class="information">
                        <div class="information__content">Score: <span data-id="score">0</span></div>
                        <div class="information__content">Lives: <span data-id="lives">3</span></div>
                </section>`;
    gameContainer.innerHTML = html;
};

//stworzenie popup-a po przegraniu
export const createPopupLost = score => {
    const div = document.createElement('div');
    div.classList.add('popup');
    const html = `<div class="popup__content">
                        <p class="popup__text">
                            You have lost! Your score is: ${score} Try again!
                        </p>
                        <button class="popup__btn">New Game</button>
                </div>`;
    div.innerHTML = html;
    gameContainer.append(div);
};

//stworzenie popup-a po przegraniu
export const createPopupWin = () => {
    const div = document.createElement('div');
    div.classList.add('popup');
    const html = `<div class="popup__content">
                        <p class="popup__text">
                            You have won! Try again!
                        </p>
                        <button class="popup__btn">New Game</button>
                </div>`;
    div.innerHTML = html;
    gameContainer.append(div);
};

//stworzenie kontenera na statek kosmiczny na planszy
export const createSpaceshipContainer = () => {
    const div = document.createElement('div');
    div.classList.add('spaceship');
    div.setAttribute('data-id', 'spaceship');
    gameContainer.append(div);
};

//generator liczb pseudolosowych, dla id przewidziałem wykorzystanie wartości domyślnych
export const generateNumber = (min=0, max=1000000) => {
        return Math.floor(Math.random() * (max - min) + min);
    }