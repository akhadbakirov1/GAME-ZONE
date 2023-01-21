// const colors = require('./colors');
import colors from './colors.js';

const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      restart = document.querySelector(".restart-btn"),
      whatsApp = document.querySelector(".whatsApp"),
      telegram = document.querySelector(".telegram"),
      facebook = document.querySelector(".facebook"),
      timelvl = document.querySelector("#timelvl"),
      totalScore = document.querySelector('#store'),
      music = new Audio('./music/music.mp3'),
      tap = new Audio('./music/tap.mp3'),
      klick = new Audio('./music/klick.mp3');
      

let interval;
// store
let lvlSeconds = 0
let record = {
   lvl10:0,
   lvl20:0,
   lvl30:0
}
let time = 0;
let score = 0;

// setTimeout(fonMuz, 2000);
// переход на экран 2
startBtn.addEventListener('click', (event) => {
   event.preventDefault()
   screens[0].classList.add('up')
   klick.restartMusik()
   music.volume = 0.6
   music.restartMusik()
   music.loop = true
})

// экран 2 выбор времени
timeList.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn')){
   //  преобразовываем строку в число и записываем в переменную времени
   // мой метод
   time = parseInt(event.target.dataset.time);
   lvlSeconds = parseInt(event.target.dataset.time);
   // выводим экран 3
   screens[1].classList.add('up')
   startGame();
   klick.restartMusik();
  }
})


// получаем баллы
board.addEventListener('click', event => {
   if(event.target.classList.contains('circle')){
      // event.target.style.backgroundColor = 'red !important'
      score++
      event.target.remove()
      createRandomCircle()
      tap.restartMusik()   
   }
})

Audio.prototype.restartMusik= function() {
   this.pause();
   this.currentTime = 0;
   this.play();
};

restart.addEventListener('click', restartGame)


// начало игры экран 3 
function startGame(){
   timeEl.parentNode.classList.remove('hide')
   board.innerHTML = ''
   // отрисовываем оставшееся время
   interval = setInterval(decreaseTime, 1000)
   createRandomCircle()
   setTime(time)
}

// стоп игра
function finishGame(){
   timeEl.parentNode.classList.add('hide')
   screens[2].classList.add('up')
   totalScore.innerHTML = score
   timelvl.innerHTML = lvlSeconds
   
   whatsApp.href=`https://api.whatsapp.com/send?text= Побей мой рекорд - ${score} очков за ${lvlSeconds} секунд. В мегаигре на реакцию https%3A%2F%2Fwebstep.kz%2Ftest%2F1`
   telegram.href=`https://t.me/share/url?url=https%3A%2F%2Fwebstep.kz%2Ftest%2F1&text=Побей мой рекорд - ${score} очков за ${lvlSeconds} секунд. В мегаигре на реакцию https%3A%2F%2Fwebstep.kz%2Ftest%2F1`
   facebook.href=`https://www.facebook.com/sharer.php?src=sp&u=https%3A%2F%2Fwebstep.kz%2Ftest%2F1%2F&title=Побей мой рекорд - ${score} очков за ${lvlSeconds} секунд. В мегаигре на реакцию https%3A%2F%2Fwebstep.kz%2Ftest%2F1`

}
function restartGame(){
   timeEl.parentNode.classList.remove('hide')
   screens[2].classList.remove('up')
   screens[1].classList.remove('up')
   time = 0;
   score = 0;
   klick.play();
   music.restartMusik()
}


// таймер обратного отчета
function decreaseTime(){
   if (time === 0){
      clearInterval(interval)
      finishGame();
   }else{
      let b = --time;
      if (b < 10) {
         b = `0${b}`  
      }
      setTime(b)
   }
}

// отрисовка таймера обратного отчета
function setTime(value){
   timeEl.innerHTML = `00:${value}`;
}

// создаем обьект круга на игровой доске
function createRandomCircle(){
   const circle = document.createElement('div');
   const size = getRandomNumber(18, 150);
   const color = colors[getRandomNumber(0, colors.length)]
   const {width, height} = board.getBoundingClientRect()
   const x = getRandomNumber(1, width - size);
   const y = getRandomNumber(1, height - size);
    

   circle.classList.add('circle');
   circle.style.width = size + 'px';
   circle.style.height = size+ 'px';
   circle.style.top = y + 'px';
   circle.style.left = x + 'px';
   circle.style.background = color
   circle.style.boxShadow = `0 0 10px ${color}`

   board.append(circle);
}

// случайный номер размера круга
function getRandomNumber(min, max){
   return Math.round(Math.random() * (max - min) + min)
}
