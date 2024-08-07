const firebaseConfig = {
    apiKey: "AIzaSyATFx-WHCXHC2uA0FZZwIcPO7LAjRh8Wjg",
    authDomain: "energy-coaching-cbbc5.firebaseapp.com",
    databaseURL: "https://energy-coaching-cbbc5-default-rtdb.firebaseio.com",
    projectId: "energy-coaching-cbbc5",
    storageBucket: "energy-coaching-cbbc5.appspot.com",
    messagingSenderId: "85932482016",
    appId: "1:85932482016:web:9852865b84481d33f41f85",
    measurementId: "G-DWJ540T6WE"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

auth.signInWithEmailAndPassword("matthew@laszloenergy.com", "password")
    .then((userCredential) => {
        console.log("User signed in: ", userCredential.user);
    })
    .catch((error) => {
        console.error("Error signing in: ", error);
    });




responseID = "";
function retrieveResponseID() {
    responseID = localStorage.getItem('responseID');
    console.log("Response ID: " + responseID);
}
retrieveResponseID();








document.addEventListener('DOMContentLoaded', function() {
    const feedbackButton = document.getElementById('feedbackButton');
    const feedbackBox = document.getElementById('feedbackBox');
    const closeButton = document.getElementById('closeButton');
    const submitFeedback = document.getElementById('submitFeedback');
    const feedbackInput = document.getElementById('feedbackInput');

    // Show feedback box
    feedbackButton.addEventListener('click', function() {
        feedbackBox.style.display = 'block';
    });

    // Hide feedback box
    closeButton.addEventListener('click', function() {
        feedbackBox.style.display = 'none';
    });

    // Save feedback and hide box
    submitFeedback.addEventListener('click', function() {
        const feedback = feedbackInput.value;



        console.log('Feedback:', feedback); 
        updateFeedbackPoint(feedback);



        feedbackBox.style.display = 'none';
        feedbackInput.value = ''; 
    });

    // Hide the box if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target == feedbackBox) {
            feedbackBox.style.display = 'none';
        }
    });
});


function updateFeedbackPoint(feedback){
    const updates = {};
    updates['/responses/' + responseID + '/' + feedback] = feedback;
    return database.ref().update(updates)
      .then(() => {
        console.log('Field updated successfully');
      })
      .catch((error) => {
        console.error('Error updating field:', error);
      });
}