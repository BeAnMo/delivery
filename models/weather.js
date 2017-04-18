/******** Weather Module 
 * Hold off on incorporating weather data until successful implementation
 * of the rest of the models into a working app.
 ********/
const key = '5c444bd5dc0ffc772bf5b32c7f511567';
const testUrl = 'http://api.openweather.org/data/2.5/weather?q=' + 
    '&APPID=' + key;

const lat;
const lon;
const url = 'http://api.openweather.org/data/2.5/weather?lat=' +
    lat + '&lon=' + lon + '&APPID=' + key;

function Weather(date){
    this.date = date;
    this.city = '';
    this.conditions = '';
    this.temp = null;
}

Weather.prototype.ajaxGet = function(){
    var req = new XMLHttpRequest();

    return;
}
