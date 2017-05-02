<template>
  <section>
    <button @click="toPage('runs-page', startRun)"
		        :disabled="isDisabled">
			New Run
		</button>
    <table class="usa-table-borderless">
      <thead>Current Shift Information</thead>
      <tr v-for="item in table">
        <td>{{ item.heading }}</td>
        <td>{{ item.data() }}</td>
      </tr>
    </table>
    <button class="usa-button-secondary"
            @click="toPage('home-page', endShift)">End Shift</button>
  </section>
</template>

<script>
  module.exports = {
    data: function(){
      return {
        table: [
  				/*
          { heading: 'Time', data: this.totalTime() },
          { heading: 'Earnings', data: this.totalEarnings() },
          { heading: 'Wage', data: this.totalWage() },
          { heading: 'Tips', data: this.totalMoney('tips') },
          { heading: 'Fees', data: this.totalMoney('fees') },
  				*/
  				{ heading: 'Time', data:
  					function(){
  						var start = app.currentShift.time.start
  						var elapsed = elapsedTime(start, app.currentTime);
  						return elapsed;
  					}
  				},
          { heading: 'Earnings', data:
  					function(){
  						var start = app.currentShift.time.start
  						var elapsed = elapsedTime(start, app.currentTime);
  						return setTotalOf(app.currentShift.runs, 'fees') +
  									 setTotalOf(app.currentShift.runs, 'tips') +
  									 (elapsed * app.wage);
  					}
  				},
          { heading: 'Wage', data:
  					function(){
  						var start = app.currentShift.time.start
  						var elapsed = elapsedTime(start, app.currentTime);
  						return elapsed * app.wage;
  					}
  				},
          { heading: 'Tips', data:
  					function(){
  						return setTotalOf(app.currentShift.runs, 'tips');
  					}
  				},
          { heading: 'Fees', data:
  					function(a){
  						return setTotalOf(app.currentShift.runs, 'fees');
  					}
  				},
        ]
      };
    },

    methods: {
      // String, Boolean -> Void
      toPage: function(page, command){
        // navigates to a specified page
        this.$root.currentPage = page;
        // command is a component method
        command();
      },
  		// Void -> Void
      startRun: function(){
  			// starts a new run
        this.$root.currentRun = new Run();
  			this.$root.pages[4].active = true;
        console.log(this.$root.currentRun);
      },
  		// Void -> Void
      endShift: function(){
        // calculate totals before ending
  			// should automatically end current run and add
  			// totals before finishing shift
        var shift = this.$root.currentShift;
        shift.time.end = new Date();
        shift.time.total = shift.time.end - shift.time.start;

        console.log(shift.runs)
  			this.$root.pages[3].active = false;
        this.$root.currentShift = null;
      },
  		// when time/earnings/wage are reloaded, they come up NaN
  		// Void -> Number
  		totalTime: function(){

  		},
  		// Void -> Number
  		totalWage: function(){
  			return adjustFloat(this.totalTime() * this.$root.wage, 3);
  		},
  		// Void -> Number
  		totalMoney: function(prop){
  			return setTotalOf(this.$root.currentShift.runs, prop);
  		},
  		// Void -> Number
  		totalEarnings: function(){
  			return this.totalWage() +
  						 this.totalMoney('fees') +
  						 this.totalMoney('tips');
  		}
    },

  	computed: {
  		// Void -> Boolean
  		isDisabled: function(){
  			// returns false if currentRun is null
  			return this.$root.isDisabled(this.$root.currentRun);
  		}
  	}
  };
</script>
