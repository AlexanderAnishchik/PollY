
jQuery(document).ready(function () {

    var h = jQuery(window).height();

    jQuery(window).scroll(function () {

        if ((jQuery(this).scrollTop()+h) >= jQuery("#header").height()+h) {
            jQuery("#navigation").animate({ "backgroundColor": "blue" }, 100);
            if (jQuery(window).width() <= 480)
                jQuery(".navbar-collapse").css("background","rgba(0,0,0,0)");
            
        }
        if ((jQuery(this).scrollTop() + h) < jQuery("#header").height() + h) {
            jQuery("#navigation").animate({ "backgroundColor": "transparent" }, 100);
            if(jQuery(window).width() <= 480)
                jQuery(".navbar-collapse").css("background", "rgba(44, 62, 80,0.7)");
        }
       
    });
});
    