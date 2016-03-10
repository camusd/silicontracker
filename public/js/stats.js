$(document).ready(function() {
	$.get('/data/stats', function(data) {
		if (data.is_admin) {
			$('#navlist').append('<li><a href="/admin">Admin</a></li>');
		}

		if (data.first_name && window.location.pathname === '/') {
			$('#infoBanner').prepend('<div>Welcome ' + data.first_name + '.</div>');
		}

		$('#infoBanner').append('<span><strong>Total Items </strong>: '+
								data.num_active+' active + '+
								data.num_scrapped+' scrapped = '+
								data.num_total+'</span>');
	});
});