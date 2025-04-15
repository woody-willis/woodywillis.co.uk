function closeForm() {
    form.style.animation = 'close_form 0.4s cubic-bezier(1,0,.87,.92) forwards';
    setTimeout(() => {
        form.style.display = 'none';
    }, 400);

    setTimeout(() => {
        thankyou.style.display = 'flex';
        thankyou.style.animation = 'open_form 0.4s ease-in-out forwards';
    }, 500);
}

function sendMessage() {
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: "d8b0f79d-f295-48ea-bf1e-d372ea765cbf",
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            subject: "New Message from woodywillis.co.uk"
        })
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const submitButton = document.getElementById('submit');
const form = document.getElementById('form');
const thankyou = document.getElementById('thankyou');

submitButton.addEventListener('click', function() {
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value == '') {
        name.classList.add('invalid');
        valid = false;
    } else {
        name.classList.remove('invalid');
    }

    if (email.value == '' || !isValidEmail(email.value)) {
        email.classList.add('invalid');
        valid = false;
    } else {
        email.classList.remove('invalid');
    }

    if (message.value == '') {
        message.classList.add('invalid');
        valid = false;
    } else {
        message.classList.remove('invalid');
    }

    if (valid) {
        sendMessage();
        closeForm();
    }
});
