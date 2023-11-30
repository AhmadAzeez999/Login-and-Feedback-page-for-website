document.addEventListener("DOMContentLoaded", function () 
{
    // For dark mode
    $('#dark-mode-btn').on('click', function() 
    {
        $('body').toggleClass('dark-mode');
    });
});