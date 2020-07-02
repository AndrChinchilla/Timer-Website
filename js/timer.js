/**
 * Creates a timer that is controlled by two buttons, start/pause and reset. Timer is accurate 
 * to the second.
 */

 const interval = 10; 
 const second_ms = 1000 ;  //1000 ms = 1s
 const minute_ms = 60000 ;  //60 s = 1m
 const hour_ms = 3600000 ;  //60 m = 1h



var active = false;   //Control timer
var start = Date.now()    //Start Time
var expected = start + 10   //Expected time for each interval
var splits = [] ;  //Store times for all splits created

var hour = 0;
var minute = 0;
var second = 0;
var hundred = 0;

//Timer, only works when active is true. Controlled by changeState()
function runTimer()
{
    
    if (active)
    {

        const millis = Date.now() - start ;  //Total milliseconds since start of timer

        updateDisplay(millis);
        
        
        var drift = Date.now() - expected;

        expected += interval;

        setTimeout(runTimer, Math.max(0, interval - drift));   //Account for drift when setting interval
        
    }

}

//Update timer display with new time
function updateDisplay(timeElapsed)
{
          
            var updateTime = timeElapsed;

            hour = Math.floor(timeElapsed / hour_ms);

            
            //Update html
            if(hour > 0){
                updateTime = updateTime % hour_ms;
                document.getElementById("hour").innerHTML =  hour + ':';
                
            }
            
            minute = Math.floor(updateTime / minute_ms);
            if(minute > 0){

                updateTime = updateTime % minute_ms;
                document.getElementById("minute").innerHTML =  minute + ':';

                if (hour > 0 && minute < 10)
                {
                    minute = "0" + minute;
                }
            }

            second = Math.floor(updateTime / second_ms);

            if (second > 0)
            {
                updateTime = updateTime % second_ms;
                
            } 

            if (second < 10)
            {
                second = "0" + second;
            }
            
            hundred = Math.floor(updateTime / 10);

            if (hundred < 10)
            {
                hundred = "0" + hundred;
            }
    
            document.getElementById("second").innerHTML = second;
            document.getElementById("hundred").innerHTML = hundred;

            

}

//Starts timer and allows creation of splits if timer is active, resets if timer has been paused
function time()
{
    if (active == false)
    {
        reset();
        active = true;
        start = Date.now();
        expected = Date.now() + interval;

        runTimer();
        console.log("Timer started");
        document.getElementById("control").innerHTML = "SPLIT";

    }
    else
    {
        split();
    }
}


//Resets time if timer is stopped and removes all splits or stops timer.
function reset()
{

    if (active == true)
    {
        active = false;
        document.getElementById("reset").innerHTML = "RESET";
        document.getElementById("control").innerHTML = "RESTART";

        runTimer();
        
    }

    else
    {

        document.getElementById("hour").innerHTML = '' ;
        document.getElementById("minute").innerHTML = '';
        document.getElementById("second").innerHTML = "0" + 0;
        document.getElementById("hundred").innerHTML = "0" + 0;

        hour = '';
        minute = '';
        second = "0" + 0 ;
        hundred = "0" + 0 ;

        var created_splits = document.querySelector('#splits');

        while (created_splits.firstChild)
        {
            created_splits.removeChild(created_splits.firstChild);
        }

        document.getElementById("control").innerHTML = "START";  
        document.getElementById("reset").innerHTML = "STOP";

        //Save all stored splits to file and clear array
        //TODO: Learn about json and file storage (Eloquent Javascript ch 20 on node.js)
    }
   
}

//Takes current time and saves it (known as a split) and displays it without pausing the timer.
function split()
{
    splits.push([hour,minute,second,hundred]); 
    var para = document.createElement("p");
    

    if (hour > 0)
    {
        hour = hour + ':';
    }
    else
    {
        hour = "";
    }
    if(minute > 0)
    {
        minute = minute + ':';
    }
    else
    {
        minute = "";

    }
    var content = document.createTextNode(hour + "" + minute + "" + second + "." + hundred);
    para.appendChild(content);
    var element = document.getElementById("splits");
    element.appendChild(para);
    
}


let startButton = document.getElementById("control");
let resetButton = document.getElementById("reset");


startButton.addEventListener('click', time);
resetButton.addEventListener('click', reset);


