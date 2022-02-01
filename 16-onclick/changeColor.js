function changeColor() {
    if (document.querySelector('#btn').classList.contains('green')) {
        document.querySelector('#btn').classList.remove('green');
        document.querySelector('#btn').classList.add('blue');
    }
    
    else {
        document.querySelector('#btn').classList.remove('blue');
        document.querySelector('#btn').classList.add('green');
    }
}