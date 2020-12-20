// global let
let body = document.querySelector('body');
let btns = document.querySelectorAll('.control__item');
let frames = document.querySelectorAll('.page-container__frame');
let gameFrame = document.querySelector('.game');

let wrapBirds = document.querySelector('.game__birds');
let bird = document.querySelector('.game__bird');
let birdMain = document.querySelector('.game__main-bird');

let timerElem = document.querySelector('.game__timer');
let timerSpanL = timerElem.querySelector('.game__timer-l');
let timerSpanR = timerElem.querySelector('.game__timer-r');

let finishFrame = document.querySelector('.finish');
let finishItemTotal = finishFrame.querySelector('.finish__item_total .finish__item_r');
let finishItemValid = finishFrame.querySelector('.finish__item_valid .finish__item_r');
let finishItemInvalid = finishFrame.querySelector('.finish__item_invalid .finish__item_r');
let finishItemSpeed = finishFrame.querySelector('.finish__item_speed .finish__item_r');
let finishItemPercent = finishFrame.querySelector('.finish__item_percent .finish__item_r');

let isGame = false;
let countDownElem = document.querySelector('.game__countdown');

let directionArr = ['left', 'top', 'right', 'bottom'];

// static
let validValue = 0;
let invalidValue = 0;
// static

// global let

$(document).ready(function () {



    // controls
    keyboard();
    buttons();
    swipe();

    document.querySelectorAll('.js-start-game').forEach(current=>{
        current.addEventListener('click', startGame);
    });

});
function buttons() {
    
    btns.forEach(current=>{
        current.addEventListener('click', function(){
            checkDirection(current.dataset.direction);
        });
    });

}
function checkDirection(direction) {

    if(!isGame) return;

    document.querySelector(`.control__${direction}`).classList.add('control_active');

    if(direction === birdMain.dataset.direction) {
        body.classList.add('body_success');
        validValue++;
        setTimeout(()=>{
            body.classList.remove('body_success');
            document.querySelector(`.control__${direction}`).classList.remove('control_active');
        }, 100);
    } else {
        body.classList.add('body_fail');
        invalidValue++;
        setTimeout(()=>{
            body.classList.remove('body_fail');
            document.querySelector(`.control__${direction}`).classList.remove('control_active');
        }, 100);
        
    }
    
    generateDirection();

}
function finishGame() {

    isGame = false;

    finishFrame.style.zIndex = 2;
    gsap.to(finishFrame, {
        opacity: 1,
        duration: 0.4,
        onComplete: function(){
            hideZIndex();
            finishFrame.style.zIndex = 1;
        }
    });

    finishItemTotal.textContent = validValue + invalidValue;
    finishItemValid.textContent = validValue;
    finishItemInvalid.textContent = invalidValue;
    finishItemSpeed.textContent = ((validValue + invalidValue) / 60).toFixed(1) + ' в секунду';
    finishItemPercent.textContent = ((validValue * 100) / (validValue + invalidValue)).toFixed(1) + '%';

    hideZIndex();

}
function generateDirection() {

    let directionCurrent = rand(1, directionArr.length);
    let directionMainBird = rand(1, directionArr.length);

    wrapBirds.classList.remove('game__birds_left', 'game__birds_top', 'game__birds_right', 'game__birds_bottom');
    birdMain.classList.remove('game__main-bird_right', 'game__main-bird_left', 'game__main-bird_top', 'game__main-bird_bottom');

    if(directionArr[directionCurrent-1] == 'left') {
        wrapBirds.classList.add(`game__birds_left`);
    } else if(directionArr[directionCurrent-1] == 'top') {
        wrapBirds.classList.add(`game__birds_top`);
    } else if(directionArr[directionCurrent-1] == 'right') {
        wrapBirds.classList.add(`game__birds_right`);
    } else if(directionArr[directionCurrent-1] == 'bottom') {
        wrapBirds.classList.add(`game__birds_bottom`);
    }

    if(directionArr[directionMainBird-1] == 'left') {
        birdMain.classList.add(`game__main-bird_left`);
        birdMain.dataset.direction = 'left';
    } else if(directionArr[directionMainBird-1] == 'top') {
        birdMain.classList.add(`game__main-bird_top`);
        birdMain.dataset.direction = 'top';
    } else if(directionArr[directionMainBird-1] == 'right') {
        birdMain.classList.add(`game__main-bird_right`);
        birdMain.dataset.direction = 'right';
    } else if(directionArr[directionMainBird-1] == 'bottom') {
        birdMain.classList.add(`game__main-bird_bottom`);
        birdMain.dataset.direction = 'bottom';
    }

}
function hideZIndex() {
    frames.forEach(current => {
        current.style.zIndex = -1;
    });
}
function keyboard() {
    window.addEventListener('keydown', function(e){
        let direction = e.code === 'ArrowLeft' ? 'left' :
                        e.code === 'ArrowUp' ? 'top' :
                        e.code === 'ArrowRight' ? 'right' :
                        e.code === 'ArrowDown' ? 'bottom' : '';
        if(direction) checkDirection(direction);
    });
}
function rand(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
function reset() {

    // reset let
    validValue = 0;
    invalidValue = 0;

    // reset countdown
    countDownElem.textContent = 3;
    gsap.to(countDownElem, { opacity: 1 });

    // hidden all frame
    hideZIndex();

    wrapBirds.classList.remove('game__birds_left', 'game__birds_top', 'game__birds_right', 'game__birds_bottom');
    birdMain.classList.remove('game__main-bird_right', 'game__main-bird_left', 'game__main-bird_top', 'game__main-bird_bottom');

    // reset timer
    timerSpanR.classList.remove('game__timer-r_red');
    timerSpanL.textContent = '01';
    timerSpanR.textContent = '00';


}
async function startCountdown() {

    await gsap.to(countDownElem, { duration: 1 });
    countDownElem.textContent = 2;

    await gsap.to(countDownElem, { duration: 1 });
    countDownElem.textContent = 1;

    await gsap.to(countDownElem, { duration: 1 });
    
    gsap.to(countDownElem, {
        duration: 0.05,
        opacity: 0,
        onComplete: function(){
            countDownElem.style.zIndex = -1;
            generateDirection();
            timer();
            isGame = true;
        } 
    });

}
function startGame() {
    
    reset();

    gameFrame.style.zIndex = 1,
    
    gsap.to(gameFrame, {
        opacity: 1,
        duration: 0.4,
        onComplete: startCountdown
    });

}
function swipe() {
    $("body").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction === 'up') direction = 'top';
            if(direction === 'down') direction = 'bottom';
            checkDirection(direction);
        }
    });
}
function timer() {

    let time = 60;

    function timerInner() {

        if(time === 60) {
            timerSpanR.textContent = '00';
        } else if(time < 60) {
            timerSpanL.textContent = '00';
            if(time >= 10) {
                timerSpanR.textContent = time;
            } else {
                timerSpanR.classList.add('game__timer-r_red');
                timerSpanR.textContent = '0' + time;
            }
        }
        
        if(time === 0) { 
            clearInterval(timerInnerInterval);
            finishGame();
        }
        time--;

    }

    timerInner();

    let timerInnerInterval = setInterval(timerInner, 1000);

}
function vhModule() {

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // headerHeightFun();
    });

}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJ1dHRvbnMuanMiLCJjaGVja0RpcmVjdGlvbi5qcyIsImZpbmlzaEdhbWUuanMiLCJnZW5lcmF0ZURpcmVjdGlvbi5qcyIsImhpZGVaSW5kZXguanMiLCJrZXlib2FyZC5qcyIsInJhbmQuanMiLCJyZXNldC5qcyIsInN0YXJ0Q291bnRkb3duLmpzIiwic3RhcnRHYW1lLmpzIiwic3dpcGUuanMiLCJ0aW1lci5qcyIsInZoTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZ2xvYmFsIGxldFxubGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5sZXQgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250cm9sX19pdGVtJyk7XG5sZXQgZnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2UtY29udGFpbmVyX19mcmFtZScpO1xubGV0IGdhbWVGcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lJyk7XG5cbmxldCB3cmFwQmlyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fYmlyZHMnKTtcbmxldCBiaXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX2JpcmQnKTtcbmxldCBiaXJkTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19tYWluLWJpcmQnKTtcblxubGV0IHRpbWVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX190aW1lcicpO1xubGV0IHRpbWVyU3BhbkwgPSB0aW1lckVsZW0ucXVlcnlTZWxlY3RvcignLmdhbWVfX3RpbWVyLWwnKTtcbmxldCB0aW1lclNwYW5SID0gdGltZXJFbGVtLnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX190aW1lci1yJyk7XG5cbmxldCBmaW5pc2hGcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maW5pc2gnKTtcbmxldCBmaW5pc2hJdGVtVG90YWwgPSBmaW5pc2hGcmFtZS5xdWVyeVNlbGVjdG9yKCcuZmluaXNoX19pdGVtX3RvdGFsIC5maW5pc2hfX2l0ZW1fcicpO1xubGV0IGZpbmlzaEl0ZW1WYWxpZCA9IGZpbmlzaEZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5maW5pc2hfX2l0ZW1fdmFsaWQgLmZpbmlzaF9faXRlbV9yJyk7XG5sZXQgZmluaXNoSXRlbUludmFsaWQgPSBmaW5pc2hGcmFtZS5xdWVyeVNlbGVjdG9yKCcuZmluaXNoX19pdGVtX2ludmFsaWQgLmZpbmlzaF9faXRlbV9yJyk7XG5sZXQgZmluaXNoSXRlbVNwZWVkID0gZmluaXNoRnJhbWUucXVlcnlTZWxlY3RvcignLmZpbmlzaF9faXRlbV9zcGVlZCAuZmluaXNoX19pdGVtX3InKTtcbmxldCBmaW5pc2hJdGVtUGVyY2VudCA9IGZpbmlzaEZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5maW5pc2hfX2l0ZW1fcGVyY2VudCAuZmluaXNoX19pdGVtX3InKTtcblxubGV0IGlzR2FtZSA9IGZhbHNlO1xubGV0IGNvdW50RG93bkVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fY291bnRkb3duJyk7XG5cbmxldCBkaXJlY3Rpb25BcnIgPSBbJ2xlZnQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbSddO1xuXG4vLyBzdGF0aWNcbmxldCB2YWxpZFZhbHVlID0gMDtcbmxldCBpbnZhbGlkVmFsdWUgPSAwO1xuLy8gc3RhdGljXG5cbi8vIGdsb2JhbCBsZXRcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG5cblxuICAgIC8vIGNvbnRyb2xzXG4gICAga2V5Ym9hcmQoKTtcbiAgICBidXR0b25zKCk7XG4gICAgc3dpcGUoKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zdGFydC1nYW1lJykuZm9yRWFjaChjdXJyZW50PT57XG4gICAgICAgIGN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuICAgIH0pO1xuXG59KTsiLCJmdW5jdGlvbiBidXR0b25zKCkge1xyXG4gICAgXHJcbiAgICBidG5zLmZvckVhY2goY3VycmVudD0+e1xyXG4gICAgICAgIGN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjaGVja0RpcmVjdGlvbihjdXJyZW50LmRhdGFzZXQuZGlyZWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSIsImZ1bmN0aW9uIGNoZWNrRGlyZWN0aW9uKGRpcmVjdGlvbikge1xyXG5cclxuICAgIGlmKCFpc0dhbWUpIHJldHVybjtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbF9fJHtkaXJlY3Rpb259YCkuY2xhc3NMaXN0LmFkZCgnY29udHJvbF9hY3RpdmUnKTtcclxuXHJcbiAgICBpZihkaXJlY3Rpb24gPT09IGJpcmRNYWluLmRhdGFzZXQuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdib2R5X3N1Y2Nlc3MnKTtcclxuICAgICAgICB2YWxpZFZhbHVlKys7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHlfc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29udHJvbF9fJHtkaXJlY3Rpb259YCkuY2xhc3NMaXN0LnJlbW92ZSgnY29udHJvbF9hY3RpdmUnKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2JvZHlfZmFpbCcpO1xyXG4gICAgICAgIGludmFsaWRWYWx1ZSsrO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdib2R5X2ZhaWwnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvbnRyb2xfXyR7ZGlyZWN0aW9ufWApLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xfYWN0aXZlJyk7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb24oKTtcclxuXHJcbn0iLCJmdW5jdGlvbiBmaW5pc2hHYW1lKCkge1xyXG5cclxuICAgIGlzR2FtZSA9IGZhbHNlO1xyXG5cclxuICAgIGZpbmlzaEZyYW1lLnN0eWxlLnpJbmRleCA9IDI7XHJcbiAgICBnc2FwLnRvKGZpbmlzaEZyYW1lLCB7XHJcbiAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICBkdXJhdGlvbjogMC40LFxyXG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGhpZGVaSW5kZXgoKTtcclxuICAgICAgICAgICAgZmluaXNoRnJhbWUuc3R5bGUuekluZGV4ID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmaW5pc2hJdGVtVG90YWwudGV4dENvbnRlbnQgPSB2YWxpZFZhbHVlICsgaW52YWxpZFZhbHVlO1xyXG4gICAgZmluaXNoSXRlbVZhbGlkLnRleHRDb250ZW50ID0gdmFsaWRWYWx1ZTtcclxuICAgIGZpbmlzaEl0ZW1JbnZhbGlkLnRleHRDb250ZW50ID0gaW52YWxpZFZhbHVlO1xyXG4gICAgZmluaXNoSXRlbVNwZWVkLnRleHRDb250ZW50ID0gKCh2YWxpZFZhbHVlICsgaW52YWxpZFZhbHVlKSAvIDYwKS50b0ZpeGVkKDEpICsgJyDQsiDRgdC10LrRg9C90LTRgyc7XHJcbiAgICBmaW5pc2hJdGVtUGVyY2VudC50ZXh0Q29udGVudCA9ICgodmFsaWRWYWx1ZSAqIDEwMCkgLyAodmFsaWRWYWx1ZSArIGludmFsaWRWYWx1ZSkpLnRvRml4ZWQoMSkgKyAnJSc7XHJcblxyXG4gICAgaGlkZVpJbmRleCgpO1xyXG5cclxufSIsImZ1bmN0aW9uIGdlbmVyYXRlRGlyZWN0aW9uKCkge1xyXG5cclxuICAgIGxldCBkaXJlY3Rpb25DdXJyZW50ID0gcmFuZCgxLCBkaXJlY3Rpb25BcnIubGVuZ3RoKTtcclxuICAgIGxldCBkaXJlY3Rpb25NYWluQmlyZCA9IHJhbmQoMSwgZGlyZWN0aW9uQXJyLmxlbmd0aCk7XHJcblxyXG4gICAgd3JhcEJpcmRzLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbWVfX2JpcmRzX2xlZnQnLCAnZ2FtZV9fYmlyZHNfdG9wJywgJ2dhbWVfX2JpcmRzX3JpZ2h0JywgJ2dhbWVfX2JpcmRzX2JvdHRvbScpO1xyXG4gICAgYmlyZE1haW4uY2xhc3NMaXN0LnJlbW92ZSgnZ2FtZV9fbWFpbi1iaXJkX3JpZ2h0JywgJ2dhbWVfX21haW4tYmlyZF9sZWZ0JywgJ2dhbWVfX21haW4tYmlyZF90b3AnLCAnZ2FtZV9fbWFpbi1iaXJkX2JvdHRvbScpO1xyXG5cclxuICAgIGlmKGRpcmVjdGlvbkFycltkaXJlY3Rpb25DdXJyZW50LTFdID09ICdsZWZ0Jykge1xyXG4gICAgICAgIHdyYXBCaXJkcy5jbGFzc0xpc3QuYWRkKGBnYW1lX19iaXJkc19sZWZ0YCk7XHJcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uQXJyW2RpcmVjdGlvbkN1cnJlbnQtMV0gPT0gJ3RvcCcpIHtcclxuICAgICAgICB3cmFwQmlyZHMuY2xhc3NMaXN0LmFkZChgZ2FtZV9fYmlyZHNfdG9wYCk7XHJcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uQXJyW2RpcmVjdGlvbkN1cnJlbnQtMV0gPT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgIHdyYXBCaXJkcy5jbGFzc0xpc3QuYWRkKGBnYW1lX19iaXJkc19yaWdodGApO1xyXG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvbkFycltkaXJlY3Rpb25DdXJyZW50LTFdID09ICdib3R0b20nKSB7XHJcbiAgICAgICAgd3JhcEJpcmRzLmNsYXNzTGlzdC5hZGQoYGdhbWVfX2JpcmRzX2JvdHRvbWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGRpcmVjdGlvbkFycltkaXJlY3Rpb25NYWluQmlyZC0xXSA9PSAnbGVmdCcpIHtcclxuICAgICAgICBiaXJkTWFpbi5jbGFzc0xpc3QuYWRkKGBnYW1lX19tYWluLWJpcmRfbGVmdGApO1xyXG4gICAgICAgIGJpcmRNYWluLmRhdGFzZXQuZGlyZWN0aW9uID0gJ2xlZnQnO1xyXG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvbkFycltkaXJlY3Rpb25NYWluQmlyZC0xXSA9PSAndG9wJykge1xyXG4gICAgICAgIGJpcmRNYWluLmNsYXNzTGlzdC5hZGQoYGdhbWVfX21haW4tYmlyZF90b3BgKTtcclxuICAgICAgICBiaXJkTWFpbi5kYXRhc2V0LmRpcmVjdGlvbiA9ICd0b3AnO1xyXG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvbkFycltkaXJlY3Rpb25NYWluQmlyZC0xXSA9PSAncmlnaHQnKSB7XHJcbiAgICAgICAgYmlyZE1haW4uY2xhc3NMaXN0LmFkZChgZ2FtZV9fbWFpbi1iaXJkX3JpZ2h0YCk7XHJcbiAgICAgICAgYmlyZE1haW4uZGF0YXNldC5kaXJlY3Rpb24gPSAncmlnaHQnO1xyXG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvbkFycltkaXJlY3Rpb25NYWluQmlyZC0xXSA9PSAnYm90dG9tJykge1xyXG4gICAgICAgIGJpcmRNYWluLmNsYXNzTGlzdC5hZGQoYGdhbWVfX21haW4tYmlyZF9ib3R0b21gKTtcclxuICAgICAgICBiaXJkTWFpbi5kYXRhc2V0LmRpcmVjdGlvbiA9ICdib3R0b20nO1xyXG4gICAgfVxyXG5cclxufSIsImZ1bmN0aW9uIGhpZGVaSW5kZXgoKSB7XHJcbiAgICBmcmFtZXMuZm9yRWFjaChjdXJyZW50ID0+IHtcclxuICAgICAgICBjdXJyZW50LnN0eWxlLnpJbmRleCA9IC0xO1xyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBrZXlib2FyZCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGUuY29kZSA9PT0gJ0Fycm93TGVmdCcgPyAnbGVmdCcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmNvZGUgPT09ICdBcnJvd1VwJyA/ICd0b3AnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5jb2RlID09PSAnQXJyb3dSaWdodCcgPyAncmlnaHQnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5jb2RlID09PSAnQXJyb3dEb3duJyA/ICdib3R0b20nIDogJyc7XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uKSBjaGVja0RpcmVjdGlvbihkaXJlY3Rpb24pO1xyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiByYW5kKG1pbiwgbWF4KSB7XHJcbiAgICBsZXQgcmFuZCA9IG1pbiAtIDAuNSArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSk7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChyYW5kKTtcclxufSIsImZ1bmN0aW9uIHJlc2V0KCkge1xyXG5cclxuICAgIC8vIHJlc2V0IGxldFxyXG4gICAgdmFsaWRWYWx1ZSA9IDA7XHJcbiAgICBpbnZhbGlkVmFsdWUgPSAwO1xyXG5cclxuICAgIC8vIHJlc2V0IGNvdW50ZG93blxyXG4gICAgY291bnREb3duRWxlbS50ZXh0Q29udGVudCA9IDM7XHJcbiAgICBnc2FwLnRvKGNvdW50RG93bkVsZW0sIHsgb3BhY2l0eTogMSB9KTtcclxuXHJcbiAgICAvLyBoaWRkZW4gYWxsIGZyYW1lXHJcbiAgICBoaWRlWkluZGV4KCk7XHJcblxyXG4gICAgd3JhcEJpcmRzLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbWVfX2JpcmRzX2xlZnQnLCAnZ2FtZV9fYmlyZHNfdG9wJywgJ2dhbWVfX2JpcmRzX3JpZ2h0JywgJ2dhbWVfX2JpcmRzX2JvdHRvbScpO1xyXG4gICAgYmlyZE1haW4uY2xhc3NMaXN0LnJlbW92ZSgnZ2FtZV9fbWFpbi1iaXJkX3JpZ2h0JywgJ2dhbWVfX21haW4tYmlyZF9sZWZ0JywgJ2dhbWVfX21haW4tYmlyZF90b3AnLCAnZ2FtZV9fbWFpbi1iaXJkX2JvdHRvbScpO1xyXG5cclxuICAgIC8vIHJlc2V0IHRpbWVyXHJcbiAgICB0aW1lclNwYW5SLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbWVfX3RpbWVyLXJfcmVkJyk7XHJcbiAgICB0aW1lclNwYW5MLnRleHRDb250ZW50ID0gJzAxJztcclxuICAgIHRpbWVyU3BhblIudGV4dENvbnRlbnQgPSAnMDAnO1xyXG5cclxuXHJcbn0iLCJhc3luYyBmdW5jdGlvbiBzdGFydENvdW50ZG93bigpIHtcclxuXHJcbiAgICBhd2FpdCBnc2FwLnRvKGNvdW50RG93bkVsZW0sIHsgZHVyYXRpb246IDEgfSk7XHJcbiAgICBjb3VudERvd25FbGVtLnRleHRDb250ZW50ID0gMjtcclxuXHJcbiAgICBhd2FpdCBnc2FwLnRvKGNvdW50RG93bkVsZW0sIHsgZHVyYXRpb246IDEgfSk7XHJcbiAgICBjb3VudERvd25FbGVtLnRleHRDb250ZW50ID0gMTtcclxuXHJcbiAgICBhd2FpdCBnc2FwLnRvKGNvdW50RG93bkVsZW0sIHsgZHVyYXRpb246IDEgfSk7XHJcbiAgICBcclxuICAgIGdzYXAudG8oY291bnREb3duRWxlbSwge1xyXG4gICAgICAgIGR1cmF0aW9uOiAwLjA1LFxyXG4gICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY291bnREb3duRWxlbS5zdHlsZS56SW5kZXggPSAtMTtcclxuICAgICAgICAgICAgZ2VuZXJhdGVEaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGltZXIoKTtcclxuICAgICAgICAgICAgaXNHYW1lID0gdHJ1ZTtcclxuICAgICAgICB9IFxyXG4gICAgfSk7XHJcblxyXG59IiwiZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xyXG4gICAgXHJcbiAgICByZXNldCgpO1xyXG5cclxuICAgIGdhbWVGcmFtZS5zdHlsZS56SW5kZXggPSAxLFxyXG4gICAgXHJcbiAgICBnc2FwLnRvKGdhbWVGcmFtZSwge1xyXG4gICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgZHVyYXRpb246IDAuNCxcclxuICAgICAgICBvbkNvbXBsZXRlOiBzdGFydENvdW50ZG93blxyXG4gICAgfSk7XHJcblxyXG59IiwiZnVuY3Rpb24gc3dpcGUoKSB7XHJcbiAgICAkKFwiYm9keVwiKS5zd2lwZSgge1xyXG4gICAgICAgIHN3aXBlOmZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQsIGZpbmdlckRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAndXAnKSBkaXJlY3Rpb24gPSAndG9wJztcclxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnZG93bicpIGRpcmVjdGlvbiA9ICdib3R0b20nO1xyXG4gICAgICAgICAgICBjaGVja0RpcmVjdGlvbihkaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gdGltZXIoKSB7XHJcblxyXG4gICAgbGV0IHRpbWUgPSA2MDtcclxuXHJcbiAgICBmdW5jdGlvbiB0aW1lcklubmVyKCkge1xyXG5cclxuICAgICAgICBpZih0aW1lID09PSA2MCkge1xyXG4gICAgICAgICAgICB0aW1lclNwYW5SLnRleHRDb250ZW50ID0gJzAwJztcclxuICAgICAgICB9IGVsc2UgaWYodGltZSA8IDYwKSB7XHJcbiAgICAgICAgICAgIHRpbWVyU3BhbkwudGV4dENvbnRlbnQgPSAnMDAnO1xyXG4gICAgICAgICAgICBpZih0aW1lID49IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lclNwYW5SLnRleHRDb250ZW50ID0gdGltZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVyU3BhblIuY2xhc3NMaXN0LmFkZCgnZ2FtZV9fdGltZXItcl9yZWQnKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyU3BhblIudGV4dENvbnRlbnQgPSAnMCcgKyB0aW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRpbWUgPT09IDApIHsgXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbm5lckludGVydmFsKTtcclxuICAgICAgICAgICAgZmluaXNoR2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aW1lLS07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRpbWVySW5uZXIoKTtcclxuXHJcbiAgICBsZXQgdGltZXJJbm5lckludGVydmFsID0gc2V0SW50ZXJ2YWwodGltZXJJbm5lciwgMTAwMCk7XHJcblxyXG59IiwiZnVuY3Rpb24gdmhNb2R1bGUoKSB7XHJcblxyXG4gICAgLy8gRmlyc3Qgd2UgZ2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQgYW5kIHdlIG11bHRpcGxlIGl0IGJ5IDElIHRvIGdldCBhIHZhbHVlIGZvciBhIHZoIHVuaXRcclxuICAgIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDE7XHJcbiAgICAvLyBUaGVuIHdlIHNldCB0aGUgdmFsdWUgaW4gdGhlIC0tdmggY3VzdG9tIHByb3BlcnR5IHRvIHRoZSByb290IG9mIHRoZSBkb2N1bWVudFxyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKTtcclxuXHJcbiAgICAvLyBXZSBsaXN0ZW4gdG8gdGhlIHJlc2l6ZSBldmVudFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8vIFdlIGV4ZWN1dGUgdGhlIHNhbWUgc2NyaXB0IGFzIGJlZm9yZVxyXG4gICAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YCk7XHJcbiAgICAvLyBoZWFkZXJIZWlnaHRGdW4oKTtcclxuICAgIH0pO1xyXG5cclxufSJdfQ==
