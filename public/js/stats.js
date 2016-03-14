$(document).ready(function() {
	$.get('/data/stats', function(data) {
		// If the user is logged in, they will have a first name.
		if (data.first_name) {
			$('#navlist').append('<li><a href="/settings">Settings</a></li>');

			if (window.location.pathname === '/') {
				$('#infoBanner').prepend('<div>Welcome ' + data.first_name + '.</div>');
			}
		}

		$('#infoBanner').append('<span><strong>Total Items </strong>: '+
								data.num_active+' active + '+
								data.num_scrapped+' scrapped = '+
								data.num_total+'</span>');
	});
});