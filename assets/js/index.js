function createTrain() {
    let train = document.createElement('img');
    train.src = '/assets/img/train.png';
    train.classList.add('train');

    const direction = Math.random() > 0.5 ? 'normal' : 'reverse';

    let top = Math.floor(Math.random() * 60)-10 + '%';
    let newTop = trainsTop.length !== 0;
    while (newTop) {
        if (trainsTop.includes(top)) {
            top = Math.floor(Math.random() * 60)-10 + '%';
            continue;
        }

        for (const trainTop of trainsTop) {
            if (top < trainTop + 15 && top > trainTop - 15) {
                top = Math.floor(Math.random() * 60)-10 + '%';
                newTop = true;
                break;
            } else {
                newTop = false;
            }
        }
    }

    train.style.top = top;

    const time = Math.round(Math.random() * 15) + 5;
    train.style.animation = "train_" + direction + " " + time + "s linear infinite";

    setTimeout(() => {
        document.querySelector('.content').appendChild(train);
        trainsTop.push(top);
    }, Math.random() * 1000);

    setTimeout(() => {
        train.remove();
        trainsTop.splice(trainsTop.indexOf(top), 1);
        createTrain();
    }, time * 2000);
}

const trainsTop = [];
const MAX_TRAINS = 4;

document.addEventListener('DOMContentLoaded', function() {
    // Animate /assets/img/train.png at random Y and randomly left or right and random speeds
    for (let i = 0; i < MAX_TRAINS; i++) {
        createTrain();
    }
});