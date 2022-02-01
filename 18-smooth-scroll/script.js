function goUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showButton() {
    if (window.scrollY === 0) {
        document.querySelector('.scrollButton').style.display = 'none';
    }
    else {
        document.querySelector('.scrollButton').style.display = 'block';
    }
}

window.addEventListener('scroll', showButton);