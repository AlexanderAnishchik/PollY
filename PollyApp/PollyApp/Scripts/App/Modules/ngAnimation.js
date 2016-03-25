var app = angular.module('ngAnimation',[]);
app.directive('anim',function(){
   return{
       restrict : 'A',
       link : function(scope, element, attrs){
           $(document).ready(function(){
               $(element).css('opacity',0);
               var h = $(window).height();
               var eh = $(element).height();
               if (eh > 400) {
                   eh = eh / 2;
               }
               //function for show animate
               function animate(){
                   if(attrs.timeout){
                       setTimeout(function(){
                           $(element).addClass('animated ' + attrs.anim + ' animDone');
                       },attrs.timeout);
                   }
                   else{
                       $(element).addClass('animated ' + attrs.anim + ' animDone');
                   }
               };
               if($(document).height() > document.body.clientHeight)
               {
                   if($(window).height() > $(element).offset().top+55){
                       animate();
                   }
                   $(window).scroll(function () {
                       if($(window).scrollTop() + h > $(element).offset().top + eh)
                       {
                           animate();
                       }
                   });
               }
               else{
                   animate();
               }
           });
       }
   }
});