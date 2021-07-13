//uchwycenie kontenera w którym będzie toczyła się gra
const gameContainer = document.querySelector('[data-id="game"]');

//wrzucenie do kontenera info o grze tzn. punkty i życia
export const createGameInfo = () => {
    const html = `<section class="information">
                        <div class="information__content">Score: 0</div>
                        <div class="information__content">Lives: 3</div>
                </section>`;
    gameContainer.innerHTML = html;
};

//stworzenie popup-a w celu umożliwienia nowej gry
export const createPopup = () => {
    const div = document.createElement('div');
    div.classList.add('popup');
    const html = `<div class="popup__content">
                        <p class="popup__text">
                            You have lost! Try again!
                        </p>
                        <button class="popup__btn">New Game</button>
                </div>`;
    div.innerHTML = html;
    gameContainer.append(div);
};

export const createSpaceshipContainer = () => {
    const div = document.createElement('div');
    div.classList.add('spaceship');
    div.setAttribute('data-id', 'spaceship');
    gameContainer.append(div);
};