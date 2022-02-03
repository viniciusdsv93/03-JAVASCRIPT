let timer;

function startTimer() {
    timer = setInterval(showTime, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function showTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let timeNow = h + ":" + m + ":" + s;

    document.querySelector('#time').innerHTML = timeNow;
}