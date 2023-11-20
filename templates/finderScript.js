document.addEventListener("DOMContentLoaded", function () 
{
    const productInputs = document.querySelectorAll(".productInput");
    const results = document.getElementById("results");
    const categories = document.querySelectorAll(".category");
    let currentCategory = 0;

    // Handle the click events for each "Done" button
    for (let i = 1; i <= categories.length + 1; i++) 
    {
        const doneButton = document.getElementById(`doneButton${i}`);
        const currentInput = document.getElementById(`input${i}`);

        doneButton.addEventListener("click", function (e) 
        {
            e.preventDefault();

            // Check if the product name is entered
            if (currentInput.value.trim() !== "") 
            {
                doneButton.disabled = true;

                // Make the input field read-only
                currentInput.readOnly = true;

                if (currentCategory !== categories.length)
                    categories[currentCategory].style.display = "block";
                else
                    categories[currentCategory - 1].style.display = "block";

                // Check if all categories are displayed
                if (currentCategory === categories.length) {
                    // Use jQuery fadeIn for the result display
                    $("#results").fadeIn("slow");

                    $(".display-control").fadeIn("fast");
                }
                currentCategory++;
                // Change focus
                if (currentCategory === categories.length)
                    productInputs[currentCategory].focus();
            }
        });

        // Add an input event listener to enable/disable the "Done" button based on input
        currentInput.addEventListener("input", function () 
        {
            doneButton.disabled = currentInput.value.trim() === "";
        });

        // Add a keyup event listener to the input field to handle Enter key press
        currentInput.addEventListener("keyup", function (event) 
        {
            if (event.key === "Enter" && currentInput.value.trim() !== "") 
            {
                // Simulate a click on the associated "Done" button
                doneButton.click();
            }
        });
    }

    // Handle the click event for each "Save" button
    $(".result-line button:contains('Save')").click(function () 
    {
        // Find the associated link in the same div
        const link = $(this).siblings("a").attr("href");
        console.log("Save button clicked, Link:", link);
    });

    // jQuery for loading screen
    // note: nice header movement
    $(btn_sub).on("click", function(e) 
    {
        e.preventDefault();

        $(btn_sub).prop('disabled', true);

        $("body").css("overflow", "hidden");

        $("html, body").animate({ scrollTop: 0 }, "fast");

        $(".loader-container").fadeIn("slow");

        setTimeout(function() 
        {
            $(".loader-wrapper").fadeOut("slow", function() 
            {
                enableScrolling();
            });
        }, 3000);
        
    });

    $(window).on("scroll", function (e) {
        e.preventDefault();
    });

    // For the header effect
    let prevScrollPos = window.pageYOffset;
    
    $(window).scroll(function() {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            // Scrolling up
            $('header').slideDown();
        } else {
            // Scrolling down
            $('header').slideUp();
        }

        prevScrollPos = currentScrollPos;
    });

    function enableScrolling() 
    {
        $("body").css("overflow", "auto");
    }

});
