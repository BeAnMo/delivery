/*-------------------------------------------------------*/
/*------- Run Module ------------------------------------*/
//const Helper = require('../helpers/helpers');


function Run(start){
    this.start = start;
    this.end = '';
    this.weather = null;
    this.deliveries = [];

    // calculated totals for quick access
    this.fees = 0;
    this.tips = 0;
    this.mileage = 0;// from leaving shop to returning
    this.total = 0;// fees + tips
    this.time = 0;// end - start
}

/*
Run.prototype.setEnd = function(date){
    // sets end & get time spent on run
    this.end = date;
    return this.setTime();
}

Run.prototype.setTotal = function(){
    this.total = this.fees + this.tips;
    return this.total;
}

Run.prototype.addDelivery = function(delivery){
    return this.deliveries.push(delivery);
}

// should be handled by setTotalNumberOf 
// if mileage is add to Delivery properties
Run.prototype.setMileage = function(miles){
    return this.mileage = miles;
}

// should probably grab all calculated props at once
// String, Array, String -> void
Run.prototype.setTotalNumberOf = function(targetProp, 
                                          targetArray, 
                                          wantedTotal){
    this[targetProp] = Helper.objArrNumTotals.call(this, 
                                                   targetArray, 
                                                   wantedTotal);
    return this[targetProp];
}

Run.prototype.setTime = function(){
    this.time = Helper.elapsedTime(this.start, this.end);
    return this.time;
}
*/

module.exports = Run;
