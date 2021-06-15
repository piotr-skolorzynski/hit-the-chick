const spaceShip = document.querySelector('.spaceship');

console.log(spaceShip);

const controlSpaceship = e => {
    console.log(`${e.code}`);

    if (e.code === 'ArrowRight') {
        spaceShip.style.left = 75 + '%';
    } else if (e.code === 'ArrowLeft') {
        spaceShip.style.left = 25 + '%';
    }

};

document.addEventListener('keyup', controlSpaceship);


    /* const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => b === 0 ? 'Nie można dzielić przez zero' : a / b,
        '*': (a, b) => a * b,
    }
    return (operations[operator] || (() => 'Nie znany operator'))(num1, num2); */