'use strict';

function readyScroll() {
    window.scrollTo(0, document.body.scrollHeight);
    document.body.style.overflow = 'hidden';
}

function getCoordY(elem) {
    let box = elem.getBoundingClientRect();
    return box.top + pageYOffset;
}

function levelScroll() {
    let lvl = document.getElementById('firstlvl');
    window.scrollTo(0, getCoordY(lvl));
}

function addClick(elementId, func) {
    let elem = document.getElementById(elementId);
    elem.addEventListener('click', func);
}

document.addEventListener('DOMContentLoaded', readyScroll);

addClick('js-play', levelScroll);
addClick('js-back', readyScroll);

let timeCounter = document.getElementById('js-time'),
    timeCounterBlock = timeCounter.parentElement,
    bgCloud = document.getElementById('js-cloud'),
    bgStar = document.getElementById('js-star');

function clearField() {
    let timer = 2,
        timerId = setInterval(function() {
            if (timer < 0) {
                clearInterval(timerId);
                timeCounterBlock.style.display = 'none';
            }
            timeCounter.innerHTML = timer;
            timer--;
        }, 700);
    let cloudOpacity = 0.8,
        cloudTimerId = setInterval(function() {
            if (cloudOpacity < 0) clearInterval(cloudTimerId);
            bgCloud.style.opacity = cloudOpacity;
            cloudOpacity -= 0.2;
        }, 6000);
}
clearField();
bgStar.classList.add('star--active');
