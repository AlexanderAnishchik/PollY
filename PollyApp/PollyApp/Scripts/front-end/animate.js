
$(document).ready(function () {
    var h = $(window).height();
    
   
    $("#header .post").eq(1).addClass('animated fadeInLeftBig');
    setTimeout(function () { $("#header .post").eq(0).addClass('animated fadeInDownBig'); }, 75);
    setTimeout(function () { $("#header .post").eq(2).addClass('animated fadeInRightBig'); }, 77);
    

    $(window).scroll(function () {
        if (($(this).scrollTop() + h) >= $("#wrapper").offset().top) {
            setTimeout(function () {
                $("#wrapper .post").css({ visibility: "visible" });
                $("#wrapper .post").eq(0).addClass('animated zoomIn');
            }, 200);
            
        }
        if (($(this).scrollTop() + h) >= $("#about").offset().top) {
            $("#about .post").css({ visibility: "visible" });
            $("#about .post").eq(0).addClass('animated bounceInLeft');
            $("#about .post").eq(1).addClass('animated bounceInRight');
            $("#about .post").eq(2).addClass('animated bounceInLeft');
            $("#about .post").eq(3).addClass('animated bounceInRight');
            $("#about .post").eq(4).addClass('animated flipInX');
        }
        if (($(this).scrollTop() + h) >= $("#feedback").offset().top) {
            $("#feedback .post").css({ visibility: "visible" });
            $("#feedback .post").addClass('animated zoomIn');
        }

        if ($(this).scrollTop() == 0) {
            $("#wrapper .post, #about .post, #feedback .post").each(function () {
                if ($(this).hasClass('last')) {
                    $(this).removeClass().addClass('post last');
                } else {
                    $(this).removeClass().addClass('post');
                }
                $(this).css({ visibility: "hidden" });
            });
        }
    });
});