// script.js
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
        console.log('Feedback:', feedback); // Replace this line with the code to save the feedback
        feedbackBox.style.display = 'none';
        feedbackInput.value = ''; // Clear the input after submission
    });

    // Hide the box if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target == feedbackBox) {
            feedbackBox.style.display = 'none';
        }
    });
});
