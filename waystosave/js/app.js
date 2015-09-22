// JS file
// Date: 8/28/15


$( document ).ready(function() {

	// Let me know when the document is ready -__-
    console.log( "ready!" );


    	//$('.show-all-save-container, .show-all-tip-container').hide();

		$('.show-all-save-button').click(function(e){
				console.log('clicked button');
				// fades out the clicked button
				$(this).fadeOut('fast');
				e.preventDefault();


				$('.show-all-save-container').fadeIn('slow');
				console.log('load more executed');

				//scroll to
				// $('html, body').animate({
			 //        scrollTop: $(".show-all-save-container").offset().top
			 //    }, 500);
		});

		$('.show-all-tip-button').click(function(e){
				console.log('clicked button');
				// fades out the clicked button
				$(this).fadeOut('fast');
				e.preventDefault();

				$('.show-all-tip-container').fadeIn('slow');
				console.log('load more executed');

				$('html, body').animate({
			        scrollTop: $(".show-all-tip-container").offset().top
			    }, 500);
		});


		$('.show-all-savings-button').click(function(e){
				console.log('clicked button');
				// fades out the clicked button
				$(this).fadeOut('fast');
				e.preventDefault();

				$('.show-all-savings-container').fadeIn('slow');
				console.log('load more executed');

				$('html, body').animate({
			        scrollTop: $(".show-all-savings-container").offset().top
			    }, 500);
		});

		// Bolds save for later
		$('.tip-options .saveBtn, .savings-options .saveBtn').click(function(e){
			  console.log('clicked save for later');

			  $(this).toggleClass('bold');

			  e.preventDefault();
		});

		// Tabs

		$('.removed-saved-tip').click(function (e) {
		    $(this).closest('.saved-tip').addClass('removed').fadeOut();
		    e.preventDefault();
		    updateCount();
		});

		$('.saved-tip-done').click(function (e) {
		    $(this).addClass('marked-done');
		    e.preventDefault();
		    $(this).closest('.saved-tip').appendTo('#panel2');
		    $('#panel2 .marked-done').remove();
		    updateCount();
		});

	//	$('#panel2 .saved-tip a').removeClass('marked-done');

		updateCount();
		function updateCount() {
		    $('#panel1').each(function () {
		        var n = $(this).children('.saved-tip').filter(function() {
		            return !$(this).hasClass('removed');
		        }).length;
		        $(".tab-title:first a").text("Saved (" + n + ")");
		    });

		    $('#panel2').each(function () {
		        var n = $(this).children('.saved-tip').filter(function() {
		            return !$(this).hasClass('removed');
		        }).length;
		        $(".tab-title:last a").text("Completed (" + n + ")");
		    });
		}

		// Togles to do module on click

		$('.todo-toggle').click(function(){
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}

			$('.todo-module').toggle();

		});


		// Tip Details Toggle


		$('.recycle-toggle').click(function(e){

			$('.detail-offers').toggle();

			e.preventDefault();
		});

});
