const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn')
const timeEls = document.querySelector('#time')
const timeTextEl = document.querySelector('.timeText') 
const targetsEls = document.querySelector('#targets')
const game = document.querySelector('#game')
const hitsEl = document.querySelector('#hits')
const accuracyEl = document.querySelector('#accuracy')

let time = 20
let targets = 30 
let countdownTimer;
let hits = 0
let misses = 0
let accuracy = '0%'
let playing = false

startBtn.addEventListener('click', () => {
    // Start the game
    playing = true

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
    targetsEls.innerHTML = targets - 1
    targets = targets - 1

    // console.dir(circle)

    // tick down targets and add win condition
    circle.addEventListener('click', () => {
        if (targets === 0) {
            playing = false
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
        --targets
        targetsEls.innerHTML = targets
        // --targets;
        }
})

    // Begin the countdown timer and add lose condition
     countdownTimer = setInterval(function(){
        if (time === 0) {
            playing = false
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
    // return start button, stop game, and stop timer
    startBtn.style.visibility = 'visible'
    clearInterval(countdownTimer)
    playing = false
    // based on condition of game clear added elements
    if (targets === 0 && timeEls.innerHTML !== '00:00') {
        win.remove()
    } else if (timeEls.innerHTML === '00:00') {
        loss.remove()
    } else {
        circle.remove()
    }
    // reset values to normal
    targets = 30
    time = 20
    hits = 0
    misses = 0
    accuracy = '0%'
    accuracyEl.innerText = accuracy
    hitsEl.innerText = hits
    timeEls.innerHTML = '00:20';  
    targetsEls.innerHTML = targets

    // if (targets !== 0 ) {
    //     circle.remove()
    // } else if (targets === 0) {
    //     win.remove()
    //     targetsEls.innerHTML = '30'
    // } 
})

game.addEventListener('click', (e) => {
    //records hits and misses
    if (e.target.id === 'circle') {
        hits++;
    } else if (playing === true && e.target.id !== 'start-btn' ) {
        misses++;
        console.log(misses)
    }
    // displays hits and accuracy
    hitsEl.innerText = hits
    calculateAccuracy()
})

function calculateAccuracy() {
    accuracy = (hits / (hits + misses)) * 100
    accuracy = accuracy.toFixed(2)
    accuracyEl.innerText = `${accuracy}%`
}

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

//// Note for tmrw:
//// Fix bugs (of course) target window**
////Setup Reset button
//// Add in Win/Game Over text those fulfilling conditions
//// Research and setup hits and accuracy