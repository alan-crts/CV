let currentPage = 0
let use = false
let delta = 0
let T
let reset = false

function scroll_bellow() {
    var elements = document.getElementsByClassName('part')
    if (elements.length != currentPage + 1) {
        if (!(elements[currentPage].scrollTop == elements[currentPage].scrollHeight - window.innerHeight)) {
            elements[currentPage].scrollTo(0, elements[currentPage].scrollHeight)
        }
        elements[currentPage].classList.add('top')
        elements[currentPage].classList.remove('view')
        currentPage++
        elements[currentPage].classList.add('view')
        elements[currentPage].classList.remove('bottom')
    }
}

function page(e) {
    console.log(e.deltaY)
    if ((delta > 0 && e.deltaY < 0) || (delta < 0 && e.deltaY > 0)) {
        use = false
    } else {
        if (e.deltaY > 0) {
            if (reset == true && delta < e.deltaY) {
                use = false
                reset = false
                console.log('scroll')
            }
            if (delta == e.deltaY && e.deltaY > 10) {
                console.log('reset')
                reset = true
            }
        } else {
            if (reset == true && delta > e.deltaY) {
                use = false
                reset = false
                console.log('scroll')
            }
            if (delta == e.deltaY && e.deltaY < -10) {
                console.log('reset')
                reset = true
            }
        }
    }
    delta = e.deltaY
    clearTimeout(T)
    T = setTimeout(function() {
        use = false
    }, 100)
    if (use == false) {
        var elements = document.getElementsByClassName('part')
        if (elements.length != currentPage + 1 && delta > 10) {
            document.removeEventListener('wheel', page)
            use = true
            if (elements[currentPage].scrollTop == elements[currentPage].scrollHeight - window.innerHeight) {
                elements[currentPage].classList.add('top')
                elements[currentPage].classList.remove('view')
                currentPage++
                elements[currentPage].classList.add('view')
                elements[currentPage].classList.remove('bottom')
                setTimeout(function() {
                    document.addEventListener('wheel', page);
                }, 1000)
            }
        } else if (currentPage > 0 && delta < -10) {
            document.removeEventListener('wheel', page)
            use = true
            if (elements[currentPage].scrollTop == 0) {
                elements[currentPage].classList.add('bottom')
                elements[currentPage].classList.remove('view')
                currentPage--
                elements[currentPage].classList.add('view')
                elements[currentPage].classList.remove('top')
                setTimeout(function() {
                    document.addEventListener('wheel', page);
                }, 1000)
            }
        }
    }
}

let lastY = 0

function phone(e) {
    if (lastY != 0) {
        e.deltaY = e.pageY - lastY
    }
    lastY = e.pageY
    page(e)
}

document.addEventListener('wheel', page);
document.addEventListener('touchmove', phone);

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    }
}
