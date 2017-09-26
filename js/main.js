

jQuery(document).ready(function($){
// debugger
//     // javascript - How do I check if an HTML element is empty using $? - Stack Overflow
//     if ($('.prev-posts').is(':empty')){
//
//         $(this).removeAttr('style');
//         $(this).removeClass('hover');
//         $(this).remove();
//     }

    $('#smoothup').hover(function (){

        $('#smoothup .fa').css('color','#FBCF1F');
    },function () {
        $('#smoothup .fa').css('color','#222');
    })



    $('.title-holder').hover(function (){

        $('.post-edit-link').show();
    },function () {
        $('.post-edit-link').hide();
    })


    $('.single .next-post ,.single .prev-post,.prev-posts ,.next-posts ').hover(function (){

        $(this).addClass('hover');
    },function () {
        $(this).removeClass('hover');
    })




    $('img').addClass('img-responsive');


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