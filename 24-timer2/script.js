let mm = 0;
let ss = 0;

let timer;

function startTimer() {
        timer = setInterval(showTime, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function stopTimer() {
    clearInterval(timer);
    mm = 0;
    ss = 0;
    document.getElementById('time').innerHTML = "00:00";
}

function showTime() {
    ss++;

    if (ss == 60) {
        ss = 0;
        mm++;
    }

    let format = (mm < 10 ? '0' + mm : mm) + ":" + (ss < 10 ? '0' + ss : ss);
    document.getElementById('time').innerHTML = format;
}