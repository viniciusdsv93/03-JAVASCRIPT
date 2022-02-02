function changeColor(color) {
    clean();
    document.getElementById('title').classList.add(color);
}

function clean() {
    document.getElementById('title').classList.remove('red');
    document.getElementById('title').classList.remove('blue');
    document.getElementById('title').classList.remove('green');
}