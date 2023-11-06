document.addEventListener("DOMContentLoaded", function() {
    const productInput = document.getElementById("productInput");
    const doneButton = document.getElementById("doneButton");
    const categories = document.querySelectorAll(".category");
    const results = document.getElementById("results");
    let currentCategory = 0;

    doneButton.addEventListener("click", function() {
        // Check if a product name is entered
        if (productInput.value.trim() !== "") {
            categories[currentCategory].style.display = "block";
            currentCategory++;
            // Check if all categories are displayed
            if (currentCategory === categories.length) {
                results.style.display = "block";
                productInput.style.display = "none";
                doneButton.style.display = "none";
            }
        }
    });
});
