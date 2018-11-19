

$("document").ready(function () {

    $(document).on("click", ".btn", function (e) {
        (e).preventDefault();

        let trainName = $("#train-name").val().trim();
        let destination = $("#destination").val().trim();
        let startTime = $("#start-time").val().trim();
        let frequency = $("#frequency").val().trim();
 

        database.ref().push({
            trainName: trainName,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
        });

    });
    


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0vgqQhcgCRFTtF9S1DQJHJ9me-yunQIU",
    authDomain: "dan-train-times.firebaseapp.com",
    databaseURL: "https://dan-train-times.firebaseio.com",
    projectId: "dan-train-times",
    storageBucket: "dan-train-times.appspot.com",
    messagingSenderId: "101319118240"
  };
  firebase.initializeApp(config);


 

    database = firebase.database();

    database.ref().on("child_added", function (childSnapshot) {


       let nextArrival = moment(childSnapshot.val().startTime, "HH:mm").add(childSnapshot.val().frequency, "minutes").format("hh:mm a");
       let minutesLeft = moment.duration((moment(childSnapshot.val().startTime, "HH:mm").add(childSnapshot.val().frequency, "minutes")).diff(moment()));

        $("tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>"
         + childSnapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>"+ minutesLeft.asMinutes() +  "</td></tr>");



    });




});

