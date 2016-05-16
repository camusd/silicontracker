/*
 *	barcode.js
 *
 *	This is a script for the barcode scanner. JQuery is used to detect
 *	if a human typed into a keyboard or if a barcode scanner was used.
 *	If a series of characters are all entered within a very short timeframe,
 *	then we can deduct that a barcode scanner was used.
 *
 */

$(document).ready(function() {
  var pressed = false;
  var chars = [];
  var currentItem = {serial_num: '', checked_in: ''};
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

  $('#save-for-later').click(function() {
    $.post('/kiosk/saveforlater', currentItem)
      .done(function() {
        $('#save-for-later').blur();

        $('#save-for-later').popover({
          animation: true,
          content: 'Item saved for later.',
          placement: 'top auto'
        }).popover('show');

        setTimeout(function() {
          $('#save-for-later').popover('destroy');
        }, 2000);

        // set timer to delete serials
        countdown();
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
  if (data.checked_in === 'Checked In') {
    $('#save-for-later span').text('Check Out');
  } else {
    $('#save-for-later span').text('Check In');
  }
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
var seconds = 60;
var countdownSet = false;
function countdown() {
  if (countdownSet === false) {
    countdownSet = true;
    function tick() {
      //This script expects an element with an ID = "counter". You can change that to what ever you want. 
      var counter = document.getElementById("time");
      seconds--;
      counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
      if(seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        countdownSet = false;
        $.post('/kiosk/deletesaved', function() {
          counter.innerHTML = 'Items not saved.';
          setTimeout(function() {
            counter.innerHTML = '';
          }, 5000);
        });
      }
    }
    tick();
  } else {
    resetCountdown();
  }
  
}
function resetCountdown() {
  seconds = 60;
}