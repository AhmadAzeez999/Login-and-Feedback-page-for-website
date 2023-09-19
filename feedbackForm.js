// Get references to the modal and open button
const modal = document.getElementById('feedbackModal');
const openModalBtn = document.getElementById('openModalBtn');

// When the user clicks the open button, display the modal
openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});

// When the user submits the form, you can add your form submission logic here
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your form submission code here (e.g., sending data to a server)
    // Then close the modal
    modal.style.display = 'none';
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
