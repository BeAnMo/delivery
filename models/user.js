function User(newUser){
  this.username = newUser.name;
  this.password = newUser.pass;
  this.email = newUser.email;
  // user becomes active upon email confirmation
  this.active = false;
}

module.exports = User;
