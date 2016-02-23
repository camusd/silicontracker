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
                    // TODO: instead of alerting after ajax call, make call to either
                    //       loading a popup or inline on page... basically something
                    //       prettier than an alert.
                    var itemInfo = "";
                    $.get('/query/'+barcode, function(data) {
                        $.each(data, function(idx, elem) {
                            itemInfo += 'Serial number:\t' + elem.serial_num + '\n';
                            itemInfo += 'Checked out by:\tScott' + '\n';
                            itemInfo += 'Spec:\t' + elem.spec + '\n';
                            itemInfo += 'MM:\t' + elem.mm + '\n';
                            itemInfo += 'Frequency:\t' + elem.frequency + '\n';
                            itemInfo += 'Stepping:\t' + elem.stepping + '\n';
                            itemInfo += 'LLC:\t' + elem.llc + '\n';
                            itemInfo += 'Cores:\t' + elem.cores + '\n';
                            itemInfo += 'Codename:\t' + elem.codename + '\n';
                            itemInfo += 'CPU Class:\t' + elem.cpu_class + '\n';
                            itemInfo += 'External Name:\t' + elem.external_name + '\n';
                            itemInfo += 'Architecture:\t' + elem.architecture + '\n';
                        });
                        alert(itemInfo);
                    });
                }
                chars = [];
                pressed = false;
            },100); // <-- this is the timeout in milliseconds
        }
        pressed = true;
    });
});

// Add id=barcode to your input field if you plan on
// using the barcode scanner and you don't want the
// scanner to submit the form.
$("#barcode").keypress(function(e){
    if ( e.which === 13 ) {
        e.preventDefault();
    }
});