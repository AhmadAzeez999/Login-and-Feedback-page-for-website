document.addEventListener("DOMContentLoaded", function () 
{
    const productInputs = document.querySelectorAll(".productInput");
    const results = document.getElementById("results");
    const categories = document.querySelectorAll(".category");
    let currentCategory = 0;

    const submitBtn = document.getElementById("btn_sub");
    const addBtn = document.getElementById("btn_add");

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

                if (currentCategory !== categories.length)
                    categories[currentCategory].style.display = "flex";
                else
                    categories[currentCategory - 1].style.display = "flex";

                // Check if all categories are displayed
                if (currentCategory === categories.length) {
                    // Use jQuery fadeIn for the result display
                    $(".display-buttons").fadeIn("slow");
                    $("#btn_sub").focus();
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

        setInterval(createMissile, 2000);

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
        }, 24500); // wait time
        
    });

    $(window).on("scroll", function (e) {
        e.preventDefault();
    });

    submitBtn.addEventListener("click", function()
    {
        addBtn.disabled = true;

        $("#results").fadeIn("slow");

        $(".display-control").fadeIn("fast");
    });

    // For display tip box
    $('#tooltipButton').hover(
        function(event) {
          $('#tooltip')
            .css({
              display: 'block',
              left: event.pageX + 10, // Adjust as needed
              top: event.pageY + 10   // Adjust as needed
            });
        },
        function() {
          $('#tooltip').css('display', 'none');
        }
      );

    $(document).mousemove(function(event) 
    {
    if ($('#tooltip').css('display') === 'block') {
        $('#tooltip')
        .css({
            left: event.pageX + 10, // Adjust as needed
            top: event.pageY + 10   // Adjust as needed
        });
    }
    });

    function enableScrolling() 
    {
        $("body").css("overflow", "auto");
    }

    // jQuery for the dropdown functionality
    $('.collapse-btn').click(function () 
    {
        $(this).parent('.store-container').toggleClass('collapsed');
    });

    // Game script
    const robot = document.getElementById('robot');
    const gameContainer = document.getElementById('game-container');

    function createMissile() 
    {
        console.log("creating missile");

        const missile = document.createElement('div');
        missile.className = 'missile';
        gameContainer.appendChild(missile);

        const startPosition = Math.floor(Math.random() * 4);
        let startValue;

        switch (startPosition) 
        {
            case 0: // Top
                startValue = Math.random() * window.innerWidth;
                missile.style.top = `0px`;
                missile.style.left = `${startValue}px`;
                break;
            case 1: // Right
                startValue = Math.random() * window.innerHeight;
                missile.style.top = `${startValue}px`;
                missile.style.left = `${window.innerWidth}px`;
                break;
            case 2: // Bottom
                startValue = Math.random() * window.innerWidth;
                missile.style.top = `${window.innerHeight}px`;
                missile.style.left = `${startValue}px`;
                break;
            case 3: // Left
                startValue = Math.random() * window.innerHeight;
                missile.style.top = `${startValue}px`;
                missile.style.left = `0px`;
                break;
        }

        const robotX = robot.offsetLeft + robot.offsetWidth / 2;
        const robotY = robot.offsetTop + robot.offsetHeight / 2;

        const missileX = parseFloat(missile.style.left) + missile.offsetWidth / 2;
        const missileY = parseFloat(missile.style.top) + missile.offsetHeight / 2;

        const distance = Math.sqrt(Math.pow(robotX - missileX, 2) + Math.pow(robotY - missileY, 2));

        const speed = 150; // Adjust the speed as needed

        const duration = distance / speed;

        missile.style.transition = `top ${duration}s linear, left ${duration}s linear`;
        missile.style.top = `${robotY - missile.offsetHeight / 2}px`;
        missile.style.left = `${robotX - missile.offsetWidth / 2}px`;

        missile.addEventListener('click', () => {
            missile.remove();
        });

        missile.addEventListener('transitionend', () => {
            missile.remove();
        });
    }

});
