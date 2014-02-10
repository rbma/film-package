$(document).ready(function(){


// ARTIST SECTION

var artist = $('#artist').find('.artist-list ul a');
var images = $('#artist').find('.artist-images img');
var imageBlock = $('#artist').find('.artist-images');
var artistBox = $('#artist-info');
var links = $('#artist-info').find('.links ul');
var cast = $('#insert-name').text();
var title = $('#insert-name');

images.imagesLoaded(function(){
	images.each(function(){
		$(this).removeClass('hidden');
	});
	setDisplayOn();
});


function setDisplayOn(){
	$('#artist').find('.artist-images').css({
		display: 'block'
	});
}



function hideImages(){
	images.each(function(){
		$(this).addClass('hidden');
	});
	//get images ready to load
}


//SLIDE UP INFO WHEN CLICKED
artist.on('click', function(){
	var name = $(this).data('name');
	var pic = $(this).data('pic');
	//empty out default picture
	$('#artist-info').find('.assets img').empty();
	addInfo(name, pic);
	$('#artist-info').transition({
		left: 0
	}, 500, "ease");
});


//EXIT INFO BOX
artistBox.find('.go-home').on('click', function(){
	artistBox.transition({
		left: '100%'
	}, 500, "ease");
});

//ADD INFO TO SLIDE BOX
function addInfo(name, pic, nickname){
	artistBox.find('.insert-name').text(name);
	artistBox.find('.exit').removeClass('hidden');
	artistBox.find('.assets img').attr('src', '../images/artist/' + pic + '.jpg');

	

	//loop through ul's, hide them, then show only the one that matches the class of artist clicked
	links.each(function(){
		$(this).css({
			display: 'none'
		});
		$(this).addClass('hidden');
		if ($(this).hasClass(pic + '-links')){
			$(this).removeClass('hidden');
			$(this).css({
				display: 'block'
			});
		}
	});

	//loop through each p item (created via database)
	artistBox.find('p').each(function(){
		//make sure each one is hidden
		$(this).addClass('hidden');

		//find particular p that matches class of clicked image
		if ($(this).hasClass(pic + '-bio')){
			$(this).removeClass('hidden');
		}
	});
}

//GET NAME TITLES
artist.on('mouseenter', function(){
	var name = $(this).data('name');
	var pic = $(this).data('pic');
	imageBlock.css({
		display: 'block'
	});


	//loop again through images and find matching one
	images.each(function(){
		$(this).addClass('hidden');
		
		if ($(this).hasClass(pic)){
			$(this).removeClass('hidden');
			$(this).transition({
				width: '101%'
			}, 900);
		}
	});
});

artist.on('mouseleave', function(){
	hideImages();
	images.each(function(){
		$(this).css({
			width: '100%'
		});
	});
	imageBlock.css({
		display: 'none'
	});
	artist.css({
		color: 'white',
		backgroundColor: 'transparent'
	});
});


//hide all images on load, makes callback to set images to display block
hideImages();


});

