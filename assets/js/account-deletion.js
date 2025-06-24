function sendMessage() {
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: "d8b0f79d-f295-48ea-bf1e-d372ea765cbf",
            subject: "Account Deletion Request",
            service: document.getElementById('service').value,
            email: document.getElementById('email').value,
        })
    }).then((response) => response.json()).then((data) => {
        console.log(data);
        alert("Your request has been submitted successfully. We will process your account deletion within 2-3 business days.");
    }).catch((error) => {
        console.log(error);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function() {
    const email = document.getElementById('email');
    
    if (!isValidEmail(email.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    sendMessage();
});
