
<template>
  <section>
		<table class="usa-table-borderless">
      <tr>
        <td>Deliveries</td>
        <td>{{ this.$root.currentRun.deliveries.length }}</td>
				<td>Run Time</td>
        <td>{{ time() }}</td>
      </tr>
    </table>
    <form v-on:submit.prevent>
      <!-- cash -->
      <input type="radio" id="formCash"
             v-model="paymentType" value="cash" />
      <label for="formCash">Cash</label>
      <!-- card -->
      <input type="radio" id="formCard"
             v-model="paymentType" value="card" />
      <label for="formCard">Card</label>
      <input type="number" step="0.01" placeholder="Tip Amount"
             v-model="amount" />
      <input type="submit" :disabled="isDisabled"
             @click="submitForm" />
    </form>
    <button class="usa-button-secondary"
            @click="toPage('shifts-page', endRun)">End Run</button>
  </section>
</template>

<script>
  module.exports = {
    // input type as number instead of text makes sure that
    // only numbers are inputted, but popup warns against float
    data: function(){
      return {
        paymentType: '',
        amount: '',
        fee: this.$root.fee.current,
  			time: function(){
  				return elapsedTime(this.$root.currentRun.time.start,
  								           this.$root.currentTime);
  			}
      };
    },

    methods: {
      // String -> Void
      toPage: function(page, command){
        // navigates to specified page
        this.$root.currentPage = page;
        // alerts the worker to end the currentRun
        command();
      },
      // [Event -> Object] -> Void?
      submitForm: function(event){
        // submits delivery info and resets form
        var type = this.paymentType;
        var amount = this.amount;
  			console.log(this.$root.fee.current, type);
        // send to web worker until run is completed?
        // worker sends cumulative data on current run
        var data = new Delivery(parseFloat(amount),
  			                        type,
  															this.$root.fee.current);

        Event.$emit('click', { type: 'delivery', data: data} );

        this.amount = '';
        this.paymentType = '';
        this.$root.feeDecrease();
      },
  		// Void -> Void
      endRun: function(){
  			// use Event.$emit? add to switch statement in App?
        var run = this.$root.currentRun;
        run.time.end = new Date();
        run.time.total = run.time.end - run.time.start;
        run.tips = setTotalOf(run.deliveries, 'tip');
        run.fees = setTotalOf(run.deliveries, 'fee');
        run.total = run.fees + run.tips;

        this.$root.currentShift.total += run.total;
        this.$root.currentShift.runs.push(run);
        this.$root.fee.current = this.$root.fee.base;
        console.log(run.total);
  			this.$root.pages[4].active = false;
        this.$root.currentRun = null;
      }
    },

    computed: {
      // Void -> Boolean
      isDisabled: function(){
        // disables submit button unless certain criteria is met
  			var activeRun = this.$root.isDisabled(this.$root.currentRun);
  			var activeShift = this.$root.isDisabled(this.$root.currentShift);
  			var formNotFilled = this.paymentType === '' || isNumber(this.amount) === false;

  			if(formNotFilled){
  				return true;
  			} else {
  				return false;
  			}
      }
    }
  };
</script>
