/*-------- Notes ----------------------------------------
- when shift has ended, push to worker for AJAX to DB
- when app starts, use worker to AJAX server for past data

- toPage function needs to be abstracted

- use localstorage as temp way to test app in real world

- login/create profile:
  # welcome page should have sign in/sign up
	# sign up asks for:
	  + profile name
		+ company name
		+ email
		+ password
	# sign in asks for:
	  + profile name
		+ password
	# both sign in/up send info to server
	  + if valid, launches home page
		+ else error page
-------------------------------------------------------*/


/*-------------------------------------------------------*/
/*------- Worker ----------------------------------------*/
const courier = new Worker('js/data-worker.js');

var messages = {
	send: function(message, data){
		if(arguments.length === 2){
			courier.postMessage([message, data]);
		} else {
			courier.postMessage([message]);
		}
	}
}

courier.onmessage = function(e){
	/* worker replies:
		 e.data[0] = reply
		 e.date[1] = data
	*/
	var reply = e.data[0];
	var data = e.data[1];

	switch(reply){

	}
}

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

// String, String -> Profile
function Profile(pName, cName){
	this.shifts = [];
	this.profileName = pName;
	this.companyName = cName;
	this.wage = 0.0;
	this.fee = {
		base: 0.0,
		decrement: 0.0
	};
}


/*-------------------------------------------------------*/
/*-------- Pages ----------------------------------------*/
//-------- Base ---------/
/*
var basePage = {
  template: `
    <div class="usa-grid" id="page">
      <slot></slot>
    </div>
  `
};
*/
//-------- Sign In/Up --------//
/*
var loginPage = {
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
	// should display header bar but not menu
	// v-on:submit.prevent to prevent form submissions
	template: `
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
								 minlength="8" maxlength="12"
								 required />
					<input type="submit" value="Sign In" />
				</form>

				<button class="usa-button-secondary"
				        @click="signIn = false">Cancel</button>
			</div>

			<div v-if="signUp">
				<form v-on:submit.prevent>
					<input type="text" v-model="user"
							   placeholder="User Name"
								 minlength="4" maxlength="8"
								 required />
					<input type="password" v-model="pass"
			 				   placeholder="Password"
								 minlength="8" maxlength="12"
								 required />
				  <input type="password" v-model="rePass"
			 				   placeholder="Retype Password"
								 minlength="8" maxlength="12"
								 required />
				 <input type="email" v-model="email"
			 				   placeholder="Email" required />
					<input type="submit" value="Sign Up"
					       @click="submitSignUp" />
				</form>

				<button class="usa-button-secondary"
								@click="signUp = false">Cancel</button>
			</div>
		</section>
	`,

	methods: {
    // String -> Void
    toPage: function(page){
      // navigates to specified page
      this.$root.currentPage = page;
			this.$root.signedIn = true;
    },
		submitSignUp: function(){
			// 1. validate form - HTML5 does this basically?
			// 2. submit to DB
			if(this.pass === this.rePass
				&& this.user !== '' && this.email !== ''){
				var newUser = {
					user: this.user,
					pass: this.pass,
					email: this.email
				}
				messages.send('signUp', newUser);
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
*/

//-------- Home --------//
/*
var homePage = {
	data: function(){
		return { time: function(){
				return setCurrentTimeDisplay(this.$root.currentTime);
			}
		};
	},
  template: `
		<section>
			<p>Welcome to the home screen</p>
			<button @click="toPage('shifts-page', startShift)" :disabled="isDisabled">
				New Shift
			</button>
			<p>Time: {{ time() }}</p>
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
*/

//-------- Totals --------//
/*
var totalsPage = {
  template: `<section><p>Totals page</p></section>`
};
*/

//-------- Options --------//
/*
var optionsPage = {
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
		`,

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
*/

//-------- Shifts --------//
/*
var shiftsPage = {
  data: function(){
    return {
      table: [

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
          <td>{{ item.data() }}</td>
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
*/

//-------- Runs --------//
/*
var runsPage = {
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

  template: `
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
*/

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
		signedIn: false,
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
		currentTime: new Date(),

    pages: [
      { page: 'home-page', name: 'Home', active: true },
      { page: 'totals-page', name: 'View Totals', active: true },
      { page: 'options-page', name: 'Edit Options', active: true},
			{ page: 'shifts-page', name: 'Shift', active: false },
      { page: 'runs-page', name: 'Current Run', active: false },
    ],
    currentPage: 'login-page',
  },

  components: {
    // menu
    'nav-item': navItem,
    'nav-list': navList,
    'nav-menu': navMenu,
    // base template
    'base-page': basePage,
    // pages
		'login-page': loginPage,
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
			// you're killing me JS
      //(this.fee.current -= this.fee.decrement).toFixed(2);
			var newFee = this.fee.current - this.fee.decrement;
  		newFee = (newFee).toString();
  		var dot = newFee.indexOf('.');
  		newFee = newFee.substring(0, dot + 2);
  		return this.fee.current = parseFloat(newFee);
    },
		// Object|null -> Boolean
		isDisabled: function(current){
			// returns false if current is active
			if(current === null){
				return false;
			} else {
				return true;
			}
		},
		setCurrentTime: function(){
			this.currentTime = new Date();
		},
  },

  computed: {

  },

	mounted: function(){
		this.interval = setInterval(this.setCurrentTime, 1000);
	},

	beforeDestroy: function(){
		clearInterval(this.interval);
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
					app.fee.current = received.fee;
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
function setTotalOf_original(arr, prop){
    // loops through an array and adds all numeric values associated
    // with the specified property in each object
    var total = 0;

    arr.forEach(function(current){
        total += current[prop];
    });

    return total;
}

function setTotalOf(arr, prop){
	return arr.reduce(function(base, current){
		return base + current[prop];
	}, 0);
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

// Date -> String
function setCurrentTimeDisplay(now){
	var hour = now.getHours();
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	if(hour < 10){ hour = '0' + hour; }
	if(mins < 10){ mins = '0' + mins; }
	if(secs < 10){ secs = '0' + secs; }
	return hour + ':' + mins + ':' + secs;
}

// !!! still getting excessive floats !!!
// Number, Number -> Number
function adjustFloat(n, place){
	// returns a number n to (place - 1) decimal places
	// because JS apparently can't handle floats precisely
  n = (n).toString();
  var dot = n.indexOf('.');
  n = n.substring(0, dot + place);
  return parseFloat(n);
}

// Primitive, String, Primitive -> Primitive
function checkTypeAndReplace(item, type, replacement){
	// checks the item to determine its type
	if(typeof(item) === type){
		return replacement;
	} else {
		return item;
	}
}

// Void -> Void
function startTime(){
	// updates current time every second
	var now = new Date();
	setInterval(startTime, 1000);
}

/*-------------------------------------------------------*/
/*-------- Local Storage --------------------------------*/
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

window.addEventListener('', function(){
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
