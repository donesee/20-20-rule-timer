

const timerApp = {
    minutes: 20,
    seconds: 0,
    counter: 100,
    intervalID: null,
    isPlaying: false,
    isRunning: false,
    alarm: new Audio('ringtone.mp3'),
    displayCount(){
        timer.textContent = `${this.minutes.toString().padStart(2, 0)}:${this.seconds.toString().padStart(2, 0)}`
    }

};

const custom = document.getElementById("customTime");
const timer = document.getElementById("timer");
const timeBtn = document.getElementById("addCustom");
const reset = document.getElementById("reset");
const pause = document.getElementById("pause");
let customValue;

timerApp.displayCount();


function customTime(){
    timerApp.isRunning = false;
    pauseAlarm()
    customValue = custom.value;
    let ms = customValue.split("/")
    let m = parseInt(ms[0])
    let s = parseInt(ms[1])
    console.log(customValue)

    if(isNaN(m) || s > 59 || ms.length > 2){
        console.log("not a number")
        return;
    }
    clearInterval(timerApp.intervalID);    

    if(ms.length === 2){
        timerApp.seconds = s;
        timerApp.minutes = m;
        timerApp.displayCount();
    }
    if(ms.length === 1){
        timerApp.minutes = m
        timerApp.seconds = 0
        timerApp.displayCount();

    }
    if(timerApp.minutes === 0 && timerApp.seconds === 0){
        playAlarm();
    }
};

function count(){
    if(!timerApp.isRunning){
        timerApp.isRunning = true;
        timerApp.intervalID = setInterval(() => {
            if(timerApp.seconds === 0 && timerApp.minutes === 0){
                clearInterval(timerApp.intervalID)
                playAlarm();
            }
            else if(timerApp.seconds === 0){
                timerApp.minutes--;
                timerApp.seconds = 59
                }
            else{
                timerApp.seconds--;
                }
                timerApp.displayCount();
    }, 1000);
}
else{
    return;
}

}



reset.addEventListener("click", () => {
    clearInterval(timerApp.intervalID);
    customValue = custom.value;
    timerApp.isRunning = false;
    
    if(!customValue){
        timerApp.minutes = 20
        timerApp.seconds = 0
        timerApp.displayCount();
    }
    else{
        customTime();
    }

})

pause.addEventListener("click", () => {
    clearInterval(timerApp.intervalID);
    timerApp.isRunning = false;
})

const playAlarm = () => {
    const playSound = ()=> {
        if(timerApp.counter > 0){
            timerApp.alarm.volume = 1;
            timerApp.alarm.play().then(() => {
                console.log("Playing alarm");
                timerApp.isPlaying = true;
            }).catch((error) => {
                console.error("Audio play failed:", error);
            });
            timerApp.counter--;
        }
    }
    playSound()
}
timerApp.alarm.addEventListener("ended", () => {
    if (timerApp.counter > 0) {
        playAlarm();
    }
});
   
    function pauseAlarm(){
        timerApp.alarm.pause()
        timerApp.alarm.currentTime = 0;
        console.log("Alarm stopped.")
        timerApp.isPlaying = false; 
    }

    document.body.addEventListener('click', () =>{
        if (timerApp.isPlaying) {
            pauseAlarm()
        }
    });

