<template>
	<section>
	<h1>Delivery App</h1>
		<button @click="signIn = true" v-if="!signIn && !signUp">
			Sign In
		</button>

		<button class="usa-button-outline" v-if="!signIn && !signUp"
		        @click="signUp = true">Sign Up</button>

		<div v-if="signIn">
			<form v-on:submit.prevent>
				<input type="text" v-model="user"
						   placeholder="User Name"
							 minlength="4" maxlength="8"
							 required />
				<input type="password" v-model="pass"
		 				   placeholder="Password"
							 minlength="10" maxlength="20"
							 required />
				<input type="submit" value="Sign In" />
			</form>

			<button class="usa-button-secondary"
			        @click="signIn = false">Cancel</button>
		</div>

		<div v-if="signUp">
			<form v-on:submit="submitSignUp"
						action="" method="post">
				<input type="text" v-model="user"
						   placeholder="User Name"
							 minlength="4" maxlength="8"
							 name="user"
							 required />
				<input type="password" v-model="pass"
		 				   placeholder="Password"
							 minlength="10" maxlength="20"
							 name="pass"
							 required />
			  <input type="password" v-model="rePass"
		 				   placeholder="Retype Password"
							 minlength="10" maxlength="20"
							 required />
			 <input type="email" v-model="email"
		 				   placeholder="Email" required
							 name="email" />
				<input type="submit" value="Sign Up" />
			</form>

			<button class="usa-button-secondary"
							@click="signUp = false">Cancel</button>
		</div>
	</section>
</template>

<script>
	var courier = require('../js/courier-import.js');

  module.exports = {
  	data: function(){
  			return {
  				signIn: false,
  				signUp: false,
  				user: '',
  				pass: '',
  				rePass: '',
  				email: ''
  			};
  	},

  	methods: {
      // String -> Void
      toPage: function(page){
        // navigates to specified page
        this.$root.currentPage = page;
  			this.$root.signedIn = true;
      },
  		submitSignUp: function(event){
  			// 1. validate form - HTML5 does this basically?
  			// 2. submit to DB
				event.preventDefault();
  			if(this.pass === this.rePass
  				&& this.user !== '' && this.email !== ''
					&& this.email.indexOf('@') !== -1){

					var userParam = this.user;
					var newUser = new FormData();
					newUser.append('user', this.user);
					newUser.append('pass', this.pass);
					newUser.append('email', this.email);

					console.log('user email', newUser.email);

  				courier.messages.send('signUp', {param: userParam,
																					 upload: newUser});
  				alert('A confimation email will be sent shortly');
  				this.signUp = false;
  			} else {
  				alert('Please fill out form');
  				this.pass = '';
  				this.rePass = '';
  			}

  		},
    }
  };
</script>
