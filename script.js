var artistArray = ['Cake', 'Spoon', 'The Beatles', 'Ween', 'The Strokes', 'Red Hot Chili Peppers']

var artistImage = $('<img>');

var gifStatic = true;

var gifImage;

var results;

var currentGif;

var state;

//==============================================================================

function renderButtons(){
	$('#artistButtons').empty();
	for (var i = 0; i < artistArray.length; i++){
			$('#artistButtons').append("<button class='artistButton' value='" + artistArray[i] + "'>" + artistArray[i] + "</button>")
		}
	$(".artistButton").on('click', function(){

		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + $(this).val() + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({url: queryURL, method: 'GET'})

			.done(function(response){
				$('#artistGifs').empty();
				results = response.data;

				for (var i = 0; i < results.length; i++){
					var gifDiv = $("<div class='image'>");
					currentGif = results[i]
					gifImage = $('<img>');
					gifImage.attr('src', currentGif.images.fixed_height_still.url);
					gifImage.attr('data-animate', currentGif.images.fixed_height.url);
					gifImage.attr('data-still', currentGif.images.fixed_height_still.url);
					gifImage.attr('data-state', "still")
					gifImage.addClass('giphy');
					gifDiv.append(gifImage);
					$('#artistGifs').append(gifDiv);
				}
			});
		$(".giphy").on('click', function(){
		var state = $(this).attr('data-state');
		if (state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	})
	});
}

//==============================================================================

$(document).ready(function(){
	renderButtons();

	$('#addArtist').on('click', function(){
		var searchedArtist = $("#artist-input").val().trim();
		artistArray.push(searchedArtist);
		renderButtons();
		return false; //this is essential because we are using a form; if you don't return false it will refresh page
	});
});