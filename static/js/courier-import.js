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

export { courier, messages };
