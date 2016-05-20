$(document).ready(function() {
  $.get('/data/stats', function(data) {
    // If the user is logged in, they will have a first name.
    if (data.first_name && data.last_name) {
      $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
      $('#login').replaceWith('<li class="dropdown"> \
                                 <a href="#" id="drop-settings" data-toggle="dropdown" class="dropdown-toggle" \
                                 role="button">' + data.first_name + ' ' + data.last_name + ' ' + '<b class="caret"></b></a> \
                                 <ul id="settings-list" role="menu" class="dropdown-menu" aria-labelledby="drop-settings"> \
                                   <li role="presentation"><a href="#">Edit Profile</a></li> \
                                   <li role="presentation"><a href="#">Email Settings</a></li> \
                                   <li role="presentation"><a href="#">Setup Facial Recognition</a></li> \
                                 </ul> \
                               </li>');
      $('#navbar-left').append('<li id="reservations"><a href="/reservations">Reserve Items</a></li>');
      if (window.location.pathname === '/reservations') {
        $('#infoBanner').append('<span><strong>Items Available to Reserve:</strong> ' + data.num_checkout +'</span>');
        $('#reservations').addClass('active');
      }
      if (data.is_admin) {
        $('#settings-list').append('<li class="dropdown-header">Admin Settings</li>\
                                    <li><a href="/settings/attributes">Edit Dropdowns</a></li>');
        $('#navbar-left').append('<li id="scrap-items"><a href="/scrap-items">Mass Scrap</a></li>\
                                  <li id="view-scrapped"><a href="/view-scrapped">View Scrapped Items</a></li>');
        if (window.location.pathname === '/scrap-items') {
          $('#infoBanner').append('<span><strong>Items Ready to be Scrapped:</strong> 0</span>');
          $('#scrap-items').addClass('active');
        }
        if (window.location.pathname === '/view-scrapped') {
          $('#infoBanner').append('<span><strong>Total Scrapped Items</strong>: ' +
                                  data.num_scrapped + '</span>');
          $('#view-scrapped').addClass('active');
        }
      }
      $('#settings-list').append('<li role="separator" class="divider"></li> \
                                   <li role="presentation"><a href="/logout">Logout</a></li>');
    }
    if (window.location.pathname === '/') {
      $('#infoBanner').append('<span><strong>Total Items</strong>: ' +
                              data.num_active + ' active + ' +
                              data.num_scrapped + ' scrapped = ' +
                              data.num_total + '</span>');
    }
  });
});