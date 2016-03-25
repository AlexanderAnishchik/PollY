PollyApp.directive('scroll', function () {
    return {
        restrict: 'A',
        link: function (scope, $elm, attrs) {
            var h = jQuery(window).height();
            $("#desc_big").css('opacity','0');
            $(document).ready(function () {
                var f = $('.pluses').offset().top;
               
                setTimeout(function () {
                    $("#desc_big").addClass('flipInX');
                    $("#desc_small").addClass('fadeInLeftBig');
                    $('#desc_button').addClass('fadeIn');
                }, 1000);
                setTimeout(function () {
                    $('.animatedesc').addClass('animated slideInLeft');
                    $('.animatedesc').css('opacity',1)
                }, 1800);
                
                $(window).scroll(function () {
                    if ($(window).scrollTop() + h >= $('#macbook').offset().top) {
                        $('#macbook').addClass('animated slideInUp');
                    }
                    if ($(window).scrollTop() >= $('#wrapper').offset().top - 50)
                    {
                        var time = 500;

                        $('.anim').eq(0).addClass('animated fadeInUp');
                        setInterval(function () {
                            $('.anim').eq(1).addClass('animated fadeInUp');
                        }, time);
                        setInterval(function () {
                            $('.anim').eq(2).addClass('animated fadeInUp');
                        }, time + 500);

                        time = 400;
                    }
                    if ($(window).scrollTop() + h >= $('#about').offset().top + $('.anim').eq(3).height()) {
                        $('.anim').eq(3).addClass('animated fadeInLeft');

                        setInterval(function () {
                            $('.anim').eq(4).addClass('animated fadeInUp');
                        }, 500);
                        setInterval(function () {
                            $('.anim').eq(6).addClass('animated fadeInUp');
                        }, 1000);
                    }
                    if ($(window).scrollTop() + h >= $('.anim').eq(7).offset().top + $('.anim').eq(7).height()) {
                       
                        setInterval(function () {
                            $('.anim').eq(7).addClass('animated fadeInLeft');
                        }, time);
                    }
                    if ($(window).scrollTop() + h >= $('.anim').eq(8).offset().top + $('.anim').eq(7).height()) {

                        setInterval(function () {
                            $('.anim').eq(8).addClass('animated fadeInLeft');
                        }, time);
                    }
                    if ($(window).scrollTop() + h >= $('.anim').eq(9).offset().top + $('.anim').eq(8).height()) {

                        setInterval(function () {
                            $('.anim').eq(9).addClass('animated fadeInLeft');
                        }, time);
                    }
                    if ($(window).scrollTop() + h >= $('.anim').eq(10).offset().top + $('.anim').eq(9).height()) {

                        setInterval(function () {
                            $('.anim').eq(10).addClass('animated fadeInLeft');
                        }, time);
                    }
                    if ($(window).scrollTop() + h >= $('.anim').eq(11).offset().top + $('.anim').eq(11).height()) {

                        
                            $('.anim').eq(11).addClass('animated bounceInDown');
                            $('.anim').eq(11).css('opacity',1);
                        
                    }
                    if ($(window).scrollTop() + h >= $("form[name='contact']").offset().top + $("form[name='contact']").height()/2) {
                        console.log($("form[name='contact']").height());
                        $('form[name="contact"]').addClass('animated flipInY');
                    }
                   
                                      
                })
                

            });
        }
    }
});