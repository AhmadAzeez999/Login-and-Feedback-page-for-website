document.addEventListener("DOMContentLoaded", function() 
{
    const productInput = document.getElementById("productInput");
    const results = document.getElementById("results");
    const categories = document.querySelectorAll(".category");
    let currentCategory = 0;

    // Handle the click events for each "Done" button
    for (let i = 1; i <= categories.length + 1; i++) 
    {  
        const doneButton = document.getElementById(`doneButton${i}`);
        doneButton.addEventListener("click", function() 
        {
            // Check if a product name is entered
            if (productInput.value.trim() !== "") 
            {
                doneButton.disabled = true;
                
                if (currentCategory !== categories.length) 
                    categories[currentCategory].style.display = "block";
                else
                    categories[currentCategory - 1].style.display = "block";
                
                // Check if all categories are displayed
                if (currentCategory === categories.length) 
                {
                    results.style.display = "block";
                }
                console.log(currentCategory++);
            }
        });
    }
});

