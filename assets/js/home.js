$(document).ready(function() {



 //GLOBAL VARIABLES
	var nav = $('nav a');
	var bottom = $('#nav-bottom a');
	var win_height = $(window).height();
	var win_width = $(window).width();
	var elementHeight = 0; //used for call bounding rect to measure element
	var exit = $('#wrapper').find('#exit');

	//number of content screens - 1
	var scrollBottom = $(window).scrollTop() + (win_height * 4.5);
	var backgrounds = ['top'];
	var scrollSpeed = 500;
	var country;
	var sd_download = $('#download').find('.download-left a');
	var hd_download = $('#download').find('.download-right a');
	
	var hd = "https://d1cwrlyxfuylre.cloudfront.net/HD+What+Difference+Does+It+Make%3F+A+Film+About+Making+Music.mp4";
	var sd = "https://d1cwrlyxfuylre.cloudfront.net/SD-what-difference-does-it-make.mp4";
	
	var hd_jp = "https://d1cwrlyxfuylre.cloudfront.net/HD+JP+What+Difference+Does+It+Make%3F.mp4";
	var sd_jp = "https://d1cwrlyxfuylre.cloudfront.net/SD+JP+What+Difference+Does+It+Make%3F.mp4";


	findLocation();
	

	function findLocation(){
		try{
			//get ip for japan and choose links
			$.getJSON("http://freegeoip.net/json/",function(data){
				country = data.country_name;


			}).fail(function(textStatus){
				sd_download.attr('href', sd);
				hd_download.attr('href', hd);
				init();

			}).success(function(textStatus){
				if (country === 'Japan'){
					sd_download.attr('href', sd_jp);
					hd_download.attr('href', hd_jp);
					init();

				}

				else {
					sd_download.attr('href', sd);
					hd_download.attr('href', hd);
					init();
				}

			});
		}

		//defaults to OG video if country can't be detected
		catch (error){
			sd_download.attr('href', sd);
			hd_download.attr('href', hd);
			init();
		}
	}



	function init(){

		function swapVideo(vid){
			var height = (measureVideo());
			var width = ($(window).width());
			var target = vid.parent();

			//display appropriate vid based on country
			if (country === 'Japan'){
				target.find('#embed').html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/HUUa-KNyqKk?enablejsapi=1&amp;origin=*&amp;autoplay=1&amp;loop=1&amp;hd=1&amp;modestbranding=0" frameborder="0" seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen></iframe>');
				
			}
			else{
				target.find('#embed').html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/_EDnMFJiv8U?enablejsapi=1&amp;origin=*&amp;autoplay=1&amp;loop=1&amp;hd=1&amp;modestbranding=0" frameborder="0" seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen></iframe>');
			}
			
			target.find('.play').hide();
			target.find('#embed').show();
			target.find('#embed').css({
				zIndex: '99'
			});
		}

			//USED TO MESAURE SCREEN SIZE TO BE USED FOR VIDEO SIZE
		function measureVideo(){
			var rect = document.getElementById("stream").getBoundingClientRect();
			if (rect.height){
				elementHeight = rect.height;
			}
			else{
				elementHeight = rect.bottom - rect.height; //derive height
			}

			return elementHeight;
		}



		
		//grabs class of link and scrolls accordingly
		function smoothScroll(clk){
			if (clk.hasClass('filmlink')){
				$('#wrapper').animate({
					scrollTop: win_height
				},scrollSpeed);
				$('#pointer').fadeOut();
			}

			//slide out book
			else if(clk.hasClass('booklink')){
				$('#bookframe').html('<iframe src="/book" width="100%" height="100%" border="0"></iframe>');
				$('#bookframe').transition({
					left: 0,
					top: 0
				}, 1000,function(){
					//make sure exit button is visible
					exit.removeClass('hidden').fadeIn();
				});

			}

			else if(clk.hasClass('aboutlink')){
				$('#wrapper').animate({
					scrollTop: $('#aboutlink').offset().top
				}, scrollSpeed * 2);
				$('#pointer').fadeOut();
			}
			else if(clk.hasClass('titlelink')){
				$('#wrapper').animate({
					scrollTop: 0
				}, scrollSpeed);
			}
		}


		//used for video
		function getElementLeftTop(thiselement){
			var rect = thiselement.getBoundingClientRect();
			return [rect.left];
		}

		function scrollDown(){
			var scrolltop = $('#wrapper').scrollTop();
			winheight = $(window).height();
			$('#pointer').fadeOut();

			//top screen
			if (scrolltop < (winheight / 2)){
				$('#wrapper').animate({
					//scroll to movie
					scrollTop: (win_height)
				}, scrollSpeed);
			}

			//film screen
			if (scrolltop >= (winheight / 2) && scrolltop < (winheight * 2)){
				$('#wrapper').animate({
					//scroll to download
					scrollTop: (win_height * 2)
				}, scrollSpeed);
			}
			//download screen
			if (scrolltop >= (winheight * 2 ) && (scrolltop < (winheight * 2.5) - 1)){
				$('#wrapper').animate({
					//scroll to artists
					scrollTop: (win_height * 2.5)
				}, scrollSpeed);
			}

			//artist screen
			if (scrolltop >= ((winheight * 2.5) - 10 ) && (scrolltop < (winheight * 3.5) - 1)){
				$('#wrapper').animate({
					//scroll to about
					scrollTop: (win_height * 3.5)
				}, scrollSpeed);
			}
			//go to the bottom of the about screen
			if (scrolltop >= ((winheight * 3.5) - 1)){
				$('#wrapper').animate({
					//scroll to bottom of page
					scrollTop: (win_height * 6)
				}, scrollSpeed * 1.5);
			}
		}

		function scrollUp(){
			var scrolltop = $('#wrapper').scrollTop();
			winheight = $(window).height();

			//if on movie page
			if (scrolltop >= (winheight / 2) && scrolltop < (winheight * 2)){
				$('#wrapper').animate({
					//scroll to top
					scrollTop: 0
				}, scrollSpeed);
			}
			//if on download page
			if (scrolltop >= ( winheight * 2 ) &&  scrolltop < (winheight * 2.5) - 1){
				$('#wrapper').animate({
					//scroll back to movie page
					scrollTop: win_height
				}, scrollSpeed);
			}
			//if on artist page
			if (scrolltop >= ((winheight * 2.5) - 1) && scrolltop < (win_height * 3.5) - 1){
				$('#wrapper').animate({
					//scroll back to download page
					scrollTop: (win_height * 2)
				}, scrollSpeed);
			}

			//if on about screen
			if (scrolltop >= (winheight * 3.5 - 1 ) && (scrolltop < winheight * 4.5)){
				$('#wrapper').animate({
					//scroll back to artist page
					scrollTop: (win_height * 2.5) //allow extra padding
				}, scrollSpeed);
			}

			//if partway down about screen
			if (scrolltop >= (win_height * 4.5) - 1){
				$('#wrapper').animate({
					scrollTop: (win_height * 3.5)
				}, scrollSpeed);
			}
		}





		//STARTUP EVENT LISTENERS AND FUNCTIONS

		//REFACTOR TO FUNCTIONS!!!	
		$('#download').find('.download-left img').on('mouseenter', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/standard_def_back.svg');
		});

		$('#download').find('.download-left img').on('mouseleave', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/standard_def_b.svg');
		});

		$('#download').find('.download-right img').on('mouseenter', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/high_def_back.svg');
		});

		$('#download').find('.download-right img').on('mouseleave', function(){
			$(this).attr('src', '//d17vwh530ty7de.cloudfront.net/high_def_b.svg');
		});



		//on nav bar click, grab link class and pass to smooth scroll
		$('nav').on('click', 'a.scroll', function(e){
			e.preventDefault();
			smoothScroll($(this));
			
		});

		$('#nav-bottom').on('click', 'a.scroll', function(e){
			e.preventDefault();
			smoothScroll($(this));
			$('#pointer').fadeOut();
		});





		//slide to next screen with arrow up/down
		$(document).keydown(function(e){
			e.stopPropagation();
			if (e.keyCode === 40) {
				scrollDown();
			} else if (e.keyCode === 38) {
				scrollUp();
			}
		});


		//use css animated arrow on hero page to scroll down one page
		$('#pointer').on('click', function(e){
			e.preventDefault();
			var scrollAmount = $(window).height();
			$('#wrapper').animate({
					scrollTop: (scrollAmount)
				}, 700, function(){
					$('#pointer').fadeOut();
				});
		});

		//if book iframe is open, allow exit button to close iframe
		exit.on('click', function(e){
			e.preventDefault();
			if (!(exit.hasClass('hidden'))){
				if (win_width > 768){
					$('#bookframe').transition({
						left: '100%',
						top: '-100%'
					}, 1000);
					$(this).addClass('hidden');
					//set back to none, so we can fade in when re-opened
					$(this).css({
						display: 'none'
					});
				}
				else{
					$('#bookframe').transition({
						left: '100%',
						top: '0'
					}, 1000);
					$(this).addClass('hidden');
					//set back to none, so we can fade in when re-opened
					$(this).css({
						display: 'none'
					});
				}
				
			}
		});

		//change video background on play button click
		$('#play-button').on('click', function(e){
			e.preventDefault();
			swapVideo($(this));
			$(this).fadeOut();

		});



} //end init
}); //end doc ready



