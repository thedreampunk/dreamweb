/*-----------------------------------------------------------------------------------
/*
/* DREAMQUERY by Dreampunk
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/*	FUNCTION HIDE/SHOW IFRAME - DREAM PLAYLISTS
------------------------------------------------------*/

	/* init variable activeRadio */
	localStorage.setItem('activeRadio', 'rock');
	
	$(function() {
		/* 4 var possibles : happy, zen, rock, trippy */
		
		/* je dedicace cette belle fonction a Nalu*/
		$('.dreamradioButton').on('click', function() {
			
			var activeRadio = localStorage.getItem('activeRadio');
			var newRadio = this.id;
			
			if (activeRadio != newRadio) {
				// 1.1. Hide active radio
				switch(activeRadio) {
					case 'happy':
						$('.happy').toggle();
						break;
					case 'zen':
						$('.zen').toggle();
						break;
					case 'rock':
						$('.rock').toggle();
						break;
					case 'trippy':
						$('.trippy').toggle();
						break;
				}
				// 1.2. Show active radio button
				$('#'+activeRadio).toggle();
				document.getElementById('activeRadioName').innerHTML=newRadio.toUpperCase()+" RADIO ";
				
				// 2.1. Show new active radio
				switch(newRadio) {
					case 'happy':
						$('.happy').toggle();
						break;
					case 'zen':
						$('.zen').toggle();
						break;
					case 'rock':
						$('.rock').toggle();
						break;
					case 'trippy':
						$('.trippy').toggle();
						break;
				}
				// 2.2. Hide new active radio button
				$('#'+newRadio).toggle();
				
				localStorage.setItem('activeRadio', newRadio);
			}
		});
	});

});





