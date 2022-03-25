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
    if ((delta > 0 && e.deltaY < 0) || (delta < 0 && e.deltaY > 0)) {
        use = false
    } else {
        if (e.deltaY > 0) {
            if (reset == true && delta < e.deltaY) {
                use = false
                reset = false
            }
            if (delta == e.deltaY && e.deltaY > 10) {
                reset = true
            }
        } else {
            if (reset == true && delta > e.deltaY) {
                use = false
                reset = false
            }
            if (delta == e.deltaY && e.deltaY < -10) {
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
        if (elements.length != currentPage + 1 && delta > 50) {
            if (Math.floor(elements[currentPage].scrollTop) == Math.floor(elements[currentPage].scrollHeight - window.innerHeight)) {
                document.removeEventListener('wheel', page)
                use = true
                elements[currentPage].classList.add('top')
                elements[currentPage].classList.remove('view')
                currentPage++
                elements[currentPage].classList.add('view')
                elements[currentPage].classList.remove('bottom')
                setTimeout(function() {
                    document.addEventListener('wheel', page);
                }, 500)
            }
        } else if (currentPage > 0 && delta < -50) {
            if (elements[currentPage].scrollTop == 0) {
                document.removeEventListener('wheel', page)
                use = true
                elements[currentPage].classList.add('bottom')
                elements[currentPage].classList.remove('view')
                currentPage--
                elements[currentPage].classList.add('view')
                elements[currentPage].classList.remove('top')
                setTimeout(function() {
                    document.addEventListener('wheel', page);
                }, 500)
            }
        }
    }
}

//for touch devices
let Y = 0

function touchStart(e) {
    Y = e.changedTouches[0].clientY
}

function touchEnd(e) {
    e.deltaY = Y - e.changedTouches[0].clientY
    page(e)
}

document.addEventListener('wheel', page);
window.addEventListener('touchstart', touchStart);
window.addEventListener('touchend', touchEnd);



if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    }
}

const appHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', appHeight)
appHeight()
