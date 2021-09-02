var newYears = '2022-01-01'
 
function updateTime()
{
    var currentDate = new Date();
    var targetDate = new Date(newYears);

    var seconds = (targetDate - currentDate) / 1000;   

    var minutes = Math.floor(seconds / 60)

    var hours = Math.floor(minutes / 60)

    var days = Math.floor(hours / 24);

    document.getElementById('days-c').innerHTML = formatTime(days);
    document.getElementById('hours-c').innerHTML = formatTime(hours % 24);
    document.getElementById('minutes-c').innerHTML = formatTime(minutes % 60);
    document.getElementById('seconds-c').innerHTML = formatTime(Math.floor(seconds % 60));
}

function formatTime(time)
{
    return time < 10 ? ('0' + time) : time;
}

// initialisation
updateTime();

// run every 1 sec
setInterval(updateTime, 1000);