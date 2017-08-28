 var config = {
    apiKey: "AIzaSyD_tLOLLGOjnUgM3-GdvpDcmvwzjIlPnmo",
    authDomain: "employee-data-management-1d72a.firebaseapp.com",
    databaseURL: "https://employee-data-management-1d72a.firebaseio.com",
    projectId: "employee-data-management-1d72a",
    storageBucket: "employee-data-management-1d72a.appspot.com",
    messagingSenderId: "519511177731"
 };
 
 firebase.initializeApp(config);

 var database = firebase.database();

 $("#add-train-btn").on("click", function(event){
 	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var trainDest = $("#destination-input").val().trim();
	var trainTime = $("#time-input").val().trim();
	var trainFreq = $("#freq-input").val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	};

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	alert("New train successfully added");

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#freq-input").val("");

  });

 database.ref().on("child_added", function(childSnapshot, prevChildKey){

 	console.log(childSnapshot.val());

 	var trainName = childSnapshot.val().name;
 	var trainDest = childSnapshot.val().destination;
 	var trainTime = childSnapshot.val().time;
 	var trainFreq = childSnapshot.val().frequency;

 	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");

	var currentTime = moment();

	var diffTime = moment().diff(moment(trainTimeConverted), "minutes");

	var tRemainder = diffTime % trainFreq;

	var tMinutesTillTrain = trainFreq - tRemainder;

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextArrival = moment(nextTrain).format("h:mm a");

	$("#train-table > tbody").append("<tr><td>"+trainName+"</td><td>"+trainDest+"</td><td>"+trainFreq
		+"</td><td>"+nextArrival+"</td><td>"+tMinutesTillTrain+"</td></tr>");




 });


