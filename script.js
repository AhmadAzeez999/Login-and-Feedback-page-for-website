$(document).ready(function()
{
    $('.carousel').slick({
        slidesToShow: 1, /* Adjust the number of slides to display at once */
        slidesToScroll: 1,
        autoplay: true, /* Enable autoplay if desired */
        autoplaySpeed: 5000, /* Adjust the autoplay speed */
        /* Add other carousel settings as needed */

        // Remove default navigation buttons
        prevArrow: '.custom-prev',
        nextArrow: '.custom-next',
    });

    // Add event listeners to custom navigation buttons
    $('.custom-prev').on('click', function(){
        $('.carousel').slick('slickPrev');
    });

    $('.custom-next').on('click', function(){
        $('.carousel').slick('slickNext');
    });
});
