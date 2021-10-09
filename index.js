const display = document.getElementById('clock');


// set audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = []; // Stores all the alarms 
let count =1;


// Plays the audio
function ringing(){
    audio.play();
}


// function to update th clock 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

//     Constantly checks alarmList contains the current time. If yes, ringing() is called. 
    display.innerText=`${hour}:${minutes}:${seconds}`;
    if(alarmList.includes(now) && count === 1){
        count = count + 1;
        ringing();
    } else if( seconds === 59){
        count = 1;
    }
}


// set the correct format of time. 
// Converts "1:2:6" to "01:02:06" 
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop alarm currently playing
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// remove an alarm from the unordered list and webpage when delete alarm is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// remove an alarm from the array when delete alarm is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// creates a new list item to display the recently set webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm when a form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h=formatTime(addAlarm.a_hour.value);
    const new_m=formatTime(addAlarm.a_min.value);
    const new_s=formatTime(addAlarm.a_sec.value);
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

//     add the newAlarm to array "alarmList"
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// call updateTime() every second
setInterval(updateTime, 1000);

