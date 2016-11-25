//Javascript here


$(document).ready(function() {
	//homepage carousel
  $("#home-carousel").owlCarousel({
	singleItem: true,
    slideSpeed: 400,
    lazyEffect: "fade",
    loop: true,
    autoPlay: true,
    navigation: false,
    dots: true
  });

   //contact form
   $("#submit_btn").click(function(e) { 

       e.preventDefault()

        var proceed = true;    
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ 
                $(this).css('border-color','red');    
                proceed = false; 
            }
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); 
                proceed = false;             
            }   
        });
       
        if(proceed) 
        {
            
            post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'msg'           : $('textarea[name=message]').val()
            };
            
            $.post('contact_me.php', post_data, function(response){  
                if(response.type == 'error'){ 
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
                    $("#contact_form #contact_body").slideUp(); 
                }
                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
	});

});

//mobile menu 
$(".mm__toggle").click(function(e) {

	e.preventDefault();

	if ($(".main-nav__list").hasClass("main-nav--mobile")) {
		$(".main-nav__list").removeClass("main-nav--mobile")
	} else {
		$(".main-nav__list").addClass("main-nav--mobile")
	}
	
});



//year always stays current
window.onload = function() {
	document.getElementById('cp-year').appendChild(document.createTextNode(new Date().getFullYear()));
}

