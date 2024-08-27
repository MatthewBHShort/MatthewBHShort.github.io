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

// auth.signInWithEmailAndPassword("matthew@laszloenergy.com", "password")
//     .then((userCredential) => {
//         console.log("User signed in: ", userCredential.user);
//     })
//     .catch((error) => {
//         console.error("Error signing in: ", error);
//     });


firebase.auth().signInAnonymously()
.then(() => {
  console.log('Signed in anonymously');
})
.catch(error => {
  console.error('Error signing in anonymously', error);
});




responseID = "";
function retrieveResponseID() {
    responseID = localStorage.getItem('responseID');
    // responseID = "-O3jSL5W3eVH8tmEYn41";
    console.log("Response ID: " + responseID);
}
retrieveResponseID();








document.addEventListener('DOMContentLoaded', function() {

    const feedbackBox = document.getElementById('feedbackBox');

    const submitFeedback = document.getElementById('submitFeedback');
    const feedbackInput = document.getElementById('feedbackInput');



    // Save feedback and hide box
    submitFeedback.addEventListener('click', function() {
        const feedback = feedbackInput.value;
        let emailValue = document.getElementById('email').value;
        let nameValue = document.getElementById('name').value;


        console.log("Name: " + nameValue);
        console.log("Email: " + emailValue);
        console.log('Feedback:', feedback); 
        updateFeedbackPoint(feedback, emailValue,nameValue);



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


function updateFeedbackPoint(feedback,email,name){
    const updates = {};
    updates['/responses/' + responseID + '/' + "email"] = email;
    updates['/responses/' + responseID + '/' + "feedback"] = feedback;
    updates['/responses/' + responseID + '/' + "name"] = name;
    return database.ref().update(updates)
      .then(() => {
        console.log('Field updated successfully');
        window.location.href = 'results.html';
      })
      .catch((error) => {
        console.error('Error updating field:', error);
      });
}