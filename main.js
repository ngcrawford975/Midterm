//here we can begin writing some logic for our index file
//we can begin by starting the timer at zero
let timer = null;
let timeCounter = 0;

//here im adding a function that starts the timer.
function startTimer() {
    //right here, im making sure this button resets our timer to zero to start a fresh study session
    timeCounter = 0;
    document.getElementById('timeCounter').textContent = timeCounter + ' seconds';
    //make sure teh timer isnt already running
    if (timer === null) {
        //this part will run our timerUpdate (next function) every 1000 milliseconds (one second)
        timer = setInterval(timerUpdate, 1000);
    }
}

//this next function will update the timer
//it gets called every second when the user presses the start timer button
function timerUpdate() {
    //this part will increase our timer by one second everytime this function gets called
    //so if its getting called every second by startTimer, it will increase by one second, every second
    timeCounter++;
    //this next part will update the text content of our timer display in the html file to show the current time counter
    //we tell it to find the timeCounter id and change the text content to the current time counter value, and add the word seconds after it
    document.getElementById('timeCounter').textContent = timeCounter + ' seconds';
}

//this next function will stop the timer
function stopTimer() {
    //this par of the function will stop the repeating timer that the user previously started
    clearInterval(timer);
    timer = null;
}

//this next function is the bulk of our logic, this will actually calculate the total amount of study time
//we need it to make its estimate based on number of chapters, difficulty level, and break time.
function studyTime() {
    //here we need to establish a few differen variables
    //chapters will define the number of chapters the user inputs
    //difficulty will keep track of either easy, medium, or hard difficulty the user inputs
    //breakTime will keep track of how often the user wants to rest
    //i make sure to convert chapters and break time to numbers here as well
    const chapters = Number(document.getElementById('chapters').value);
    const difficulty = document.getElementById('difficulty').value;
    const breakTime = Number(document.getElementById('breakTime').value);

    //now that the variables have been established, we can perform some basic validation
    //first, we'll check to make sure that the user entered a number greater than zero fro chapters and breakTime
    //the difficulty level doesnt matter much here as we didnt really give them an option
    if (chapters <= 0 || breakTime <= 0) {
        //this is a pretty simple validation that will just stop the function and return an error message
        document.getElementById('result').textContent = 'Please enter valid numbers for chapters and break time.';
        return;
    } 

    //this next part will handle the difficulty calculations
    //Really, this can be whatever numbers we want to use, and mine isnt really based on anything
    //I'm doing 15 minute increments for simplicity, but you could definityly find some study to base your numbers on
    //the way we set our list up will default the difficutly to easy, thats important for this next part
    let timePerChapter = 15;
    if (difficulty === 'medium') timePerChapter = 30;
    else if (difficulty === 'hard') timePerChapter = 45;

    //this next block will handle the calculations for our times
    //we'll use all our variables up to this point to handle all the math
    //time to establish some more variables first
    const totalStudyTime = chapters * timePerChapter; 
    //we'll give the user a five minute break every breakTime
    const totalBreakTime = Math.floor(totalStudyTime / breakTime) * 5;
    //this will just hold the total amount of time the user would need to dedicate to the session
    const totalTime = totalStudyTime + totalBreakTime;

    //this part will update the result div in our html file to show the user their total time
    document.getElementById('result').textContent = `Total study time: ${totalTime} minutes.`;
}

//to keep organized, we'll add our event listerners here.
// all these really do is connect our buttons in our html file to the functions we wrote in our .js file
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('calculateButton').addEventListener('click', studyTime);