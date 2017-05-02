<template>
	<section>
		<p>Welcome to the home screen</p>
		<button @click="toPage('shifts-page', startShift)" :disabled="isDisabled">
			New Shift
		</button>
		<p>Time: {{ time() }}</p>
	</section>
</template>

<script>
  module.exports = {
  	data: function(){
  		return { time: function(){
  				return setCurrentTimeDisplay(this.$root.currentTime);
  			}
  		};
  	},

  	methods: {
  		toPage: function(page, command){
        // navigates to a specified page
        this.$root.currentPage = page;
        // alerts worker that a run is starting
        // when new run is started, do not allow user to create
        // a new run
        command()
      },
      startShift: function(){
        this.$root.currentShift = new Shift(6.0);
  			this.$root.pages[3].active = true;
        console.log(this.$root.currentShift);
      }
  	},
  	computed: {
  		// Void -> Boolean
  		isDisabled: function(){
  			// returns false if currentShift is null
  			return this.$root.isDisabled(this.$root.currentShift);
  		}
  	}
  };
</script>
