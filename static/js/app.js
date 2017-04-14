/*-------- Notes ----------------------------------------
- when shift has ended, push to worker for AJAX to DB
- when app starts, use worker to AJAX server for past data

- toPage function needs to be abstracted

- use localstorage as temp way to test app in real world
-------------------------------------------------------*/

/*-------------------------------------------------------*/
/*-------- Event Listener -------------------------------*/
window.Event = new Vue({});


/*-------------------------------------------------------*/
/*-------- Base Data ------------------------------------*/
// Date -> Time
function Time(start){
	this.start = start;
	this.end = '';
	this.total = 0;
}

// Number, Number, Number -> Delivery
function Delivery(amount, type, fee){
	this.tip = amount;
	this.paymentType = type;
	this.fee = fee;
}

// Void -> Run
function Run(){
	this.time = new Time(new Date());
	this.fees = 0;
	this.tips = 0;
	this.total = 0;
	this.deliveries = [];
}

// Number -> Shift
function Shift(wage){
	this.time = new Time(new Date());
	this.wage = wage;
	this.total = 0;
	this.runs = [];
}


/*-------------------------------------------------------*/
/*-------- Pages ----------------------------------------*/
//-------- Base ---------/
var basePage = {
  template: `
    <div class="usa-grid" id="page">
      <slot></slot>
    </div>
  `
};

//-------- Home --------//
var homePage = {
  template: `
		<section>
			<p>Welcome to the home screen</p>
			<button @click="toPage('shifts-page', startShift)" :disabled="isDisabled">
				New Shift
			</button>
		</section>
	`,
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

//-------- Totals --------//
var totalsPage = {
  template: `<section><p>Totals page</p></section>`
};

//-------- Options --------//
var optionsPage = {
	data: function(){
		return {
			class: 'usa-button-outline',
			status: 'No',
			wage: Number,
			fee: Number,
			feeDecr: Number,
			hasFee: false
		}
	},
  template: `
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
					<input type="number" id="fee" v-model="fee"
					       :placeholder="this.$root.fee.base" />
					<label for="feeDecr">
						Fee Decrease Per Delivery - 0 if none
					</label>
					<input type="number" id="feeDecr" v-model="feeDecr"
					       :placeholder="this.$root.fee.decrement" />
				</div>
				<input type="submit" value="Save Changes"
				       @click="submitForm"/>
			</form>
		</section>
		`,

		methods: {
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
					wage: this.wage,
					fee: this.fee,
					feeDecr: this.feeDecr,
					hasFee: this.hasFee
				}
				Event.$emit('click', { type: 'options', data: data });
			}
		}
};

//-------- Shifts --------//
var shiftsPage = {
  data: function(){
    return {
      table: [
        { heading: 'Time', data: this.totalTime()},
        { heading: 'Earnings', data: this.totalEarnings() },
        { heading: 'Wage', data: this.totalWage() },
        { heading: 'Tips', data: this.totalMoney('tips') },
        { heading: 'Fees', data: this.totalMoney('fees') },
      ]
    };
  },

  template: `
    <section>
      <button @click="toPage('runs-page', startRun)"
			        :disabled="isDisabled">
				New Run
			</button>
      <table class="usa-table-borderless">
        <thead>Current Shift Information</thead>
        <tr v-for="item in table">
          <td>{{ item.heading }}</td>
          <td>{{ item.data }}</td>
        </tr>
      </table>
      <button class="usa-button-secondary"
              @click="toPage('home-page', endShift)">End Shift</button>
    </section>
  `,

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
			if(this.$root.isDisabled(this.$root.currentShift)){
				return 0.0;
			}
			return elapsedTime(this.$root.currentShift.time.start, new Date());
		},
		// Void -> Number
		totalWage: function(){
			return this.totalTime() * this.$root.wage;
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

//-------- Runs --------//
var runsPage = {
  // input type as number instead of text makes sure that
  // only numbers are inputted, but popup warns against float
  data: function(){
    return {
      paymentType: '',
      amount: '',
      fee: this.$root.fee.current,
			time: elapsedTime(this.$root.currentRun.time.start, new Date())
    };
  },

  template: `
    <section>
			<table class="usa-table-borderless">
        <tr>
          <td>Deliveries</td>
          <td>{{ this.$root.currentRun.deliveries.length }}</td>
					<td>Run Time</td>
          <td>{{ time }}</td>
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
        <input type="number" placeholder="Tip Amount"
               v-model="amount" />
        <input type="submit" :disabled="isDisabled"
               @click="submitForm" />
      </form>
      <button class="usa-button-secondary"
              @click="toPage('shifts-page', endRun)">End Run</button>
    </section>
  `,

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

/*-------------------------------------------------------*/
/*-------- Side Menu ------------------------------------*/
//-------- Menu --------//
var navMenu = {
  template: `
    <div class="usa-nav-container">
      <div class="usa-navbar">
        <button class="usa-menu-btn">Menu</button>
        <div class="usa-logo">
					<!-- if run or shift in progress, have an alert here -->
          <em class="usa-logo-text">Delivery App.v2</em>
        </div>
      </div>
      <slot></slot>
    </div>
  `
};

//-------- List for the nav-menu --------//
var navList = {
  template: `
    <nav role="navigation" class="usa-nav">
      <button class="usa-nav-close">
        <img src="img/close.svg" alt="close" />
      </button>
      <!-- would like to put current page on menu bar -->
      <em class="usa-logo-text">{{ this.$root.currentPage }}</em>
      <ul class="usa-nav-primary usa-accordian">
          <slot></slot>
      </ul>
    </nav>
  `
};

//-------- List item in nav-menu --------//
var navItem = {
  props: ['page'],
  template: `
    <li>
      <a class="usa-nav-link" href="#" v-if="page.active"
         @click="toPage(page.page)">
        <span><slot></slot></span>
      </a>
			<a class="usa-background-dark" href="#" v-else>
        <span><slot></slot></span>
      </a>
    </li>
  `,
  methods: {
    // String -> Void
    toPage: function(page){
      // navigates to specified page
      this.$root.currentPage = page;
    }
  }
};

/*-------------------------------------------------------*/
/*-------- Main Vue Instance ----------------------------*/
var app = new Vue({
  el: '#app',

  data: {
		// profile data will be pulled from the DB
		wage: 0.00,
    fee: {
			hasFee: false,
      base: 0.0,
      current: 0.0,
      decrement: 0.0
    },
    currentShift: null,
    currentRun: null,

    pages: [
      { page: 'home-page', name: 'Home', active: true },
      { page: 'totals-page', name: 'View Totals', active: true },
      { page: 'options-page', name: 'Edit Options', active: true},
			{ page: 'shifts-page', name: 'Shift', active: false },
      { page: 'runs-page', name: 'Current Run', active: false },
    ],
    currentPage: 'home-page',
  },

  components: {
    // menu
    'nav-item': navItem,
    'nav-list': navList,
    'nav-menu': navMenu,
    // base template
    'base-page': basePage,
    // pages
    'home-page': homePage,
    'shifts-page': shiftsPage,
    'runs-page': runsPage,
    'totals-page': totalsPage,
    'options-page': optionsPage
  },

  methods: {
		// Void -> Void
    feeDecrease: function(){
			// decrease the fee for the currentRun
      this.fee.current -= this.fee.decrement;
    },
		// Object|null -> Boolean
		isDisabled: function(current){
			// returns false if current is active
			if(current === null){
				return false;
			} else {
				return true;
			}
		}
  },

  computed: {

  },

  created: function(){
    Event.$on('click', function(data){
			var type = data.type;
			var received = data.data;

      console.log('submitted to App:', type);
			switch (data.type){
				case 'options':
					app.wage = received.wage;
					app.fee.base = received.fee;
					app.fee.amount = received.fee;
					app.fee.decrement = received.feeDecr;
					app.fee.hasFee = received.hasFee
					break;
				case 'delivery':
					app.currentRun.deliveries.push(received);
					break;
			}
    });
  }
});


/*-------------------------------------------------------*/
/*-------- Functions ------------------------------------*/
// Number -> Boolean
function isNumber(n){
  // checks to make sure input is a number
  // !!! fix !!!
  // if number is followed by a non-number it will produce true
	var input = parseFloat(n);
	return input <= 0 || input >= 0;
}

// Array-of-Objects, String -> Number
function setTotalOf(arr, prop){
    // loops through an array and adds all numeric values associated
    // with the specified property in each object
    var total = 0;

    arr.forEach(function(current){
        total += current[prop];
    });

    return total;
}

// Date, Date -> Number
function elapsedTime(start, end){
  // elapsedTime in hours.mins
  return ((end - start)/ 1000 / 3600).toFixed(2);
}

// Object -> Void
function storeShiftInfo(shift){
	var store = JSON.stringify(shift);
	localStorage.setItem('shiftInfo', store);
}

// Void -> Void
function restoreShiftInfo(){
	var restore = JSON.parse(localStorage.getItem('shiftInfo'));
	return restore;
}

window.addEventListener('unload', function(){
	var saved = {
		wage: app.wage,
    fee: {
			hasFee: app.fee.hasFee,
      base: app.fee.base,
      current: app.fee.current,
      decrement: app.fee.decrement
    },
		shift: app.currentShift,
		run: app.currentRun,
		pages: app.pages
	}
	console.log(saved);
	return storeShiftInfo(saved);
});

window.addEventListener('load', function(){
	var loaded = restoreShiftInfo();
	app.wage = loaded.wage;
	app.fee.hasFee = loaded.fee.hasFee;
	app.fee.base = loaded.fee.base;
	app.fee.current = loaded.fee.current;
	app.fee.decrement = loaded.fee.decrement;
	app.currentShift = loaded.shift;
	app.currentRun = loaded.run;
	app.pages = loaded.pages;
});
