
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop != 0) {
            $("#navigation").animate({ backgroundColor: 'black' }, 400);
            
        }
        else {
            $("#navigation").animate({ backgroundColor: 'transparent' }, 350);
        }
    });

    $('#navigation').hover(
        function (e) {
            var scrollTop = $(window).scrollTop();
            if (scrollTop != 0) {
                $('#navigation').stop().animate({ backgroundColor: 'black' }, 400);            
            }
        },
        function (e) {
            var scrollTop = $(window).scrollTop();
            if (scrollTop != 0) {
                $('#navigation').stop().animate({ backgroundColor: 'black' }, 400);
            
            }
        }
    );
