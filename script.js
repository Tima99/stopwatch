const playBtn = document.querySelector('.play-btn')
const pauseBtn = document.querySelector('.pause-btn')
const resetBtn = document.querySelector('.reset-btn')
const playBtnAfterPause = document.querySelector('.after-pause .play-btn')
const flagBtn = document.querySelector('.flag')

const afterPlay = document.querySelector('.after-play')
const afterPause = document.querySelector('.after-pause')


let timer = null;

playBtn.addEventListener('click' , function(){if(!istimefull) Play(this)})
playBtnAfterPause.addEventListener('click' ,  function(){if(!istimefull) Play(this)})
resetBtn.addEventListener('click' , Reset)
flagBtn.addEventListener('click' , Laps)
pauseBtn.addEventListener('click', function(){
    afterPlay.classList.toggle('dp-none')
    afterPause.classList.toggle('dp-none')
    StopTimer()
})


const time = {
    hrs : 0, // hrs is replace with alert
    min : 0,
    sec : 0,
    ms  : 0
}

let istimefull = false; // true if timer goes on 1hrs
function Play(playbtn){
    if(playbtn.parentElement.id == "inputs-handler" )
        playbtn.classList.toggle('dp-none')
    else
        afterPause.classList.toggle('dp-none')

    afterPlay.classList.toggle('dp-none')
    
    timer = setInterval(StartTimer , 16.6)
}

function StartTimer(){
    ++time.ms
    if(time.ms > 59){
        time.ms = 0
        ++time.sec
        if(time.sec > 59){
            time.sec = 0
            ++time.min

            if(time.min > 59){
                time.min = 59
                clearInterval(timer)
                afterPlay.classList.toggle('dp-none')
                afterPause.classList.toggle('dp-none')
                istimefull = true
                alert("Timer Complete : 1hrs\nReset to start again")
            }
        }
    }
    ShowTime()
}

function StopTimer(){
    clearInterval(timer)
}

function Reset(){
    clearInterval(timer)
    playBtn.classList.toggle('dp-none')
    afterPause.classList.toggle('dp-none')
    time.hrs = time.min = time.sec = time.ms = 0
    istimefull = false
    lapCount = 0
    document.querySelector('.laps-container').classList.toggle('laps-active')
    document.querySelector('.laps-container').innerHTML = ''
    ShowTime()
}

function ShowTime(){
    time.ms = time.ms < 10 ? '0' + time.ms : time.ms
    time.sec = time.sec.toString().length == 1 ? '0' + time.sec : time.sec
    time.min = time.min.toString().length == 1 ? '0' + time.min : time.min
    time.hrs = time.hrs.toString().length == 1 ? '0' + time.hrs : time.hrs
    
    document.querySelector('.sec').innerHTML = time.sec + ' : '
    document.querySelector('.min').innerHTML = time.min + ' : '
    // document.querySelector('.hrs').innerHTML = time.hrs + ' : '
    document.querySelector('.ms').innerHTML = time.ms 

}

let lapCount = 0;
function Laps(){
    let lapsBox = document.querySelector('.laps-container')
    let timeLap = document.querySelector('.time-container').innerText;

    if(!lapsBox.querySelector('.laps-active'))
        lapsBox.classList.add('laps-active')
    
    let lapBox = document.createElement('div')
    lapBox.classList.add('lap')
    let lapHTML = 
    `
        <span>
        <span class="dot"></span>
        Lap ${++lapCount}
        </span>
        <span>${timeLap}</span>
    `
    lapBox.innerHTML = lapHTML

    lapsBox.appendChild(lapBox)

}