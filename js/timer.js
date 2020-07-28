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
var splits = 0 ;  //Track number of times split
var current_splits = [] ; // Store splits created
var gold_times = [];   //Store gold times for each variable


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

        updateTimer(millis);
        
        
        var drift = Date.now() - expected;

        expected += interval;

        setTimeout(runTimer, Math.max(0, interval - drift));   //Account for drift when setting interval
        
    }

}

//Update timer display with new time
function updateTimer(timeElapsed)
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

        current_splits = []
        gold_times = []

        updateDisplay();
        splits = 0;
    }
   
}

//Takes current time and compares it to time of current split, updates split with the new time and time differential between splits.
function split()
{
    var created_splits = document.getElementsByClassName("cumulative");

    if (splits < created_splits.length)
    {
        var para = document.createElement("p");

        current_split = parseInt(current_splits[splits].replace(':' , ''));
        gold_time = parseInt(gold_times[splits].replace(':',''));
 
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
        
        let current_time = hour + "" + minute + "" + second + "." + hundred;

    
        created_splits[splits].innerHTML = (current_time);

        
        current_time = parseFloat(current_time.replace(':',''));   //convert time into float to perform comparison

        time_differential = current_split - current_time;   //Time differential of time split compared to the split being ran against. 
        let differential_display = createTime(time_differential.toString());
        
        if (time_differential > 0)
        {
            if (current_time > gold_time)
            {
                differential_display = "<span class = time_gain>" + "-" + differential_display + "</span>"
            }
            else
            {
                differential_display = "<span class = gold_time>" + "-" + differential_display + "</span>"
            }
            
        }
        else
        {
            differential_display = "<span class = time_loss>" + "+" + differential_display + "</span>"
        }

        created_splits[splits].insertAdjacentHTML("beforebegin", differential_display);


        splits ++;
        if (splits == created_splits.length)
        {
            document.getElementById("control").innerHTML = "STOP";
        }

    }
    else
    {
        reset();
    }
}

//Converts string into time format (ex: hour: minutes: seconds)
function createTime(string)
{
    let flag = false;
    let number_index = 0;

    for (index = string.length - 1; index > 0 ; index --)
    {   
        if (flag)
        {
            if (string[index] != ':')
            {
                number_index ++;
            }
            
            if (number_index % 2 == 0)
            {
                string = string.slice(0, index ) + ':' + string.slice(index );
            }
            
        }

        if (string[index] == '.')
        {
            flag = true;
        }
    } 

    return string

}


//Updates timer with selected timer info.
function updateDisplay()
{
    var object = localStorage.getItem("timer");
    var timer = JSON.parse(object);

    console.log(timer)
    

    var para = document.createElement("p");
    var splits = document.getElementById("splits")

    for(const [key, value] of Object.entries(timer)){
        if (key == 'category')
        {
            document.getElementById("category").innerHTML = timer.category; 
        }
        
        if (key.includes("name"))
        {
              
            var name = document.createElement('span');
            name.className = "name"

            var nameContent = document.createTextNode(value);
            name.appendChild(nameContent) 
            para.appendChild(name);
        
        }
        else if (key.includes("cumulative_time"))
        {
            var cumulative = document.createElement('span');
            cumulative.className = "cumulative"

            current_splits.push(value);

            var cumulativeTime = document.createTextNode(value);
            cumulative.appendChild(cumulativeTime) 
            para.appendChild(cumulative);



            splits.appendChild(para);
            splits.append(document.createElement("hr"));
            para = document.createElement("p");    
        }
        else if(key.includes("individual_time"))
        {
            gold_times.push(value);
        }
         
    }
        
}


let startButton = document.getElementById("control");
let resetButton = document.getElementById("reset");
let updateDisplayButton = document.getElementById("update");


startButton.addEventListener('click', time);
resetButton.addEventListener('click', reset);
updateDisplayButton.addEventListener('click', updateDisplay);


