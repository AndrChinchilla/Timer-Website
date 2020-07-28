/**
 * Allow the user to create custom splits that will be compared to the timer when splitting, displaying time 
 * loss or time gain, time as of split end, and the custom split time. 
 * TODO: Allow user to import splits from file. 
 */

 //Validate form 


var splits = 1   //Counts the number of splits created

function validateForm()
{
    let elements = document.querySelector("form").elements;

    var object = {};

    //Validate each element of form
    for (let element of elements){

        //Validate input and save it to object
        if (element.type == 'text' && element.value == ""){
            
            alert("Must be filled out");
            return false;
        }
  

        object[element.name] = element.value;
        
    }
    //TODO: Update timer with info
    //TODO: Allow for storage and selection of multiple timers (hash storage)
    localStorage.setItem("timer", JSON.stringify(object));   //Save Timer to local Storage
    
}
/**
 * Add new fields to form so user can create multiple splits
 */
function addFields()
{
    splits ++; 

    let container = document.getElementById("splits");

    let inputName = document.createElement("input");
    let inputTime = document.createElement("input");
    let inputGold = document.createElement("input");
    

    inputName.type = 'text';
    inputName.name = 'name' + splits;

    inputTime.type = 'text';
    inputTime.name = 'cumulative_time' + splits;

    inputGold.type = 'text';
    inputGold.name = 'individual_time' + splits;

    container.appendChild(document.createElement("p"))
    container.appendChild(inputName);
    container.appendChild(inputTime);
    container.appendChild(inputGold);
    
}



let addButton = document.getElementById("add"); 

addButton.addEventListener('click', addFields);

