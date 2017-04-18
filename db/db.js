/******** Database Module ********/
const sqlite3  = require('sqlite3').verbose();
const path     = require('path');

const Profile  = require('../models/profile');
const Shift    = require('../models/shift');
const Run      = require('../models/run');
const Delivery = require('../models/delivery');

const dbPath   = path.resolve('./test.db', '../test.db');
const db       = new sqlite3.Database(dbPath);

// !!! remember to turn foreign keys on !!!

// void -> void
function createProfileTable(){
    // creates a new table with the specified fields
    db.run('CREATE TABLE profile ' +
           '(profile_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           'profile_name TEXT,' +
           'profile_company TEXT, ' +
           'profile_wage FLOAT, ' +
           'profile_fee FLOAT, ' +
           'profile_rate FLOAT, ' +
           'profile_locale TEXT)');
}

// void -> void
function createShiftTable(){
    db.run('CREATE TABLE shift ' +
           '(shift_start TEXT, ' +
           'shift_end TEXT, ' +
           'shift_delivery_hours FLOAT, ' +
           'shift_profile INTEGER, ' +
           'FOREIGN KEY(shift_profile) REFERENCES profile(profile_id))');
}


module.exports = {
    database:     db,
    path:         dbPath,
    profileTable: createProfileTable,
    shiftTable:   createShiftTable,
}
