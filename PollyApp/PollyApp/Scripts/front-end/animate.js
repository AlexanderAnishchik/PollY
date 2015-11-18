
$(document).ready(function () {
    var h = $(window).height();

    $("#macbook .post").css("display","none");
    $("#header .post").eq(1).addClass('animated fadeInLeftBig');
    setTimeout(function () { $("#header .post").eq(0).addClass('animated fadeInDownBig'); }, 75);
    setTimeout(function () { $("#header .post").eq(2).addClass('animated fadeInRightBig'); }, 77);
    

    $(window).scroll(function () {
        if (($(this).scrollTop() + h) >= $("#macbook").offset().top) {
            setTimeout(function () {
                
                //$("#macbook .post").css({ visibility: "visible" });
                $("#macbook .post").eq(0).addClass('animated fadeInLeft');
            }, 0);
            
        }
        if (($(this).scrollTop() + h) >= $("#aboutfirst").offset().top) {
            //$("#aboutfirst .post").css({ visibility: "visible" });
            $("#aboutfirst .post").eq(0).addClass('animated fadeInUp');
            $("#aboutfirst .post").eq(1).addClass('animated fadeInUp');
           
        }
        if (($(this).scrollTop() + h) >= $("#aboutsecond").offset().top) {
            $("#aboutsecond .post").css({ visibility: "visible" });
            $("#aboutsecond .post").eq(0).addClass('animated fadeInUp');
            $("#aboutsecond .post").eq(1).addClass('animated fadeInUp');

        }
        if (($(this).scrollTop() + h) >= $("#slider").offset().top) {
            $("#slider .post").css({ visibility: "visible" });
            $("#slider .post").addClass('animated bounceInLeft');
        }

        /*if ($(this).scrollTop() == 0) {
            $("#wrapper .post, #about .post, #feedback .post").each(function () {
                if ($(this).hasClass('last')) {
                    $(this).removeClass().addClass('post last');
                } else {
                    $(this).removeClass().addClass('post');
                }
                $(this).css({ visibility: "hidden" });
            });
        }*/
    });
});