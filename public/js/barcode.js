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
                      if (data.item_type === 'cpu') {$('#item-info').html(CPUInfo(data));}
                      else if (data.item_type === 'ssd') {$('#item-info').html(SSDInfo(data));}
                      else if (data.item_type === 'memory') {$('#item-info').html(MemoryInfo(data));}
                      else if (data.item_type === 'flash_drive') {$('#item-info').html(FlashDriveInfo(data));}
                      else if (data.item_type === 'board') {$('#item-info').html(BoardInfo(data));}
                      else {$('#item-info').html(ErrorInfo());}
                    });
                }
                chars = [];
                pressed = false;
            },100); // <-- this is the timeout in milliseconds
        }
        pressed = true;
    });

// Add id=barcode to your input field if you plan on
// using the barcode scanner and you don't want the
// scanner to submit the form.
$("#barcode").keypress(function(e){
    if ( e.which === 13 ) {
        e.preventDefault();
    }
});

function UserInfo(info) {
  return ('<div class="col-sm-6 col-xs-12"><strong>Checked In/Out:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.checked_in+'</div>'+
          '<div class="col-sm-6 col-xs-12"><strong>Scrapped Status:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">'+info.scrapped+'</div>');
}

function CPUInfo(info) {
  console.log(info);
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
  console.log(info);
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
  return  ('<div class="col-sm-6 col-xs-12"><strong>Error:</strong></div>'+
          '<div class="col-sm-6 col-xs-12">Item Not Found</div>');
}