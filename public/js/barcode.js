/*
 *	barcode.js
 *
 *	This is a script for the barcode scanner. JQuery is used to detect
 *	if a human typed into a keyboard or if a barcode scanner was used.
 *	If a series of characters are all entered within a very short timeframe,
 *	then we can deduct that a barcode scanner was used.
 *
 */

var pressed = false;
var goToNextPage = false;
var btnText = 'Check Out';
var itemCounter = 0;
var chars = [];
var currentItem = {serial_num: '', checked_in: ''};

$(document).ready(function() {
  inactivityTime();
  $(window).keypress(function(e) {
      chars.push(String.fromCharCode(e.which));
      if (pressed == false) {
          setTimeout(function(){
              // If there are ten characters inserted before the timeout
              if (chars.length >= 10) {
                  var barcode = chars.join("");
                  // There was an item scanned. Enter response code here.
                  var itemInfo = "";
                  $.get('/serial/'+barcode, function(data) {
                    currentItem.serial_num = data.serial_num;
                    currentItem.checked_in = data.checked_in;
                    if(data.checked_in == "Checked Out") {
                      $.get('/user/'+barcode, function(user) {
                        data.first_name = user.first_name;
                        data.last_name = user.last_name;
                        if (data.item_type === 'cpu') {$('#item-info').html(CPUInfo(data));}
                        else if (data.item_type === 'ssd') {$('#item-info').html(SSDInfo(data));}
                        else if (data.item_type === 'memory') {$('#item-info').html(MemoryInfo(data));}
                        else if (data.item_type === 'flash_drive') {$('#item-info').html(FlashDriveInfo(data));}
                        else if (data.item_type === 'board') {$('#item-info').html(BoardInfo(data));}
                        else {$('#item-info').html(ErrorInfo());}
                      });
                    } else {
                      if (data.item_type === 'cpu') {$('#item-info').html(CPUInfo(data));}
                      else if (data.item_type === 'ssd') {$('#item-info').html(SSDInfo(data));}
                      else if (data.item_type === 'memory') {$('#item-info').html(MemoryInfo(data));}
                      else if (data.item_type === 'flash_drive') {$('#item-info').html(FlashDriveInfo(data));}
                      else if (data.item_type === 'board') {$('#item-info').html(BoardInfo(data));}
                      else {$('#item-info').html(ErrorInfo());}
                    }
                  });
              }
              chars = [];
              pressed = false;
          },250); // <-- this is the timeout in milliseconds
      }
      pressed = true;
  });

  // If the page is refreshed, delete the items saved for later.
  $(window).on('beforeunload', function() {
    if (goToNextPage === false) {
      $.post('/kiosk/deletesaved')
        .done(function(data) {});
    }
  });

  $('#login-form').submit(function(event) {
    goToNextPage = true;
    var submitData = {
      username: $('#username').val(),
      pass: $('#pass').val()
    };
    $.post('/kiosk/login', submitData)
      .done(function() {
      window.location = '/cart';
    });

    event.preventDefault();
  });

  $('#save-for-later').click(function() {
    $.post('/kiosk/saveforlater', currentItem)
      .done(function(data) {
        $('#save-for-later').blur();

        var popText = (data.alreadySaved === true) ? 
                      'Item already saved.' : 
                      'Item saved for later.';

        // show popover
        $('#save-for-later').popover({
          animation: true,
          content: popText,
          placement: 'top auto'
        }).popover('show');

        // update button text
        itemCounter = data.numItems;
        $('#save-for-later span').text(btnText+' ('+itemCounter.toString()+')');


        setTimeout(function() {
          $('#save-for-later').popover('destroy');
        }, 2000);
      });
  })
});

// Add id=barcode to your input field if you plan on
// using the barcode scanner and you don't want the
// scanner to submit the form.
$("#barcode").keypress(function(e){
    if ( e.which === 13 ) {
        e.preventDefault();
    }
});

function changeBtnText(data) {
  if (data.hasOwnProperty('checked_in') && data.checked_in === 'Checked In') {
    btnText = 'Check Out';
  } else if (data.hasOwnProperty('checked_in') && data.checked_in === 'Checked Out') {
    btnText = 'Check In';
  }

  $('#save-for-later span').text(btnText+' ('+itemCounter.toString()+')');
}

function UserInfo(info) {
  var user_data = ('<div class="col-sm-6 col-xs-12"><strong>Checked In/Out:</strong></div>'+
                   '<div class="col-sm-6 col-xs-12">'+info.checked_in+'</div>'+
                   '<div class="col-sm-6 col-xs-12"><strong>Scrapped Status:</strong></div>'+
                   '<div class="col-sm-6 col-xs-12">'+info.scrapped+'</div>');
  if(info.checked_in == "Checked Out") {
    user_data = (user_data+'<div class="col-sm-6 col-xs-12"><strong>User:</strong></div>'+
                          '<div class=col-sm-6 col-xs-12">'+info.first_name+' '+info.last_name+'</div>');
  }
  return user_data;
}

function CPUInfo(info) {
  changeBtnText(info);
  $('#save-for-later').removeAttr('disabled');
  return  (UserInfo(info)+
          '<div class="row white-space"></div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Serial Number:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.serial_num+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Spec:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.spec+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>MM:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.mm+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Frequency:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.frequency+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Stepping:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.stepping+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>LLC:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.llc+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Cores:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.cores+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Codename:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.codename+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Class:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.cpu_class+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>External Name:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.external_name+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Architecture:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.architecture+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Notes:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+(info.notes === '' ? 'none' : info.notes)+'</div>');
}

function SSDInfo(info) {
  changeBtnText(info);
  $('#save-for-later').removeAttr('disabled');
  return  (UserInfo(info)+
          '<div class="row white-space"></div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Serial Number:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.serial_num+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Capacity:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.capacity+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Manufacturer:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.manufacturer+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Model:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.model+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Notes:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+(info.notes === '' ? 'none' : info.notes)+'</div>'); 
}

function MemoryInfo(info) {
  changeBtnText(info);
  $('#save-for-later').removeAttr('disabled');
  return  (UserInfo(info)+
          '<div class="row white-space"></div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Serial Number:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.serial_num+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Manufacturer:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.manufacturer+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Physical Size:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.physical_size+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>ECC:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.ecc+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Ranks:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.ranks+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Type:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.memory_type+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Capacity:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.capacity+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Speed:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.speed+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Notes:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+(info.notes === '' ? 'none' : info.notes)+'</div>');
}

function FlashDriveInfo(info) {
  changeBtnText(info);
  $('#save-for-later').removeAttr('disabled');
  return  (UserInfo(info)+
          '<div class="row white-space"></div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Serial Number:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.serial_num+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Capacity:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.capacity+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Manufacturer:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.manufacturer+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Notes:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+(info.notes === '' ? 'none' : info.notes)+'</div>');
}

function BoardInfo(info) {
  changeBtnText(info);
  $('#save-for-later').removeAttr('disabled');
  return  (UserInfo(info)+
          '<div class="row white-space"></div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Serial Number:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.serial_num+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>FPGA:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.fpga+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>BIOS:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.bios+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>MAC Address:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.mac+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Fab:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.fab+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Notes:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+(info.notes === '' ? 'none' : info.notes)+'</div>');
}

function ErrorInfo() {
  $('#save-for-later').attr('disabled', 'disabled');
  return  ('<div class="col-sm-6 col-xs-12"><strong>Error:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">Item Not Found</div>');
}


// InactivityTime: deletes items saved for later if the screen has been inactive for one minute.
var inactivityTime = function () {
    var t;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function deleteSaved() {
        $.post('/kiosk/deletesaved', function(data) {
          $('#item-info').html('');

          // if there were items deleted from the session
          if (data.value === true || itemCounter > 0) {
            // show popover
            $('#save-for-later').popover({
              animation: true,
              content: 'Item not saved.',
              placement: 'top auto'
            }).popover('show');

            // reset button count
            itemCounter = 0;
            $('#save-for-later span').text(btnText+' ('+itemCounter.toString()+')');

            setTimeout(function() {
              $('#save-for-later').popover('destroy');
            }, 2000);
          }
        });
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(deleteSaved, 30*1000) // 30 seconds
        // 1000 milisec = 1 sec
    }
};