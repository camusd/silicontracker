$(document).ready(function() {
	$.get('/data/stats', function(data) {
		// If the user is logged in, they will have a first name.
		if (data.first_name) {
			$('#login').replaceWith('<li class="dropdown"> \
																 <a href="#" id="drop-settings" data-toggle="dropdown" class="dropdown-toggle" \
																 role="button">Settings <b class="caret"></b></a> \
																 <ul id="settings-list" role="menu" class="dropdown-menu" aria-labelledby="drop-settings"> \
																	 <li role="presentation"><a href="#">Edit Profile</a></li> \
																	 <li role="presentation"><a href="#">Email Settings</a></li> \
																	 <li role="presentation"><a href="#">Setup Facial Recognition</a></li> \
																 </ul> \
															 </li>');
			if (data.is_admin) {
				$('#settings-list').append('<li><a href="/settings/attributes">Edit Dropdowns</a></li>');
			}
			$('#navbar-right').append('<li><a href="#">Logout</a></li>');

			if (window.location.pathname === '/') {
				$('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
			}
		}

		$('#infoBanner').append('<span><strong>Total Items </strong>: '+
								data.num_active+' active + '+
								data.num_scrapped+' scrapped = '+
								data.num_total+'</span>');
	});
});