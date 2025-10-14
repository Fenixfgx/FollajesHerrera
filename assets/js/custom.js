$(document).ready(function() {
    // Pause carousel for 30 seconds when arrows are clicked
    $('.carousel-control-prev, .carousel-control-next').click(function() {
        var carousel = $('#template-mo-zay-hero-carousel');
        carousel.carousel('pause');
        setTimeout(function() {
            carousel.carousel('cycle');
        }, 30000); // 30 seconds
    });

    // Hide top nav on scroll down, show only when at top
    var topNav = $('#templatemo_nav_top');
    var mainNav = $('.navbar.navbar-expand-lg.navbar-light.shadow');
    var body = $('body');
    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        
        if (scrollTop > 50) {
            // When scrolled down, hide top nav and move main nav to top
            topNav.addClass('navbar-hide');
            mainNav.addClass('navbar-main-top');
            body.addClass('body-nav-top');
        } else {
            // When at top, show top nav and position main nav below it
            topNav.removeClass('navbar-hide');
            mainNav.removeClass('navbar-main-top');
            body.removeClass('body-nav-top');
        }
    });
});