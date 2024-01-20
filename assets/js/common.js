document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.navbar__hamburger').addEventListener('click', function() {
        document.querySelector('.navbar__links').classList.toggle('show');
    });
});