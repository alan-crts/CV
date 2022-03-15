function checkVisible(elm) {
    let rect = elm.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function scroll_bellow() {
    let parts = document.getElementsByClassName('part')
    for (let element in parts) {
        if (checkVisible(parts[element]) && parts[element].nextElementSibling != null) return parts[element].nextElementSibling.scrollIntoView({ behavior: 'smooth' });
    }
}


function disabledButton() {
    if (checkVisible(document.getElementsByClassName('part')[document.getElementsByClassName('part').length - 1])) document.getElementById('scroll_down').classList.add('disabled')
    else document.getElementById('scroll_down').classList.remove('disabled')
}

window.onload = function() {
    disabledButton()
}

document.onscroll = function() {
    disabledButton()
}