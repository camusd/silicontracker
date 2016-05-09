var val_array = [];

function submitData(data) {
  $.post('/kiosk/submit', {data});
  var len = data.length;
  if(len === 1) {
    alert("The transaction of "+len+" item has completed successfully");
  } else {
    alert("The transaction of "+len+" items has completed successfully");
  }
  window.location="/kiosk/";
};

function arrayFind(arr, fn) {
  for(var i = 0; i < arr.length; i++) {
    if(fn(arr[i])) {
      return i;
    }
  }
  return -1;
}

$(document).ready(function() {
  var pressed = false; 
  var chars = [];
  var t_out = $('#Check_Out').DataTable( {
    bPaginate: false,
    bLengthChange: false,
    retrieve: true
  });
  var t_in = $('#Check_In').DataTable( {
    bPaginate: false,
    bLengthChange: false,
    retrieve: true
  });
  $('#scan-error').hide();
  $(window).keypress(function(e) {
    chars.push(String.fromCharCode(e.which));
    if (pressed == false) {
      setTimeout(function(){
      // If there are ten characters inserted before the timeout
      if (chars.length >= 10) {
        var barcode = chars.join("");
        barcode = barcode.replace("\r","");
        // There was an item scanned. Enter response code here.
        $.get('/serial/'+barcode, function(data) {
          if(data.err == 'Item Not Found') {
            $('#scan-error').html("<div>Item not found in database</div>");
            if($('#scan-error').is(":hidden")) {
              $('#scan-error').show();
            }
          } else if(data.scrapped == 'Scrapped') {
            $('#scan-error').html("<div>Scrapped items cannot be checked in or out</div>");
            if($('#scan-error').is(":hidden")) {
              $('#scan-error').show();
            }
          } else if(arrayFind(val_array, function(n) {
            return n == data.serial_num;
          }) != -1) {
            $('#scan-error').html("<div>Item is already in the cart</div>");
            if($('#scan-error').is(":hidden")) {
              $('#scan-error').show();
            }
          } else {
            if($('#scan-error').is(":visible")) {
              $('#scan-error').hide();
            }
            if(data.checked_in === 'Checked In') {
              t_out.row.add([barcode]).draw();
            } else {
              t_in.row.add([barcode]).draw();
            }
            val_array.push(barcode);
          }
        });
      }
      chars = [];
      pressed = false;
      },250); // <-- this is the timeout in milliseconds
    }
    pressed = true;
  });
});