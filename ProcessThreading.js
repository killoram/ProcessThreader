//Process threading with web workers
function thread(mymessage,myerror,processId,nested) {
    if(typeof(Worker) !== "undefined") {
	    this.url = processId;
	    this.message = mymessage;
	    this.error = myerror;
	    if (nested==true) {
	        this.start = function() {
	        	var blob = new Blob([document.getElementById(this.url).textContent]);
	        	this.worker = new Worker(window.webkitURL.createObjectURL(blob));
	        	this.worker.onmessage = this.message;
        		this.worker.onerror = this.error;
	    	};
	    } else {
	    	this.start = function() {
	    		this.worker = new Worker(this.url);
	    		this.worker.onmessage = this.message;
        		this.worker.onerror = this.error;
	    	}
	    }
        this.stop = function() {
		    this.worker.terminate();
		    this.worker = undefined;
		}
    } else {
        alert("Sorry, your browser does not support Web Workers... \n You might want to fix that.");
    }
}

function newProcess(name,source) {
	var script = document.createElement("SCRIPT");
    var t = document.createTextNode(source);
    script.appendChild(t);
    script.type = "javascript/worker";
    script.id = name;
    document.body.appendChild(script);
}
/*
var process = new thread(function(event) { //Assign the new Process to a thread 
    alert(event.data); //create a pop up with the returned text "It works!"
},function() {
    alert("error"); //if there is an error
},"Background", true);//run the "Background" process

newProcess("Background",(function(){ //Create a new background process and tell it to return "It works!"
	process.worker.postMessage("It works!");
})());
process.start();

process.stop();
*/