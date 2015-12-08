
jQuery(document).ready(function () {

    var h = jQuery(window).height();

    jQuery(window).scroll(function () {

        if ((jQuery(this).scrollTop() + h) >= jQuery("#wrapper").offset().top) {
            $("#navigation").css("background","black");
        }
       
    });
});
    