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
    $(window).keypress(function(e) {
        chars.push(String.fromCharCode(e.which));
        if (pressed == false) {
            setTimeout(function(){
                // If there are ten characters inserted before the timeout
                if (chars.length >= 10) {
                    var barcode = chars.join("");
                    barcode = barcode.replace("\r","");
                    // There was an item scanned. Enter response code here.
                    // TODO: instead of alerting after ajax call, make call to either
                    //       loading a popup or inline on page... basically something
                    //       prettier than an alert.
                    $.get('/cart/serial/'+barcode, function(data) {
                        if(data.length == 0) {
                            alert("Item not found in database");
                        }
                        $.each(data, function(idx, elem) {
                            if(elem) {
                                t_out.row.add([barcode]).draw();
                            } else {
                                t_in.row.add([barcode]).draw();
                            }
                            val_array.push(barcode);
                        });
                    });
                }
                chars = [];
                pressed = false;
            },250); // <-- this is the timeout in milliseconds
        }
        pressed = true;
    });
});