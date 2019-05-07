// Initialize firebase config

const firebaseConfig = {
    apiKey: "AIzaSyCeX8mD6AQMnPRwuJ-dZ52u8rdCl0fUqyA",
    authDomain: "train-schedule-e5713.firebaseapp.com",
    databaseURL: "https://train-schedule-e5713.firebaseio.com",
    projectId: "train-schedule-e5713",
    storageBucket: "train-schedule-e5713.appspot.com",
    messagingSenderId: "337489442744",
    appId: "1:337489442744:web:1b6dcb6c0b7103a7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      var trainName = $("#train-name-input").val();
      var trainDestination = $("#destination-input").val();
      var trainStart = $("#train-start-input").val();
      var trainFrequency = $("#frequency-input").val();

      console.log(trainName,trainDestination,trainStart,trainFrequency);
    
      var newTrain = {
          train: trainName,
          destination: trainDestination,
          firstTrain: trainStart,
          frequency: trainFrequency
      };

      database.ref().push(newTrain);

});
