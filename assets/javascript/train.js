// Initialize firebase config

var firebaseConfig = {
    apiKey: "AIzaSyA3J5DQvU80_OCmBOZ5aHaNOiMEn9L4KLE",
    authDomain: "test-35344.firebaseapp.com",
    databaseURL: "https://test-35344.firebaseio.com",
    projectId: "test-35344",
    storageBucket: "test-35344.appspot.com",
    messagingSenderId: "942741665210",
    appId: "1:942741665210:web:3e19d87e21e2ec16"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      var trainName = $("#train-name-input").val();
      var trainDestination = $("#destination-input").val();
      var trainStart = moment($("#train-start-input").val().trim(),"HH:mm").format("X");
      var trainFrequency = $("#frequency-input").val();

    //   console.log(trainName,trainDestination,trainStart,trainFrequency);
    
      var newTrain = {
          train: trainName,
          destination: trainDestination,
          firstTrain: trainStart,
          frequency: trainFrequency
      };

      database.ref().push(newTrain);

    //   console.log(newTrain.train);
    //   console.log(newTrain.destination);
    //   console.log(newTrain.firstTrain);
    //   console.log(newTrain.frequency);

});

database.ref().on('child_added', function(childSanpshot){


    var newTrain = childSanpshot.val().train;
    var trainDestination = childSanpshot.val().destination;
    var trainStart = childSanpshot.val().firstTrain;
    var trainFrequency = childSanpshot.val().frequency;

  
    var formatTime = moment(trainStart, "hh:mm A").subtract(1,"years");
    // console.log("Foramt time: "+formatTime);
    
    var trainTime = moment(formatTime).format("HH:mm");
    // console.log("train time "+trainTime);
    
    var diff = moment().diff(moment(formatTime), "minutes");
    // console.log("diff "+diff);

    var minLeft = diff % trainFrequency; 
    // console.log("mins left "+ minLeft);

    var arivesIn = trainFrequency - minLeft;
    // console.log("time left "+timeLeft);

    var nextTrain = moment().add(arivesIn, "m").format("hh:mm A");
    
   
    var row = $("<tr>").append(
        $("<td>").text(newTrain),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(arivesIn)
    )
    
    $("#train-table > tbody").append(row);

    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-start-input").val("");
    $("#frequency-input").val("");
});