/******** Database Testing ********/
const expect    = require('chai').expect;
const Profile   = require('../models/profile');
const toProfile = require('../routes/profile-route');


describe('A new user sign up', function(){
    describe('when sign up form submitted', function(){
        it("should send an email to the given email address", function(){
            // send mock email
        });
    }); 
});
