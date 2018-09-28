$(document).ready(function () {
    $("#url").hide();
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

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

    fileButton.addEventListener('change', function (e) {
        //get file
        var file = e.target.files[0];
        //create a store ref
        var storageRef = firebase.storage().ref('images/' + file.name);
        storageRef.getDownloadURL().then(function(url) {
            
            $("#url").text(url);
        });

        //upload file
        var task = storageRef.put(file);
        

        // update progress bar
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {

            },

            function complete() {
               
            }
        );
    });

    // click function to capture the user input
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state :selected").text();
        var description = $("#description").val().trim();
        var imageUrl = $("#url").text();
        
     

        //creating the variable object that will push to the database
        var newContent = {
            name: name,
            email: email,
            city: city,
            state: state,
            description: description,
            imageUrl: imageUrl,
        };

        //pushes new input into the database
        if (name === "" && email === "" && city === "" && state === "" && description === ""()) {
        }
        else {
            database.ref().push(newContent);
        }



   
        //clears the form out for the next entry
        $(".form-control").val("");
        $(".form-control-file").val("");
    })

    database.ref().on("child_added", function(childSnapshot){

        //creation of variables based on the snapshot of the database
        var name = childSnapshot.val().name;
        var email = childSnapshot.val().email;
        var city = childSnapshot.val().city;
        var state = childSnapshot.val().state;
        var description = childSnapshot.val().description;
        var imageUrl = childSnapshot.val().imageUrl

      

     var newCard = $("<div class='card'>").append(
         $('<img class="card-img-top" src="' + imageUrl + '" alt="Photo">'),
         $("<div class='card-body'>"),
         $("<p class='card-text'>").text("Name: " + name),
         $("<p class='card-text'>").text("City: " + city),
        
     )
        

        $(".newCard").prepend(newCard)

    })





});