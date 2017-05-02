/*********************************************************/
/******** Database Testing *******************************/
const expect  = require('chai').expect;
const sqlite3 = require('sqlite3').verbose;
const DBM     = require('../db/db');


describe('A SQLite database', function(){
    // need to make sure DB can be created
    // and used if it doesn't exist
    describe('with a "users" table', function(){
      it('should be present', function(){
        DBM.tablePresent('users', function(err, row){
          if(err) return console.log(err);

          expect(row.name).to.equal('users');
          expect(row.name).to.not.equal('undefined');
        });
      });
    });

    // once user has verified email, create rest of tables
    // if user exists, then check everything else
    describe('with a "profiles" table', function(){
        it('should have "profile_id" with a primary key', function(){
            getColumnInfo('profiles', function(rows){
                expect(rows[0].name).to.equal('profile_id');
                expect(rows[0].pk).to.equal(1);
            });
        });

        it('should have "profile_locale" as type TEXT', function(){
            getColumnInfo('profiles', function(rows){
                expect(rows[6].name).to.equal('profile_locale');
                expect(rows[6].type).to.equal('TEXT');
                expect(rows[6].pk).to.equal(1);
            });
        });
    });

    describe('with a "shifts" table', function(){
        it('should have a "shift_start" as type TEXT', function(){
            // dates as DATE or TEXT or what?
            getColumnInfo('shifts', function(rows){
                expect(rows[0].name).to.equal('shift_start');
                expect(rows[0].type).to.equal('TEXT');
            });
        });

        it('should have a foreign_key referencing "profile_id"', function(){
            // check for foreign key, how?
            getColumnInfo('shifts', function(rows){
                expect(rows[3].name).to.equal('shift_profile');
                expect(rows[3].type).to.equal('INTEGER');
            });
        });
    });
});

// String -> [Array -> ?]
function getColumnInfo(table, testCallback){
    // checks a table for info provided through the callback
    DBM.database.all('PRAGMA table_info(' + table + ')', [],
            function(err, rows){
                if(err) throw new Error('Error: ', err);

                else {
                    return testCallback(rows);
                }
            });
}
