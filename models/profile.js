/*-------------------------------------------------------*/
/*------- Profile Module --------------------------------*/
//const Helper = require('../helpers/helpers');


function Profile(profileName, companyName){
    this.profileName = profileName;
    this.companyName = companyName;
    this.wage = 0;
    // fee as own prototype?
    this.feeBase = 0;
    this.feeDecrement = 0;
    this.locale = '';
    this.shifts = [];

    // calculated totals
    this.total = 0; // total $ made for all shifts
    this.hours = 0; // total hours worked
    this.mileage = 0;
}

/*
// Number -> void
Profile.prototype.setWage = function(wage){
    return this.wage = wage;
}

// Number -> void
Profile.prototype.setFee = function(fee){
    return this.fee = fee;
}

// String -> void;
Profile.prototype.setLocale = function(city){
    return this.locale = city;
}

// Shift -> void
Profile.prototype.addShift = function(shift){
    return this.shifts.push(shift);
}

// void -> void
Profile.prototype.clearShifts = function(){
    return this.shifts = [];
}

// void -> Number
Profile.prototype.setTotal = function(){
    var total  = Helper.objArrNumTotals(this.shifts, 'total');
    return this.total = total;    
}

Profile.prototype.setHours = function(){
    var hours = Helper.objArrNumTotals(this.shifts, 'hours');
    return this.hours = hours;
}
*/

module.exports = Profile;
