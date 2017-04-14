/*-- Notes --|

- app flow:
  - profile is create ->
    - shift created ->
      - run created ->
        - delivery created ->
        - delivery posted to run ->
      - run ended & posted to shift ->
    - shift ended & posted to profile

|-----------*/

/*-------------------------------------------------------*/
/*-------- Worker Globals -------------------------------*/
var currentRun = null;
var currentShift = null;

/*-------------------------------------------------------*/
/*-------- Prototypes -----------------------------------*/
// Date -> Time
function Time(start){
	this.start = start;
	this.end = '';
	this.total = 0;
}

// Number, Number, Number -> Delivery
function Delivery(amount, type, fee){
	this.tip = amount;
	this.paymentType = type;
	this.fee = fee;
}

// Void -> Run
function Run(){
	this.time = new Time(new Date());
	this.fees = 0;
	this.tips = 0;
	this.total = 0;
	this.deliveries = [];
}

// Number -> Shift
function Shift(wage){
	this.time = new Time(new Date());
	this.wage = wage;
	this.total = 0;
	this.runs = [];
}

/*-------------------------------------------------------*/
/*-------- Prototype Methods ----------------------------*/
// Date -> Void
// Sets the end time for a Time
Time.prototype.setEnd = function(date){
	this.end = date;
	return this.calculate();
}

// Void -> Void
// calculates the difference between the start & end dates
Time.prototype.calculate = function(){
	this.total = elapsedTime(this.start, this.end);
}

// Delivery -> Void
Run.prototype.addDelivery = function(del){
	return this.deliveries.push(del);
}
/*
// String, Array, String -> void
Run.prototype.setTotalOf = function(targetProp,
                                    targetArray,
                                    wantedTotal){
    this[targetProp] = objectArrayToNumericTotal.call(this,
                                                   targetArray,
                                                   wantedTotal);
    return this[targetProp];
}
*/


Run.prototype.setEnd = function(){
	// not quite sure how to maintain 'this' while calling setTotalOf
	this.tips = setTotalOf(currentRun, currentRun.deliveries, 'tip');
	this.fees = setTotalOf(currentRun, currentRun.deliveries, 'fee');
	this.total = this.fees + this.tips;
	this.time.setEnd(new Date());
}

Shift.prototype.addRun = function(run){
	return this.runs.push(run);
}

Shift.prototype.setEnd = function(){
	// wage * total time
	this.total = setTotalOf(currentShift, currentShift.runs, 'total');
	this.time.setEnd(new Date());
}



/*-------------------------------------------------------*/
/*-------- Functions ------------------------------------*/
// Date -> Number
function timeToFloat(date){
    // should subtract the full date Objects from each other
    // not just hours & minutes, so avoid 11PM -> 12AM prob
    var hours = date.getHours();
    var mins = date.getMinutes();

    var time = hours + (mins / 60);

    return parseFloat(time.toFixed(2));
}

function elapsedTime(start, end){
    var total = timeToFloat(end) - timeToFloat(start);
    return parseFloat(total.toFixed(2));
}

// Array-of-Objects, String -> Number
function objectArrayToNumericTotal(arr, prop){
    // loops through an array and adds all numeric values associated
    // with the specified property in each object
    var total = 0;

    arr.forEach(function(current){
        total += current[prop];
    });

    return total;
}

// String, Array, String -> Number
function setTotalOf(obj, targetArray, wantedTotal){
    total = objectArrayToNumericTotal.call(obj,
                                          	targetArray,
                                            wantedTotal);
    return total;
}

/*-------------------------------------------------------*/
/*-------- Worker Methods -------------------------------*/
// Array -> Void
onmessage = function(e){
  console.log(e.data);
	// event.data[0] is the command
	var command = e.data[0];
	// event.data[1] is the data
	var data = e.data[1];
	/* worker commands:
	- postDelivery - post a new Delivery & adds to Run's deliveries
	- startRun = start a new run
	- endRun = end current run
	- startShift = start a new Shift
	- endShift = end current shift
	*/

	console.log('received from main: ' + command + '\n' + data);

	switch(command){
		case 'postDelivery':
			console.log('Delivery posted', data.tip);
			var del = new Delivery(data.tip, data.type, data.fee);
			currentRun.addDelivery(del);
			break;

		case 'startRun':
			console.log('new Run started');
			currentRun = new Run();
			break;

		case 'endRun':
			console.log('current Run ended');
			// calculate totals
			currentShift.addRun(currentRun);
			currentRun.setEnd();
      console.log(currentRun.total);

			postMessage(['runInfo', currentRun]);
			currentRun = null;
			break;

		case 'startShift':
			console.log('new Shift started');
			currentShift = new Shift(1.0);
			break;

		case 'endShift':
			console.log('current Shift ended');
			currentShift.setEnd();
			console.log(currentShift.total);
			currentShift = null;
	}

}
