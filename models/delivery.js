/*-------------------------------------------------------*/
/*------- Delivery Module -------------------------------*/
//const Helper = require('../helpers/helpers');


function Delivery(start){
    this.start = start;
    this.end = '';
    this.paymentType = null;
    this.tip = 0;
    this.fee = 0;
    //this.mileage = mileage; mileage for run?

    //calculated properties
    this.time = 0; // end - start
}
/*
// Date -> void
Delivery.prototype.setEnd = function(date){
    this.end = date;
    return this.setTime();
}

// String -> void
Delivery.prototype.setPayType = function(type){
    return this.paymentType = type;
}

// Number -> void
Delivery.prototype.setTip = function(amount){
    return this.tip = amount;
}

// Number -> void
Delivery.prototype.setFee = function(amount){
    // should be available from user profile
    return this.fee = amount;
}

Delivery.prototype.setTime = function(){
    this.time = Helper.elapsedTime(this.start, this.end);
    return this.time;
}
*/

module.exports = Delivery;
