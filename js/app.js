const startBtn = document.querySelector('#start-btn');
const timeEls = document.querySelector('#time')
const timeTextEl = document.querySelector('.timeText') 
const game = document.querySelector('#game')
const targetsEls = document.querySelector('#targets')

let time = 60
let targets = 30


startBtn.addEventListener('click', () => {
    // Start the game
    // Hide startbtn
    document.getElementById('start-btn').style.display = 'none'


    // Generate Circle in random spot
    const circle = document.createElement('div');
    circle.id = 'circle'
    document.getElementById('game').appendChild(circle)
    positionCircleRandomly(circle)

    circle.addEventListener('click', () => {
        if (targets === 0) {
            clearInterval(countdownTimer);
            targetsEls.innerHTML = targets
            circle.remove();
            // You Win!
        } else {
        positionCircleRandomly(circle);
        targetsEls.innerHTML = targets
        --targets;
        }
})

    // Begin the countdown timer
    const countdownTimer = setInterval(function(){
        if (time === 0) {
            // lose/game over
            circle.remove();
            clearInterval(countdownTimer);
            timeTextEl.innerHTML = "Time's Up!";
        } else {
            timeEls.innerHTML = '00:' + time;  
        }
        time -= 1;
    }, 1000);
    


})

function getRandomPosition(){
    const x = Math.floor(Math.random() * (window.innerWidth - 100));
    const y = Math.floor(Math.random() * (window.innerHeight - 100));
    return { x, y };

}

function positionCircleRandomly(circle) {
    const { x, y } = getRandomPosition();
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`

}

