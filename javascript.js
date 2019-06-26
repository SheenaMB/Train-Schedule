

var firebaseConfig = {
    apiKey: "AIzaSyDBZHGz8BqmoSeXXKMQZlVo_Br4g41qz_w",
    authDomain: "test-project-c95d9.firebaseapp.com",
    databaseURL: "https://test-project-c95d9.firebaseio.com",
    projectId: "test-project-c95d9",
    storageBucket: "test-project-c95d9.appspot.com",
    messagingSenderId: "536808664402",
    appId: "1:536808664402:web:f5b280efbc835135"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firstTrain = "00:00";
    var frequency = "";

    $("#submit").on("click", function () {
        event.preventDefault()

        name = $("#nameSearch").val().trim();
        destination = $("#destinationSearch").val().trim();
        firstTrain = $("#firstTrainTime").val().trim();
        frequency = $("#frequencyRate").val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

    database.ref().on("child_added", function (snapshot) {
        
        var sv = snapshot.val()
        

        newDiv = $(`
        <tr>
        <th> ${sv.name}</th>
        <th> ${sv.destination}</th>
        <th> ${sv.firstTrain}</th>
        <th></th>
        <th> ${sv.frequency}</th>
        
        </tr>
            `)
        
        $("#list").append(newDiv)

    })

