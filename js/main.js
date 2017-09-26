

jQuery(document).ready(function($){


    jQuery('#smoothup').hover(function (){

        jQuery('#smoothup .fa').css('color','#FBCF1F');
    },function () {
        jQuery('#smoothup .fa').css('color','#222');
    })



    jQuery('.title-holder').hover(function (){

        jQuery('.post-edit-link').show();
    },function () {
        jQuery('.post-edit-link').hide();
    })


    jQuery('.single .next-post ,.single .prev-post,.prev-posts ,.next-posts ').hover(function (){

        jQuery(this).addClass('hover');
    },function () {
        jQuery(this).removeClass('hover');
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