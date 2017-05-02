/******** Database Module ********************************/
const sqlite3  = require('sqlite3').verbose();
const path     = require('path');

const User     = require('../models/user'),
      Profile  = require('../models/profile'),
      Shift    = require('../models/shift'),
      Run      = require('../models/run'),
      Delivery = require('../models/delivery');

const dbPath   = path.resolve('./test.db', '../test.db');
const db       = new sqlite3.Database(dbPath);

// !!! remember to turn foreign keys on !!!
/*
- user table:
  + user#1:
    # options
    # profile#1:
      - shift#1:
        + run#1:
          # delivery#1
*/
/*-------------------------------------------------------*/
/*------- DB Checking -----------------------------------*/
// String, Function -> Boolean
function isTablePresent(table, callback){
    // checks DB for presense of specific table

    // Error, Object -> Boolean
    function checkOutput(err, row){
        if(err) return console.log(err);

        return console.log(row.name === table);
    }

    db.get('SELECT name FROM sqlite_master ' +
           'WHERE type="table" AND name="users"',
            callback);
}


/*-------------------------------------------------------*/
/*------- Table Creation --------------------------------*/
// void -> void
function createUserTable(){
  // creates a table of users
  // created if table does not exist on server launch
  // maybe have fields for user agent stuff?
  // ex: OS, browser, hardware
  db.run('CREATE TABLE users ' +
        '(user_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'user_active BOOL, ' +
        'user_name TEXT, ' +
        'user_email TEXT, ' +
        'user_pass TEXT, ' +
        'user_signup_date TEXT)');
}

// void -> void
function createProfileTable(){
    // creates a new table with the specified fields
    // created when user creates a profile
    // profile will point to specific user
    // maybe FOREIGN KEY (profile_user) REFERENCES user(user_id)?
    db.run('CREATE TABLE profiles ' +
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
    // created when user creates a profile
    db.run('CREATE TABLE shifts ' +
           '(shift_start TEXT, ' +
           'shift_end TEXT, ' +
           'shift_delivery_hours FLOAT, ' +
           'shift_profile INTEGER, ' +
           'FOREIGN KEY(shift_profile) REFERENCES profile(profile_id))');
}

// void -> void
function createRunTable(){
  // created when user creates a profile
  db.run('CREATE TABLE runs ' +
        '(run_start TEXT, ' +
        'run_end TEXT, ' +
        'run_shift INTEGER, ' +
        // foreign key reference parent shift or parent profile?
        'FOREIGN KEY(run_shift) REFERENCES shift(shift_profile))');
}

// void -> void
function createDeliveryTable(){
  // created when user creates a profile
  db.run('CREATE TABLE deliveries ' +
        '(delivery_start TEXT, ' +
        'delivery_end TEXT, ' +
        'delivery_payment TEXT, ' +
        'delivery_tip FLOAT, ' +
        'delivery_fee FLOAT, ' +
      // mileage?
        'delivery_run INTEGER, ' +
        'FOREIGN KEY(delivery_run) REFERENCES run(run_shift))');
}


/*-------------------------------------------------------*/
/*------- Table Updates & Insertions --------------------*/
// Object -> void
function createDBstatement(obj){
  // creates a statement for insertion into the DB
  var statement = db.prepare(obj.query);

  statement.run(obj.params);

  return statement.finalize();
}

// User -> void
function createUserEntry(appUser){
  // consumes a User and returns an object for DB insertions
  var userInsert = {
    query: 'INSERT INTO users ' +
           '(user_active, user_name, user_pass, ' +
           'user_email, user_signup_date)' +
           'VALUES (?, ?, ?, ?, ?)',
    params: [
      appUser.active,
      appUser.username,
      appUser.password,
      appUser.email,
      new Date.toString()
    ]
  };

  return userInsert;
}

module.exports = {
    database:      db,
    path:          dbPath,
    tablePresent:  isTablePresent,
    userTable:     createUserTable,
    profileTable:  createProfileTable,
    shiftTable:    createShiftTable,
    runTable:      createRunTable,
    deliveryTable: createDeliveryTable
}
