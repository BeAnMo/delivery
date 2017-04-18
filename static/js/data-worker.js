/*-------------------------------------------------------*/
/*------- Worker ----------------------------------------*/
onmessage = function(e){
  console.log(e.data);
	// event.data[0] is the command
	var command = e.data[0];
	// event.data[1] is the data
	var data = e.data[1];
	/* worker commands:
	- signUp = submits signUp form to DB
	- signIn = retrieves user profile from DB
	*/

	console.log('received from main: ' + command + '\n' + data);

	switch(command){
		case 'signUp':
			for(var key in data){ console.log(data[key])};
			post(data, '/user/' + data.user);
	}
}


/*-------------------------------------------------------*/
/*------- AJAX ------------------------------------------*/
// should be able to abstract over an XMLHttpRequest for POST/GET/PUT

// Object, String -> Void
function post(data, destination){
	// sends an object to the proper server-side route
	var req = new XMLHttpRequest();

	req.open('post', destination, true);

	req.addEventListener('load', function(event){
		console.log('POST completed');

	});

	req.addEventListener('error', function(event){
		console.log('POST failed');
	});

	req.send(data);
}
