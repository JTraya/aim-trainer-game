const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn')
const timeEls = document.querySelector('#time')
const timeTextEl = document.querySelector('.timeText') 
const targetsEls = document.querySelector('#targets')
const game = document.querySelector('#game')

let time = 30
let targets = 30 
let countdownTimer;


startBtn.addEventListener('click', () => {
    // Start the game
    // Hide startbtn
    // document.getElementById('start-btn').style.display = 'none'
    // startBtn.style.display = 'none'
    // startBtn.hidden = 'true'
    startBtn.style.visibility = 'hidden'

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
            const win = document.createElement('h1')
            win.id = 'win'
            win.innerText = 'You Win!'
            document.getElementById('game').appendChild(win)
        } else {
        positionCircleRandomly(circle);
        targetsEls.innerHTML = targets
        --targets;
        }
})

    // Begin the countdown timer
     countdownTimer = setInterval(function(){
        if (time === 0) {
            circle.remove();
            clearInterval(countdownTimer);
            timeEls.innerHTML = '00:00';  
            // timeTextEl.innerHTML = "Time's Up!";
            // Lose/Game Over
            const loss = document.createElement('h1')
            loss.id = 'loss'
            loss.innerText = 'Game Over'
            document.getElementById('game').appendChild(loss)
        } else {
            timeEls.innerHTML = '00:' + time;  
        }
        time -= 1;
    }, 1000);
    
})

resetBtn.addEventListener('click', () => {
    startBtn.style.visibility = 'visible'
    clearInterval(countdownTimer)
    if (targets === 0) {
        win.remove()
    } else if (timeEls.innerHTML === '00:00') {
        loss.remove()
    } else {
        circle.remove()
    }
    targets = 30
    time = 30
    timeEls.innerHTML = '00:30';  
    targetsEls.innerHTML = '30'

    // if (targets !== 0 ) {
    //     circle.remove()
    // } else if (targets === 0) {
    //     win.remove()
    //     targetsEls.innerHTML = '30'
    // } 
})

function getRandomPosition(){
    const x = Math.floor(Math.random() * (game.getBoundingClientRect().width - 100));
    const y = Math.floor(Math.random() * (game.getBoundingClientRect().height - 100));
    return { x, y };
    
}

function positionCircleRandomly(circle) {
    const { x, y } = getRandomPosition();
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`

}

// console.dir(win)
// Note for tmrw:
// Fix bugs (of course) target window**
// Setup Reset button
//// Add in Win/Game Over text those fulfilling conditions
// Research and setup hits and accuracy