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

// var name = "";
// var destination = "";
// var firstTrain = "00:00";
// var frequency = "";

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

// To calculate the next arrival 
//first take firstTrainTime and calculate ALL train times based off frequency
//then get how many trains have come through since the first time.
//then get when the next train is coming and subtract the first time.


database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val()
    let trainName = sv.name;
    let destination= sv.destination;
    let firstTrainTime = moment(sv.firstTrain, "HH:mm")
    let frequencySnap = snapshot.val().frequency

    let minutefromFirst = moment().diff(firstTrainTime, "minutes");
    let numberOfStops = Math.ceil(minutefromFirst / parseInt(frequencySnap));
    let minutesAway = numberOfStops * frequencySnap - minutefromFirst;
    let nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    
    console.log(minutefromFirst);
    // console.log(numberOfStops);
    // console.log(nextArrival);

    

    newDiv = $(`
        <tr>
        <th> ${trainName}</th>
        <th> ${destination}</th>
        <th> ${frequencySnap}</th>
        <th>${nextArrival}</th>
        <th> ${minutesAway}</th>
        </tr>
            `)

    $("#list").append(newDiv)

})

