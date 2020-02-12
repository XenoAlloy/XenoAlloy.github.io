var isMenuButtonClicked = false;
$(function(){
	$("#menu_button").on("click",function(e){
		if(isMenuButtonClicked == false){
			$("#menu").css("right","0%");
			$(this).addClass("fa-chevron-right");
			$(this).removeClass("fa-chevron-left");
			isMenuButtonClicked = true;
		}else{
			$("#menu").css("right","-60%");
			$(this).addClass("fa-chevron-left");
			$(this).removeClass("fa-chevron-right");
			isMenuButtonClicked = false;
		}
	});
});
