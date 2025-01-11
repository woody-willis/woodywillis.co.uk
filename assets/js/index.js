document.ondragstart = function() { return false; }

const nameText = 'Hello, I\'m Woody';
const nameElement = document.getElementById('anim-typewriter-name');
const bioElement = document.getElementById('bio');

(async () => {
    for (let i = 0; i < nameText.length; i++) {
        await new Promise((resolve) => {
            setTimeout(() => {
                nameElement.innerHTML += nameText[i];
                resolve();
            }, Math.random() * 50 + 50);
        });
    }

    bioElement.style.animation = 'fadeIn 1s ease-in-out forwards';
})();