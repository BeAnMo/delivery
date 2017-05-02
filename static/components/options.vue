<template>
	<!--
		- don't allow for negative numbers in inputs
		  try min="0" or something
		- check potential user name by making a call to their
		  server/DB for existing user name
			+ can this be as the user types?
		- check email for '@', and let user verify from email
		  sent
	-->
	<section>
		<p>Options page</p>
		<form v-on:submit.prevent>
			<label for="wage">Change Hourly Wage</label>
			<input type="number" id="wage" v-model="wage"
			       :placeholder="this.$root.wage" />
			<p>Delivery Fee?
			<button :class="this.class" @click="feeStatus">
				{{ status }}
			</button>

			<div v-if="hasFee">
				<label for="fee">Base Fee</label>
				<input type="number" step="0.01" id="fee" v-model="fee"
				       :placeholder="this.$root.fee.base" />
				<label for="feeDecr">
					Fee Decrease Per Delivery - 0 if none
				</label>
				<input type="number" step="0.01" id="feeDecr" v-model="feeDecr"
				       :placeholder="this.$root.fee.decrement" />
			</div>
			<input type="submit" value="Save Changes"
			       @click="submitForm"/>
		</form>
	</section>
</template>

<script>
  module.exports = {
  	data: function(){
  		return {
  			class: 'usa-button-outline',
  			status: 'No',
  			wage: Number,
  			fee: Number,
  			feeDecr: Number,
  			hasFee: this.$root.fee.hasFee
  		}
  	},

  	methods: {
  		toPage: function(page){
  			// navigates to a specified page
  			this.$root.currentPage = page;
  			// command is a component method
  			//command();
  		},
  		// Void -> Void
  		feeStatus: function(){
  			// toggles Delivery Fee button
  			// brings up fee form if profile has a fee
  			console.log(this.hasFee);
  			if(this.hasFee === true){
  				this.status = 'No';
  				this.class = 'usa-button-outline';
  				this.hasFee = false;
  			} else if(this.hasFee === false){
  				this.status = 'Yes';
  				this.class = '';
  				this.hasFee = true;
  			}
  		},
  		// Void -> Void
  		submitForm: function(){
  			// sets the profile's options
  			var data = {
  				wage: checkTypeAndReplace(this.wage, 'function', this.$root.wage),
  				fee: checkTypeAndReplace(this.fee, 'function', this.$root.fee.base),
  				feeDecr: checkTypeAndReplace(this.feeDecr, 'function', this.$root.fee.decrement),
  				hasFee: this.hasFee
  			}
  			Event.$emit('click', { type: 'options', data: data });

  			this.toPage('home-page');
  		}
  	}
  };
</script>
