$(function(){ // on page load
    
    $("#commentsContainer").on('click', function(){
        $("#commentsDropdown").slideDown("slow");
    });// if clicked will make comment section appear

    $(".mof-story").on('mouseenter', function(){
        $("#commentsDropdown").slideUp("slow");
    });// when leaving comment section then hide comment section

    $(".mof-img-btn1, .mof-text-btn1, .mof-text-saveButton3").on("click", function(){
        $(this).hide();
    });// hides save to later buttons if clicked on this is another method instead of using .style.display = "none" 
    
    $("img").on('mouseenter',function(){
        $(this).animate({ opacity: '0.6'}, "slow"); 
        $(this).animate({ opacity: '1'}, "slow");
    });// if hoverd over any image do this animation in sequence

    // if anu of the like buttons are clicked then change color of heart as a type of toggle
    $(".likeButton, .likeButton1, .likeButton2, .likeButton3, .likeButton4").on("click",function() {
        if ($(this).hasClass('active')){// if it has this class
          $(this).removeClass('active'); // remove class and toggle back
        }else{
            $(this).addClass('active');// if not toggle to other state
        }
      });

      $(".likeButton, .likeButton2, .likeButton3, .likeButton4").on("click",function() {
        $(this).parent().hide("fast").show("slow");
      });// if user liked a image it will do a little chained effect
});

