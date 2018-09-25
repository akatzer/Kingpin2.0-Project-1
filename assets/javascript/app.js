$(document).ready(function () {

    // initialize firebase
    var config = {
        apiKey: "AIzaSyDNHswzcLNEGN71DxCVdSxCs-fVupsLODc",
        authDomain: "kingpin-project-1.firebaseapp.com",
        databaseURL: "https://kingpin-project-1.firebaseio.com",
        projectId: "kingpin-project-1",
        storageBucket: "kingpin-project-1.appspot.com",
        messagingSenderId: "66745041672"
    };
    firebase.initializeApp(config);

    // Creating database variable
    var database = firebase.database();

    // click function to capture the user input
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state :selected").text();
        var description = $("#description").val().trim();

        //creating the variable object that will push to the database
        var newContent = {
            name: name,
            email: email,
            city: city,
            state: state,
            description: description
        };

        //pushes new input into the database
        database.ref().push(newContent);

        //clears the form out for the next entry
        $(".form-control").val("");
        $(".form-control-file").val("");
    })






































































});