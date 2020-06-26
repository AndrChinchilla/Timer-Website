/**
 * Creates a timer that is controlled by two buttons, start/pause and reset. Timer is accurate 
 * to the second.
 */

 const interval = 10; 
 const second_hs = 100 ;  //100 hs = 1s
 const minute_s = 60 ;  //60 s = 1m
 const hour_m = 60 ;  //60 m = 1h



var active = false;   //Control timer
var expected = Date.now() + interval   //Expected time each interval, use to sync clock.
var splits = [] ;  //Store times for all splits created

var hour = 0;
var minute = 0;
var second = 0;
var hundred = 0;

//Timer, only works when active is true. Controlled by changeState()
function startTimer()
{
    
    if (active)
    {

        hour = document.getElementById("hour").innerHTML.replace(/\D/g,'');   //Remove ':' character
        minute = document.getElementById("minute").innerHTML.replace(/\D/g,'');
        second = document.getElementById("second").innerHTML;
        hundred = document.getElementById("hundred").innerHTML;

        hundred++;

        if (hundred < 10)
        {
          hundred = "0" + hundred;  
        }

        if (hundred == second_hs)
        {
            second++ ;
            hundred =  "0" + 0;
            if (second < 10)
            {
                second = "0" + second;
            }
        }
        if (second == minute_s)
        {
            minute ++;
            second = "0" + 0;

        }
        if (minute == hour_m)
        {
            hour++;
            minute = "0" + 0;
        }

        
        
        //Update html
        if(hour){
            document.getElementById("hour").innerHTML =  hour + ':';
        }
        
        if(minute){
            document.getElementById("minute").innerHTML =  minute + ':';
        }

        document.getElementById("second").innerHTML = second;
        document.getElementById("hundred").innerHTML = hundred;

        var drift = Date.now() - expected;

        expected += interval;

        setTimeout(startTimer, Math.max(0, interval - drift));   //Account for drift when setting interval
        
    }

}

//Changes the state of timer to opposite of current state
function changeState()
{
    if (active == false)
    {
        active = true;
        expected = Date.now() + interval

        startTimer();
        console.log("Timer started");
        document.getElementById("control").innerHTML = "PAUSE";

    }
    else
    {
        active = false;
        console.log("Timer paused");
        document.getElementById("control").innerHTML = "START";
    }

}

//Resets time and removes all splits and pauses time.
function reset()
{
    document.getElementById("hour").innerHTML = '' ;
    document.getElementById("minute").innerHTML = '';
    document.getElementById("second").innerHTML = "0" + 0;
    document.getElementById("hundred").innerHTML = "0" + 0;

    var created_splits = document.querySelector('#splits');

    while (created_splits.firstChild)
    {
        created_splits.removeChild(created_splits.firstChild);
    }

    //Save all stored splits to file and clear array
    //TODO: Learn about json and file storage (Eloquent Javascript ch 20 on node.js)


    active = true;
    changeState();
    
}

//Takes current time and saves it (known as a split) and displays it without pausing the timer.
function split()
{
    splits.push([hour,minute,second,hundred]); 
    var para = document.createElement("p");

    if (hour)
    {
        hour = hour + ':';
    }
    if(minute)
    {
        minute = minute + ':';
    }
    var content = document.createTextNode(hour + "" + minute + "" + second + "." + hundred);
    para.appendChild(content);
    var element = document.getElementById("splits");
    element.appendChild(para);
}


let startButton = document.getElementById("control");
let resetButton = document.getElementById("reset");
let splitButton = document.getElementById("split");

startButton.addEventListener('click', changeState);
resetButton.addEventListener('click', reset);
splitButton.addEventListener('click',split);

