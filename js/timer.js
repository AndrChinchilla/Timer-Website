/**
 * Creates a timer that is controlled by two buttons, start/pause and reset. Timer is accurate 
 * to the second.
 */


 const second_ms = 1000 ;  //1000 ms = 1s
 const minute_s = 60 ;  //60 s = 1m
 const hour_s = 3600 ;  //3600 s = 1h


var active = false;


function startTimer()
{
    
    if (active)
    {
            
        var timer = document.getElementById("my_timer").innerHTML;
         
        var timeArr = timer.split(":"); 

        var hour = timeArr[0];
        var minute = timeArr[1];
        var second = timeArr[2];
    
        
       if (second == 59)
       {
           if(minute == 59)
           {
               hour++;
               minute =  0;
               if (hour < 10)
               {
                   hour = "0" + hour;
               }
           }
           else
           {
                minute ++;
           }

           if (minute < 10)
           {
               minute = "0" + minute;
           }

           second = "0" + 0;
       }
       else
       {
              
            second ++;
            if (second < 10)
            {
                second = "0" + second;
            }
       }
        //Update html
        document.getElementById("my_timer").innerHTML = hour + ":" + minute + ":" + second;
        
        setTimeout(startTimer, 1000);
        
    }

}

function changeState()
{
    if (active == false)
    {
        active = true;
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

function reset()
{
    document.getElementById("my_timer").innerHTML =  "00:00:00";
    
    changeState();
    
}


let startButton = document.getElementById("control");
let resetButton = document.getElementById("reset");

startButton.addEventListener('click', changeState);
resetButton.addEventListener('click', reset)

