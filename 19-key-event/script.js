function pressed(e) {
    if (e.keyCode === 13 && e.ctrlKey === true) {
        var text = document.querySelector('#field').value;
        document.getElementById('title').innerHTML = text;
        console.log(text);
    }
}