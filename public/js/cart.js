var val_array = [];

function arrayFind(arr, fn) {
  for(var i = 0; i < arr.length; i++) {
    if(fn(arr[i])) {
      return i;
    }
  }
  return -1;
}

function printStatus(status) {
  return (status === 1) ? 'Checked In' : 'Checked Out';
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

  $.get('/kiosk/saveforlater', function(data) {
    $.each(data, function(idx, elem) {
      if(elem.checked_in === 'Checked In') {
        t_out.row.add([elem.serial_num]).draw();
      } else {
        t_in.row.add([elem.serial_num]).draw();
      }
      val_array.push(elem.serial_num);
    });
  });


  // Add the rows to the modal table.
  function addModalRows(dataArr) {
    $.each(dataArr, function(idx, elem) {
      $('#submit-results tbody').append('<tr><td>'+elem.serial_num+'</td>'+
        '<td>'+itemTypes[elem.item_type]+'</td><td>'+printStatus(elem.status)+'</td></tr>');
    });
  }

  // Submit serial numbers to the server.
  function submitData(data) {
    $.post('/kiosk/submit', {data})
      .done(function(returnData) {
        // Success! display the modal.
        addModalRows(returnData);
        $('#SuccessModal').modal();

        val_array = [];

        // After 5 seconds, close the modal.
        setTimeout(function() {
          $('#SuccessModal').modal('hide');
        }, 5000);
      });
  }

  // Commit the check ins/outs.
  $('#submit').on('click', function(event) {
    submitData(val_array);
  });

  // After the modal goes away, redirect back to the homescreen.
  // The user will be logged out at this point. 
  $('#SuccessModal').on('hidden.bs.modal', function(e) {
    window.location="/kiosk";
  });

  $('#silicontracker').click(function() {
    $.post('/kiosk/logout');
  });

  $(window).on('beforeunload', function() {
    if (val_array.length > 0) {
      return "Items are still in the cart. Are you sure?";
    }
  });
  
  // Barcode Scanner logic
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
          } else if(data.scrapped === 'Scrapped' && data.checked_in === 'Checked In') {
            $('#scan-error').html("<div>Scrapped items cannot be checked out</div>");
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