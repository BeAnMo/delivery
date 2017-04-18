/******** Database Testing ********/
const expect    = require('chai').expect;
const Profile   = require('../models/profile');
const toProfile = require('../routes/profile-route');


describe('A new user sign up', function(){
    //DBM.profileTable(); // need to make sure DB can be created
                          // and used if it doesn't exist
    /*
    describe('with a "profile" table', function(){
        it('should have "profile_id" with a primary key', function(){
            getColumnInfo('profile', function(rows){    
                expect(rows[0].name).to.equal('profile_id');
                expect(rows[0].pk).to.equal(1);
            });
        });

        it('should have "profile_locale" as type TEXT', function(){
            getColumnInfo('profile', function(rows){
                expect(rows[6].name).to.equal('profile_locale');
                expect(rows[6].type).to.equal('TEXT');
                expect(rows[6].pk).to.equal(1);
            });  
        });
    });

    describe('with a "shift" table', function(){
        it('should have a "shift_start" as type TEXT', function(){
            // dates as DATE or TEXT or what?
            getColumnInfo('shift', function(rows){
                expect(rows[0].name).to.equal('shift_start');
                expect(rows[0].type).to.equal('TEXT');
            });
        });

        it('should have a foreign_key referencing "profile_id"', function(){
            // check for foreign key, how?
            getColumnInfo('shift', function(rows){
                expect(rows[3].name).to.equal('shift_profile');
                expect(rows[3].type).to.equal('INTEGER');
            });
        });
    });*/
});
