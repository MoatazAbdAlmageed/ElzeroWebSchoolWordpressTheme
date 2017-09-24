

jQuery(document).ready(function($){


    jQuery('#smoothup').hover(function (){

        jQuery('#smoothup .fa').css('color','#FBCF1F');
    },function () {
        jQuery('#smoothup .fa').css('color','#222');
    })
    jQuery('img').addClass('img-responsive');


    $(window).scroll(function(){
        if ($(this).scrollTop() < 200) {
            $('#smoothup') .fadeOut();
        } else {
            $('#smoothup') .fadeIn();
        }
    });
    $('#smoothup').on('click', function(){
        $('html, body').animate({scrollTop:0}, 'fast');
        return false;
    });
});