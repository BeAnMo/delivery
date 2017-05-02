const sqlite = require('sqlite3').verbose();

const path = './test.db';
const db = new sqlite.Database(path);

// String -> Boolean
function isTablePresent(table){
    // checks DB for presense of specific table

    // Error, Object -> Boolean
    function checkOutput(err, row){
        if(err) return console.log(err);

        return console.log(row.name === table);
    }

    db.get('SELECT name FROM sqlite_master ' +
           'WHERE type="table" AND name="users"',
            checkOutput);
}

function dbExists(path){
  return fs.stat(path, function(err, stats){
    
  });
}

module.exports = {
    check: isTablePresent
}
