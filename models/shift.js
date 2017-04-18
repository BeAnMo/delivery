/*-------------------------------------------------------*/
/*------- Shift Module ----------------------------------*/
//const Helper = require('../helpers/helpers');


function Shift(start){
    this.start = start;
    this.end = '';
    this.wage = 0; // set at profile
    this.runs = [];
    
    // calculated properties:
    this.hours = 0; // end - start !!! independent of run times !!!
    this.deliveryHours = 0; // hours - total deliveries time
    this.total = 0; // total tips, wages, fees
}

/*
Shift.prototype.setEnd = function(date){
    // sets end date and calculates total hours
    this.end = date;
    return this.end;
}

Shift.prototype.setWage = function(wage){
    return this.wage = wage;
}

Shift.prototype.addRun = function(run){
    return this.runs.push(run);
}

Shift.prototype.setHours = function(){
    this.hours = Helper.elapsedTime(this.start, this.end);;
    return this.hours;
}

// void -> Number
Shift.prototype.setTotal = function(){
    var wage = this.hours * this.wage;
    var fees = Helper.objArrNumTotals(this.runs, 'fees');
    var tips = Helper.objArrNumTotals(this.runs, 'tips');

    return this.total = wage + fees + tips;
}
*/

module.exports = Shift;
