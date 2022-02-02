function showMenu() {
    // if (document.getElementById('menu-area').classList.contains('menu-opened')) {
    //     document.getElementById('menu-area').classList.remove('menu-opened');
    // }
    // else {
    //     document.getElementById('menu-area').classList.add('menu-opened');
    // }
    
    if (document.getElementById('menu-area').style.width == '200px') {
        document.getElementById('menu-area').style.width = '0px';
    } else {
        document.getElementById('menu-area').style.width = '200px';
    }
}