/*********************************************************/
/******** Temp Storage ***********************************/
/* Holds info until verifcation then inserts into DB *****/

// User -> TempUser
function TempUser(newUser){
  // this.id = hash?
  this.user = newUser.name;
  this.pass = newUser.pass;
  this.email = newUser.email;
  this.active = false;
  this.date = new Date();
}

// Void -> TempStorage
function TempStorage(){
  this.storage = [];
}

// TempUser -> Void
TempStorage.prototype.addUser = function(user){
  return this.storage.push(user);
}

module.exports = {
  User: TempUser,
  Storage: TempStorage 
}
