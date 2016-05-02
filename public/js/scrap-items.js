// function format(notes) {
//   return '<form id="form-notes" action="/update/cpu/notes" method="post">\
//             <div id="fg" class="form-group">\
//               <textarea rows="4" cols="80" id="notes" placeholder="Add Notes Here">'+notes+'</textarea>\
//             </div>\
//             <button class="btn btn-primary form-submit" id="save-notes">Save</button>\
//           </form>\
//           <div class="col-xs-12" id="save-status"></div>';
// }

// var cpuColNames = ['', '', 'Serial Number','Spec','MM','Freq','Step','LLC','Cores','Codename','CPU Class','External Name', 'Architecture'];

// var cpu_table;
// var cpu_data;
// var ssd_table;
// var ssd_data;
// var memory_table;
// var memory_data;
// var flash_table;
// var flash_data;

// var jsonData = {};
// var cpu = [];
// var ssd = [];
// var memory = [];
// var flash = [];

// jsonData.cpu = cpu;
// jsonData.ssd = ssd;
// jsonData.memory = memory;
// jsonData.flash = flash;

// var pressed = false; 
// var chars = [];

// //to be deleted
// function get_test_barcode() {
//   var barcode = $("#testing_barcode").val();
//   return barcode;
// }

// function arrayFind(arr, fn) {
//   for(var i = 0; i < arr.length; i++) {
//     if(fn(arr[i])) {
//       return i;
//     }
//   }
//   return -1;
// }

// function submitData(data, cpu_len, ssd_len, mem_len, flash_len) {
//   $.post("/scrap/submit", data); 
//   var len = cpu_len + ssd_len + mem_len + flash_len;
//   if(len === 1) {
//     alert(len + " item was scrapped");
//   } else {
//     alert(len + " items were scrapped");
//   }
//   window.location="/";
// };

// // test code to be deleted
// function run_on_test_submit(cpu) {
//   var barcode = get_test_barcode();
//   $.get('/data/scrap/cpu/'+barcode, function(data) {
//     if(data.length == 0) {
//       $('#scrap-error').html("<div>Item not found in database</div>");
//       if($('#scrap-error').is(":hidden")) {
//         $('#scrap-error').show();
//       }
//     } else if(arrayFind(cpu, function(n) {
//       return n.serial_num == data.serial_num;
//     }) != -1) {
//       $('#scrap-error').html("<div>Item is already in the table of items to be scrapped</div>");
//       if($('#scrap-error').is(":hidden")) {
//         $('#scrap-error').show();
//       }
//     } else if(data.scrapped === 1) {
//       $('#scrap-error').html("<div>Item has already been scrapped previously</div>");
//       if($('#scrap-error').is(":hidden")) {
//         $('#scrap-error').show();
//       }
//     } else {
//       if($('#scrap-error').is(":visible")) {
//         $('#scrap-error').hide();
//       }
//       cpu.push(data);
//       jsonData.cpu = cpu;
//       cpu_table.row.add(cpu[cpu.length - 1]);
//       cpu_table.draw();
//     }
//   });
// }


// $(document).ready(function() {
//   $('#scrap-error').hide();
//   $(window).keypress(function(e) {
//       chars.push(String.fromCharCode(e.which));
//       if (pressed == false) {
//           setTimeout(function(){
//               // If there are ten characters inserted before the timeout
//               if (chars.length >= 10) {
//                   var barcode = chars.join("");
//                   barcode = barcode.replace("\r","");
//                   // There was an item scanned. Enter response code here.
//                   // TODO: instead of alerting after ajax call, make call to either
//                   //       loading a popup or inline on page... basically something
//                   //       prettier than an alert.
//                   $.get('/data/scrap/cpu/'+barcode, function(data) {
//                       if(data.length == 0) {
//                         alert("Item not found in database");
//                       } else if(arrayFind(cpu, function(n) {
//                         return n.serial_num == data.serial_num;
//                       }) != -1) {
//                         //change alert to modal
//                         alert("Item already in the table of items to be scrapped");
//                       } else if(data.scrapped === 1) {
//                         //change alert to modal
//                         alert("Item is already scrapped");
//                       } else {
//                         cpu.push(data);
//                         jsonData.cpu = cpu;
//                         cpu_table.row.add(cpu[cpu.length - 1]);
//                         cpu_table.draw();
//                       }
//                   });
//               }
//               chars = [];
//               pressed = false;
//           },100); // <-- this is the timeout in milliseconds
//       }
//       pressed = true;
//   });

//   $.get('/data/cpu', function(data) {
//     cpu_table = $('#cpu_table').DataTable({
//     "data": jsonData.cpu,
//     "columns" : [
//       {
//         "className": 'notes-control',
//         "orderable": false,
//         "data": null,
//         "defaultContent": '',
//         "visible": false
//       },
//       {
//         "className": 'scrap-control',
//         "orderable": false,
//         "defaultContent": '',
//         "data": "scrapped",
//         "visible": false
//       },
//       {"data" : "serial_num"},
//       {"data" : "spec"},
//       {"data" : "mm"},
//       {"data" : "frequency"},
//       {"data" : "stepping"},
//       {"data" : "llc"},
//       {"data" : "cores"},
//       {"data" : "codename"},
//       {"data" : "cpu_class"},
//       {"data" : "external_name"},
//       {"data" : "architecture"},
//       {
//         "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
//         "orderable": false,
//         "className": "btn-notes",
//       },
//       {
//         "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
//         "orderable": false,
//         "className": "btn-edit",
//         "visible": false,
//       },
//     ],
//     "paging"      : true,
//     "pagingType"  : "simple_numbers",
//     "pageLength"  : 50,
//     "fixedHeader" : {
//          "header" : true,
//          "footer" : false
//     }
//     });
//     if (data.is_admin === 1) {
//       cpu_table.column(-1).visible(true);
//     }
//     // setting the column search bar width
//     $('#cpuFilterCols th').each( function (idx) {
//       var title = $(this).text();
//       if (this.id !== 'colBtn') {
//         $(this).html( '<input type="text" style="width: 95%;" placeholder="'+title+'" />' );
//       }
//     });
//     // Apply the search
//     $('#cpuFilterCols th').each(function (idx){
//       // The plus 2 is needed because the first two columns are the 
//       // notes field (the child row) and scrapped field.
//       var col = cpu_table.column(idx+2);
//       $('input', this).on( 'keyup change', function () {
//         col.search( this.value ).draw();
//       });
//     });

//     // Add event listener for opening and closing details
//     cpu_table.on('click', '.btn-notes', function () {
//       var tr = $(this).closest('tr');
//       var row = cpu_table.row(tr);
      
//       if (row.child.isShown()) {
//           // This row is already open - close it
//           row.child.hide();
//       } else {
//         // Open this row
//         row.child(format(row.data().notes)).show();

//         // Setup form listener to send POST Ajax on submit.
//         var childRow = $(tr).next();
//         childRow.find('form').submit(function(e) {
//           e.preventDefault();
//           var newNotes = $(this).find('#notes').val();
//           var dataToSend = {
//             serial_num: row.data().serial_num,
//             notes: newNotes
//           };
//           $.post('/update/cpu/notes', dataToSend, function(data, status, jqXHR) {
//             if (status !== 'success') {
//               alert('Error: Could not save notes.');
//             } else {
//               row.data().notes = newNotes;
//               childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
//             }
//           });
//         });
//       }
//     });
//     cpu_table.on('click', '.btn-edit', function() {
//       var tr = $(this).closest('tr');
//       var row = cpu_table.row(tr);
//       cpu_data = {
//         index: row.index(),
//         serial_num: row.data().serial_num,
//         spec: row.data().spec,
//         mm: row.data().mm,
//         frequency: row.data().frequency,
//         stepping: row.data().stepping,
//         llc: row.data().llc,
//         cores: row.data().cores,
//         codename: row.data().codename,
//         cpu_class: row.data().cpu_class,
//         external_name: row.data().external_name,
//         architecture: row.data().architecture,
//         notes: row.data().notes,
//         scrapped: row.data().scrapped
//       };
//       $('#editCPUModal').modal('show');
//     });

//     // Placing the table in a horizontally scrollable box.
//     // NOTE: Don't try using the scrollX DataTables option.
//     // It messes with the column widths between the table header and body.
//     var tableId = 'cpu_table';
//     $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());

//   });

//   $.get('/data/ssd', function(jsonData) {
//     ssd_table = $('#ssd_table').DataTable({
//     "data": jsonData.items,
//     "columns" : [
//       {
//         "className": 'notes-control',
//         "orderable": false,
//         "data": null,
//         "defaultContent": '',
//         "visible": false
//       },
//       {
//         "className": 'scrap-control',
//         "orderable": false,
//         "defaultContent": '',
//         "data": "scrapped",
//         "visible": false
//       },
//       {"data" : "serial_num"},
//       {"data" : "capacity"},
//       {"data" : "manufacturer"},
//       {"data" : "model"},
//       {
//         "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
//         "orderable": false,
//         "className": "btn-notes",
//       },
//       {
//         "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
//         "orderable": false,
//         "className": "btn-edit",
//         "visible": false,
//       },
//     ],
//     "paging"      : true,
//     "pagingType"  : "simple_numbers",
//     "pageLength"  : 50,
//     "fixedHeader" : {
//          "header" : true,
//          "footer" : false
//     }
//     });
//     if (jsonData.is_admin === 1) {
//       ssd_table.column(-1).visible(true);
//     }

//     // setting the column search bar width
//     $('#ssdFilterCols th').each( function (idx) {
//       var title = $(this).text();
//       if (this.id !== 'colBtn') {
//         $(this).html( '<input type="text" style="width: 95%" placeholder="'+title+'" />' );
//       }
//     });

//     // Apply the search
//     $('#ssdFilterCols th').each(function (idx){
//       // The plus 2 is needed because the first two columns are the 
//       // notes field (the child row) and scrapped field.
//       var col = ssd_table.column(idx+2);
//       $('input', this).on( 'keyup change', function () {
//         col.search( this.value ).draw();
//       });
//     });

//     // Add event listener for opening and closing details
//     ssd_table.on('click', '.btn-notes', function () {
//       var tr = $(this).closest('tr');
//       var row = ssd_table.row(tr);
      
//       if (row.child.isShown()) {
//           // This row is already open - close it
//           row.child.hide();
//       } else {
//         // Open this row
//         row.child(format(row.data().notes)).show();

//         // Setup form listener to send POST Ajax on submit.
//         var childRow = $(tr).next();
//         childRow.find('form').submit(function(e) {
//           e.preventDefault();
//           var newNotes = $(this).find('#notes').val();
//           var dataToSend = {
//             serial_num: row.data().serial_num,
//             notes: newNotes
//           };
//           $.post('/update/ssd/notes', dataToSend, function(data, status, jqXHR) {
//             if (status !== 'success') {
//               alert('Error: Could not save notes.');
//             } else {
//               row.data().notes = newNotes;
//               childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
//             }
//           });
//         });
//       }
//     });
//     ssd_table.on('click', '.btn-edit', function() {
//       var tr = $(this).closest('tr');
//       var row = ssd_table.row(tr);
//       ssd_data = {
//         index: row.index(),
//         serial_num: row.data().serial_num,
//         capacity: row.data().capacity,
//         manufacturer: row.data().manufacturer,
//         model: row.data().model,
//         notes: row.data().notes,
//         scrapped: row.data().scrapped
//       };
//       $('#editSSDModal').modal('show');
//     });

//     // Placing the table in a horizontally scrollable box.
//     // NOTE: Don't try using the scrollX DataTables option.
//     // It messes with the column widths between the table header and body.
//     var tableId = 'ssd_table';
//     $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());
//   });

//   $.get('/data/memory', function(jsonData) {
//     memory_table = $('#memory_table').DataTable({
//     "data": jsonData.items,
//     "columns" : [
//       {
//         "className": 'notes-control',
//         "orderable": false,
//         "data": null,
//         "defaultContent": '',
//         "visible": false
//       },
//       {
//         "className": 'scrap-control',
//         "orderable": false,
//         "defaultContent": '',
//         "data": "scrapped",
//         "visible": false
//       },
//       {"data" : "serial_num"},
//       {"data" : "manufacturer"},
//       {"data" : "physical_size"},
//       {"data" : "ecc"},
//       {"data" : "ranks"},
//       {"data" : "memory_type"},
//       {"data" : "capacity"},
//       {"data" : "speed"},
//       {
//         "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
//         "orderable": false,
//         "className": "btn-notes",
//       },
//       {
//         "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
//         "orderable": false,
//         "className": "btn-edit",
//         "visible": false,
//       }
//     ],
//     "paging"      : true,
//     "pagingType"  : "simple_numbers",
//     "pageLength"  : 50,
//     "fixedHeader" : {
//          "header" : true,
//          "footer" : false
//     }
//     });
//     if (jsonData.is_admin === 1) {
//       memory_table.column(-1).visible(true);
//     }

//     // setting the column search bar width
//     $('#memoryFilterCols th').each( function (idx) {
//       var title = $(this).text();
//       if (this.id !== 'colBtn') {
//         $(this).html( '<input type="text" style="width: 95%" placeholder="'+title+'" />' );
//       }
//     });

//     // Apply the search
//     $('#memoryFilterCols th').each(function (idx){
//       // The plus 2 is needed because the first two columns are the 
//       // notes field (the child row) and scrapped field.
//       var col = memory_table.column(idx+2);
//       $('input', this).on( 'keyup change', function () {
//         col.search( this.value ).draw();
//       });
//     });

//     // Add event listener for opening and closing details
//     memory_table.on('click', '.btn-notes', function () {
//       var tr = $(this).closest('tr');
//       var row = memory_table.row(tr);
      
//       if (row.child.isShown()) {
//           // This row is already open - close it
//           row.child.hide();
//       } else {
//         // Open this row
//         row.child(format(row.data().notes)).show();

//         // Setup form listener to send POST Ajax on submit.
//         var childRow = $(tr).next();
//         childRow.find('form').submit(function(e) {
//           e.preventDefault();
//           var newNotes = $(this).find('#notes').val();
//           var dataToSend = {
//             serial_num: row.data().serial_num,
//             notes: newNotes
//           };
//           $.post('/update/memory/notes', dataToSend, function(data, status, jqXHR) {
//             if (status !== 'success') {
//               alert('Error: Could not save notes.');
//             } else {
//               row.data().notes = newNotes;
//               childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
//             }
//           });
//         });
//       }
//     });
//     memory_table.on('click', '.btn-edit', function() {
//       var tr = $(this).closest('tr');
//       var row = memory_table.row(tr);
//       memory_data = {
//         index: row.index(),
//         serial_num: row.data().serial_num,
//         manufacturer: row.data().manufacturer,
//         physical_size: row.data().physical_size,
//         ecc: row.data().ecc,
//         ranks: row.data().ranks,
//         memory_type: row.data().memory_type,
//         capacity: row.data().capacity,
//         speed: row.data().speed,
//         notes: row.data().notes,
//         scrapped: row.data().scrapped
//       };
//       $('#editMemoryModal').modal('show');
//     });

//     // Placing the table in a horizontally scrollable box.
//     // NOTE: Don't try using the scrollX DataTables option.
//     // It messes with the column widths between the table header and body.
//     var tableId = 'memory_table';
//     $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());

//   });

//   $.get('/data/flash', function(jsonData) {
//     flash_table = $('#flash_table').DataTable({
//     "data": jsonData.items,
//     "columns" : [
//       {"data" : "serial_num"},
//       {"data" : "capacity"},
//       {"data" : "manufacturer"},
//       {"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
//     ],
//     "scrollX"     : true,
//     "paging"      : true,
//     "pagingType"  : "simple_numbers",
//     "pageLength"  : 50,
//     "fixedHeader" : {
//          "header" : true,
//          "footer" : false
//       }
//     });
//     if (jsonData.is_admin === 1) {
//       flash_table.column(-1).visible(true);
//     }
//     // Apply the search
//     $('#flashFilterCols th').each(function (idx){
//       var col = flash_table.column(idx);
//       $('input', this).on( 'keyup change', function () {
//         col.search( this.value ).draw();
//       });
//     });
//   });

//   /* Modals */
//   $('#editCPUModal').on('show.bs.modal', function (event) {
//     var modal = $(this);
//     modal.find('#serial_input').val(cpu_data.serial_num);
//     modal.find('#spec_input').val(cpu_data.spec);
//     modal.find('#mm_input').val(cpu_data.mm);
//     modal.find('#freq_input').val(cpu_data.frequency);
//     modal.find('#step_input').val(cpu_data.stepping);
//     modal.find('#llc_input').val(cpu_data.llc);
//     modal.find('#cores_input').val(cpu_data.cores);
//     modal.find('#codename_input').val(cpu_data.codename);
//     modal.find('#class_input').val(cpu_data.cpu_class);
//     modal.find('#external_input').val(cpu_data.external_name);
//     modal.find('#arch_input').val(cpu_data.architecture);
//     modal.find('#notes_input').val(cpu_data.notes);
//     if(modal.find('#scrap_input').val(cpu_data.scrapped) == 1) {
//       modal.find('#scrap_input').prop('checked', true);
//     } else {
//       modal.find('#scrap_input').prop('checked', false);
//     };
//   });
//   $('#editCPUSave').on('click', function() {
//     var form = $(this).closest('.modal-content').find('form');
//     cpu_data.spec = form.find('#spec_input').val();
//     cpu_data.mm = form.find('#mm_input').val();
//     cpu_data.frequency = form.find('#freq_input').val();
//     cpu_data.stepping = form.find('#step_input').val();
//     cpu_data.llc = form.find('#llc_input').val();
//     cpu_data.cores = form.find('#cores_input').val();
//     cpu_data.codename = form.find('#codename_input').val();
//     cpu_data.cpu_class = form.find('#class_input').val();
//     cpu_data.external_name = form.find('#external_input').val();
//     cpu_data.architecture = form.find('#arch_input').val();
//     cpu_data.notes = form.find('#notes_input').val();
//     if(document.getElementById('scrap_input').checked) {
//       cpu_data.scrapped = 1;
//     } else {
//       cpu_data.scrapped = 0;
//     };
//     $.post('/update/cpu', cpu_data, function(data, status, jqXHR) {
//       if (status !== 'success') {
//         alert('CPU item did not update!');
//       } else {
//         if(cpu_data.scrapped == 1) {
//           //Remove scrapped item and update banner to reflect that
//           cpu_table.row(cpu_data.index).remove();
//           cpu_table.draw();
//         } else {
//           cpu_table.row(cpu_data.index).data(cpu_data).draw();
//         };
//         $('#editCPUModal').modal('hide');
//       }
//     });
//   });

//   $('#editSSDModal').on('show.bs.modal', function (event) {
//     var modal = $(this);
//     modal.find('#serial_input').val(ssd_data.serial_num);
//     modal.find('#capacity_input').val(ssd_data.capacity);
//     modal.find('#manufacturer_input').val(ssd_data.manufacturer);
//     modal.find('#model_input').val(ssd_data.model);
//     modal.find('#notes_input').val(ssd_data.notes);
//     if(modal.find('#scrap_input').val(ssd_data.scrapped) == 1) {
//       modal.find('#scrap_input').prop('checked', true);
//     } else {
//       modal.find('#scrap_input').prop('checked', false);
//     };
//   });
//   $('#editSSDSave').on('click', function() {
//     var form = $(this).closest('.modal-content').find('form');
//     ssd_data.capacity = form.find('#capacity_input').val();
//     ssd_data.manufacturer = form.find('#manufacturer_input').val();
//     ssd_data.model = form.find('#model_input').val();
//     ssd_data.notes = form.find('#notes_input').val();
//     if(document.getElementById('scrap_input').checked) {
//       ssd_data.scrapped = 1;
//     } else {
//       ssd_data.scrapped = 0;
//     };
//     $.post('/update/ssd', ssd_data, function(data, status, jqXHR) {
//       if (status !== 'success') {
//         alert('SSD item did not update!');
//       } else {
//         if(ssd_data.scrapped == 1) {
//           //Remove scrapped item and update banner to reflect that
//           ssd_table.row(ssd_data.index).remove();
//           $.get('/data/stats', function(data) {
//             $('#infoBanner').empty();
//             $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
//             $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
//                                     data.num_active + ' active + ' +
//                                     data.num_scrapped + ' scrapped = ' +
//                                     data.num_total + '</span>');
//           });
//           ssd_table.draw();
//         } else {
//           ssd_table.row(ssd_data.index).data(ssd_data).draw();
//         };
//         $('#editSSDModal').modal('hide');
//       }
//     });
//   });

//   $('#editMemoryModal').on('show.bs.modal', function (event) {
//     var modal = $(this);
//     modal.find('#serial_input').val(memory_data.serial_num);
//     modal.find('#manufacturer_input').val(memory_data.manufacturer);
//     modal.find('#physical_size_input').val(memory_data.physical_size);
//     modal.find('#ecc_input').val(memory_data.ecc);
//     modal.find('#ranks_input').val(memory_data.ranks);
//     modal.find('#memory_type_input').val(memory_data.memory_type);
//     modal.find('#capacity_input').val(memory_data.capacity);
//     modal.find('#speed_input').val(memory_data.speed);
//     modal.find('#notes_input').val(memory_data.notes);
//     if(modal.find('#scrap_input').val(memory_data.scrapped) == 1) {
//       modal.find('#scrap_input').prop('checked', true);
//     } else {
//       modal.find('#scrap_input').prop('checked', false);
//     };
//   });
//   $('#editMemorySave').on('click', function() {
//     var form = $(this).closest('.modal-content').find('form');
//     memory_data.manufacturer = form.find('#manufacturer_input').val();
//     memory_data.physical_size = form.find('#physical_size_input').val();
//     memory_data.ecc = form.find('#ecc_input').val();
//     memory_data.ranks = form.find('#ranks_input').val();
//     memory_data.memory_type = form.find('#memory_type_input').val();
//     memory_data.capacity = form.find('#capacity_input').val();
//     memory_data.speed = form.find('#speed_input').val();
//     memory_data.notes = form.find('#notes_input').val();
//     if(document.getElementById('scrap_input').checked) {
//       memory_data.scrapped = 1;
//     } else {
//       memory_data.scrapped = 0;
//     };
//     $.post('/update/memory', memory_data, function(data, status, jqXHR) {
//       if (status !== 'success') {
//         alert('Memory item did not update!');
//       } else {
//         if(memory_data.scrapped == 1) {
//           //Remove scrapped item and update banner to reflect that
//           memory_table.row(memory_data.index).remove();
//           $.get('/data/stats', function(data) {
//             $('#infoBanner').empty();
//             $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
//             $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
//                                     data.num_active + ' active + ' +
//                                     data.num_scrapped + ' scrapped = ' +
//                                     data.num_total + '</span>');
//           });
//           memory_table.draw();
//         } else {
//           memory_table.row(memory_data.index).data(memory_data).draw();
//         };
//         $('#editMemoryModal').modal('hide');
//       }
//     });
//   });
// });



























function format(notes) {
  return '<form id="form-notes" action="/update/cpu/notes" method="post">\
            <div id="fg" class="form-group">\
              <textarea rows="4" cols="80" id="notes" placeholder="Add Notes Here">'+notes+'</textarea>\
            </div>\
            <button class="btn btn-primary form-submit" id="save-notes">Save</button>\
          </form>\
          <div class="col-xs-12" id="save-status"></div>';
}

//to be deleted
function get_test_barcode() {
  var barcode = $("#testing_barcode").val();
  return barcode;
}

function arrayFind(arr, fn) {
  for(var i = 0; i < arr.length; i++) {
    if(fn(arr[i])) {
      return i;
    }
  }
  return -1;
}

function submitData(data, cpu_len, ssd_len, mem_len, flash_len) {
  $.post("/scrap/submit", data); 
  var len = cpu_len + ssd_len + mem_len + flash_len;
  if(len === 1) {
    alert(len + " item was scrapped");
  } else {
    alert(len + " items were scrapped");
  }
  window.location="/";
};

// test code to be deleted
function run_on_test_submit() {
  var barcode = get_test_barcode();
  var item_found = 0;
  $.get('/data/scrap/cpu/'+barcode, function(data) {
    if(data.length == 0) {
      return;
    } else if(arrayFind(cpu, function(n) {
      return n.serial_num == data.serial_num;
    }) != -1) {
      $('#scrap-error').html("<div>Item is already in the table of items to be scrapped</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else if(data.scrapped === 1) {
      $('#scrap-error').html("<div>Item has already been scrapped previously</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else {
      if($('#scrap-error').is(":visible")) {
        $('#scrap-error').hide();
      }
      item_found = 1;
      cpu.push(data);
      jsonToSend.cpu = cpu;
      cpu_table.row.add(cpu[cpu.length - 1]);
      cpu_table.draw();
    }
  });

  $.get('/data/scrap/ssd/'+barcode, function(data) {
    if(data.length == 0) {
      return;
    } else if(arrayFind(ssd, function(n) {
      return n.serial_num == data.serial_num;
    }) != -1) {
      $('#scrap-error').html("<div>Item is already in the table of items to be scrapped</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else if(data.scrapped === 1) {
      $('#scrap-error').html("<div>Item has already been scrapped previously</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else {
      if($('#scrap-error').is(":visible")) {
        $('#scrap-error').hide();
      }
      item_found = 1;
      ssd.push(data);
      jsonToSend.ssd = ssd;
      ssd_table.row.add(ssd[ssd.length - 1]);
      ssd_table.draw();
    }
  });

  $.get('/data/scrap/memory/'+barcode, function(data) {
    if(data.length == 0) {
      return;
    } else if(arrayFind(memory, function(n) {
      return n.serial_num == data.serial_num;
    }) != -1) {
      $('#scrap-error').html("<div>Item is already in the table of items to be scrapped</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else if(data.scrapped === 1) {
      $('#scrap-error').html("<div>Item has already been scrapped previously</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else {
      if($('#scrap-error').is(":visible")) {
        $('#scrap-error').hide();
      }
      item_found = 1;
      memory.push(data);
      jsonToSend.memory = memory;
      memory_table.row.add(memory[memory.length - 1]);
      memory_table.draw();
    }
  });

  $.get('/data/scrap/flash/'+barcode, function(data) {
    if(data.length == 0) {
      return;
    } else if(arrayFind(flash, function(n) {
      return n.serial_num == data.serial_num;
    }) != -1) {
      $('#scrap-error').html("<div>Item is already in the table of items to be scrapped</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else if(data.scrapped === 1) {
      $('#scrap-error').html("<div>Item has already been scrapped previously</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else {
      if($('#scrap-error').is(":visible")) {
        $('#scrap-error').hide();
      }
      item_found = 1;
      flash.push(data);
      jsonToSend.flash = flash;
      flash_table.row.add(flash[flash.length - 1]);
      flash_table.draw();
    }
  });

    $.get('/data/scrap/board/'+barcode, function(data) {
    if(data.length == 0) {
      if(item_found == 0) {
        $('#scrap-error').html("<div>Item not found in database</div>");
        if($('#scrap-error').is(":hidden")) {
          $('#scrap-error').show();
        }
      }
      return;
    } else if(arrayFind(board, function(n) {
      return n.serial_num == data.serial_num;
    }) != -1) {
      $('#scrap-error').html("<div>Item is already in the table of items to be scrapped</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else if(data.scrapped === 1) {
      $('#scrap-error').html("<div>Item has already been scrapped previously</div>");
      if($('#scrap-error').is(":hidden")) {
        $('#scrap-error').show();
      }
    } else {
      if($('#scrap-error').is(":visible")) {
        $('#scrap-error').hide();
      }
      item_found = 1;
      board.push(data);
      jsonToSend.board = board;
      board_table.row.add(board[board.length - 1]);
      board_table.draw();
    }
  });
}

  var cpu_table;
  var cpu_data;
  var ssd_table;
  var ssd_data;
  var memory_table;
  var memory_data;
  var flash_table;
  var flash_data;
  var board_table;
  var board_data;

  var jsonToSend = {};
  var cpu = [];
  var ssd = [];
  var memory = [];
  var flash = [];
  var board = [];

  var pressed = false; 
  var chars = [];

  jsonToSend.cpu = cpu;
  jsonToSend.ssd = ssd;
  jsonToSend.memory = memory;
  jsonToSend.flash = flash;
  jsonToSend.board = board;

$(document).ready(function() {
  // var cpu_table;
  // var cpu_data;
  // var ssd_table;
  // var ssd_data;
  // var memory_table;
  // var memory_data;
  // var flash_table;
  // var flash_data;
  // var board_table;
  // var board_data;

  // var jsonToSend = {};
  // var cpu = [];
  // var ssd = [];
  // var memory = [];
  // var flash = [];
  // var board = [];

  // var pressed = false; 
  // var chars = [];

  // jsonToSend.cpu = cpu;
  // jsonToSend.ssd = ssd;
  // jsonToSend.memory = memory;
  // jsonToSend.flash = flash;
  // jsonToSend.board = board;

  $('#scrap-error').hide();
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
                  $.get('/data/scrap/cpu/'+barcode, function(data) {
                      if(data.length == 0) {
                        alert("Item not found in database");
                      } else if(arrayFind(cpu, function(n) {
                        return n.serial_num == data.serial_num;
                      }) != -1) {
                        //change alert to modal
                        alert("Item already in the table of items to be scrapped");
                      } else if(data.scrapped === 1) {
                        //change alert to modal
                        alert("Item is already scrapped");
                      } else {
                        cpu.push(data);
                        jsonData.cpu = cpu;
                        cpu_table.row.add(cpu[cpu.length - 1]);
                        cpu_table.draw();
                      }
                  });
              }
              chars = [];
              pressed = false;
          },100); // <-- this is the timeout in milliseconds
      }
      pressed = true;
  });

  $.get('/data/cpu', function(jsonData) {
    cpu_table = $('#cpu_table').DataTable({
    "data": jsonToSend.cpu,
    "columns" : [
      {
        "className": 'notes-control',
        "orderable": false,
        "data": null,
        "defaultContent": '',
        "visible": false
      },
      {
        "className": 'scrap-control',
        "orderable": false,
        "defaultContent": '',
        "data": "scrapped",
        "visible": false
      },
      {"data" : "serial_num"},
      {"data" : "spec"},
      {"data" : "mm"},
      {"data" : "frequency"},
      {"data" : "stepping"},
      {"data" : "llc"},
      {"data" : "cores"},
      {"data" : "codename"},
      {"data" : "cpu_class"},
      {"data" : "external_name"},
      {"data" : "architecture"},
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
        "orderable": false,
        "className": "btn-notes",
      },
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false,
      },
    ],
    "paging"      : true,
    "pagingType"  : "simple_numbers",
    "pageLength"  : 50,
    "fixedHeader" : {
         "header" : true,
         "footer" : false
    }
    });
    if (jsonData.is_admin === 1) {
      cpu_table.column(-1).visible(true);
    }
    // setting the column search bar width
    $('#cpuFilterCols th').each( function (idx) {
      var title = $(this).text();
      if (this.id !== 'colBtn') {
        $(this).html( '<input type="text" style="width: 95%;" placeholder="'+title+'" />' );
      }
    });
    // Apply the search
    $('#cpuFilterCols th').each(function (idx){
      // The plus 2 is needed because the first two columns are the 
      // notes field (the child row) and scrapped field.
      var col = cpu_table.column(idx+2);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });

    // Add event listener for opening and closing details
    cpu_table.on('click', '.btn-notes', function () {
      var tr = $(this).closest('tr');
      var row = cpu_table.row(tr);
      
      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
      } else {
        // Open this row
        row.child(format(row.data().notes)).show();

        // Setup form listener to send POST Ajax on submit.
        var childRow = $(tr).next();
        childRow.find('form').submit(function(e) {
          e.preventDefault();
          var newNotes = $(this).find('#notes').val();
          var dataToSend = {
            serial_num: row.data().serial_num,
            notes: newNotes
          };
          $.post('/update/cpu/notes', dataToSend, function(data, status, jqXHR) {
            if (status !== 'success') {
              alert('Error: Could not save notes.');
            } else {
              row.data().notes = newNotes;
              childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
            }
          });
        });
      }
    });
    cpu_table.on('click', '.btn-edit', function() {
      var tr = $(this).closest('tr');
      var row = cpu_table.row(tr);
      cpu_data = {
        index: row.index(),
        serial_num: row.data().serial_num,
        spec: row.data().spec,
        mm: row.data().mm,
        frequency: row.data().frequency,
        stepping: row.data().stepping,
        llc: row.data().llc,
        cores: row.data().cores,
        codename: row.data().codename,
        cpu_class: row.data().cpu_class,
        external_name: row.data().external_name,
        architecture: row.data().architecture,
        notes: row.data().notes,
        scrapped: row.data().scrapped
      };
      $('#editCPUModal').modal('show');
    });

    // Placing the table in a horizontally scrollable box.
    // NOTE: Don't try using the scrollX DataTables option.
    // It messes with the column widths between the table header and body.
    var tableId = 'cpu_table';
    $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());

    
  });

  $.get('/data/ssd', function(jsonData) {
    ssd_table = $('#ssd_table').DataTable({
    "data": jsonToSend.ssd,
    "columns" : [
      {
        "className": 'notes-control',
        "orderable": false,
        "data": null,
        "defaultContent": '',
        "visible": false
      },
      {
        "className": 'scrap-control',
        "orderable": false,
        "defaultContent": '',
        "data": "scrapped",
        "visible": false
      },
      {"data" : "serial_num"},
      {"data" : "capacity"},
      {"data" : "manufacturer"},
      {"data" : "model"},
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
        "orderable": false,
        "className": "btn-notes",
      },
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false,
      },
    ],
    "paging"      : true,
    "pagingType"  : "simple_numbers",
    "pageLength"  : 50,
    "fixedHeader" : {
         "header" : true,
         "footer" : false
    }
    });
    if (jsonData.is_admin === 1) {
      ssd_table.column(-1).visible(true);
    }

    // setting the column search bar width
    $('#ssdFilterCols th').each( function (idx) {
      var title = $(this).text();
      if (this.id !== 'colBtn') {
        $(this).html( '<input type="text" style="width: 95%" placeholder="'+title+'" />' );
      }
    });

    // Apply the search
    $('#ssdFilterCols th').each(function (idx){
      // The plus 2 is needed because the first two columns are the 
      // notes field (the child row) and scrapped field.
      var col = ssd_table.column(idx+2);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });

    // Add event listener for opening and closing details
    ssd_table.on('click', '.btn-notes', function () {
      var tr = $(this).closest('tr');
      var row = ssd_table.row(tr);
      
      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
      } else {
        // Open this row
        row.child(format(row.data().notes)).show();

        // Setup form listener to send POST Ajax on submit.
        var childRow = $(tr).next();
        childRow.find('form').submit(function(e) {
          e.preventDefault();
          var newNotes = $(this).find('#notes').val();
          var dataToSend = {
            serial_num: row.data().serial_num,
            notes: newNotes
          };
          $.post('/update/ssd/notes', dataToSend, function(data, status, jqXHR) {
            if (status !== 'success') {
              alert('Error: Could not save notes.');
            } else {
              row.data().notes = newNotes;
              childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
            }
          });
        });
      }
    });
    ssd_table.on('click', '.btn-edit', function() {
      var tr = $(this).closest('tr');
      var row = ssd_table.row(tr);
      ssd_data = {
        index: row.index(),
        serial_num: row.data().serial_num,
        capacity: row.data().capacity,
        manufacturer: row.data().manufacturer,
        model: row.data().model,
        notes: row.data().notes,
        scrapped: row.data().scrapped
      };
      $('#editSSDModal').modal('show');
    });

    // Placing the table in a horizontally scrollable box.
    // NOTE: Don't try using the scrollX DataTables option.
    // It messes with the column widths between the table header and body.
    var tableId = 'ssd_table';
    $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());
  });

  $.get('/data/memory', function(jsonData) {
    memory_table = $('#memory_table').DataTable({
    "data": jsonToSend.memory,
    "columns" : [
      {
        "className": 'notes-control',
        "orderable": false,
        "data": null,
        "defaultContent": '',
        "visible": false
      },
      {
        "className": 'scrap-control',
        "orderable": false,
        "defaultContent": '',
        "data": "scrapped",
        "visible": false
      },
      {"data" : "serial_num"},
      {"data" : "manufacturer"},
      {"data" : "physical_size"},
      {"data" : "ecc"},
      {"data" : "ranks"},
      {"data" : "memory_type"},
      {"data" : "capacity"},
      {"data" : "speed"},
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
        "orderable": false,
        "className": "btn-notes",
      },
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false,
      }
    ],
    "paging"      : true,
    "pagingType"  : "simple_numbers",
    "pageLength"  : 50,
    "fixedHeader" : {
         "header" : true,
         "footer" : false
    }
    });
    if (jsonData.is_admin === 1) {
      memory_table.column(-1).visible(true);
    }

    // setting the column search bar width
    $('#memoryFilterCols th').each( function (idx) {
      var title = $(this).text();
      if (this.id !== 'colBtn') {
        $(this).html( '<input type="text" style="width: 95%" placeholder="'+title+'" />' );
      }
    });

    // Apply the search
    $('#memoryFilterCols th').each(function (idx){
      // The plus 2 is needed because the first two columns are the 
      // notes field (the child row) and scrapped field.
      var col = memory_table.column(idx+2);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });

    // Add event listener for opening and closing details
    memory_table.on('click', '.btn-notes', function () {
      var tr = $(this).closest('tr');
      var row = memory_table.row(tr);
      
      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
      } else {
        // Open this row
        row.child(format(row.data().notes)).show();

        // Setup form listener to send POST Ajax on submit.
        var childRow = $(tr).next();
        childRow.find('form').submit(function(e) {
          e.preventDefault();
          var newNotes = $(this).find('#notes').val();
          var dataToSend = {
            serial_num: row.data().serial_num,
            notes: newNotes
          };
          $.post('/update/memory/notes', dataToSend, function(data, status, jqXHR) {
            if (status !== 'success') {
              alert('Error: Could not save notes.');
            } else {
              row.data().notes = newNotes;
              childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
            }
          });
        });
      }
    });
    memory_table.on('click', '.btn-edit', function() {
      var tr = $(this).closest('tr');
      var row = memory_table.row(tr);
      memory_data = {
        index: row.index(),
        serial_num: row.data().serial_num,
        manufacturer: row.data().manufacturer,
        physical_size: row.data().physical_size,
        ecc: row.data().ecc,
        ranks: row.data().ranks,
        memory_type: row.data().memory_type,
        capacity: row.data().capacity,
        speed: row.data().speed,
        notes: row.data().notes,
        scrapped: row.data().scrapped
      };
      $('#editMemoryModal').modal('show');
    });

    // Placing the table in a horizontally scrollable box.
    // NOTE: Don't try using the scrollX DataTables option.
    // It messes with the column widths between the table header and body.
    var tableId = 'memory_table';
    $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());

  });

  $.get('/data/flash', function(jsonData) {
    flash_table = $('#flash_table').DataTable({
    "data": jsonToSend.flash,
    "columns" : [
      {
        "className": 'notes-control',
        "orderable": false,
        "data": null,
        "defaultContent": '',
        "visible": false
      },
      {
        "className": 'scrap-control',
        "orderable": false,
        "defaultContent": '',
        "data": "scrapped",
        "visible": false
      },
      {"data" : "serial_num"},
      {"data" : "capacity"},
      {"data" : "manufacturer"},
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
        "orderable": false,
        "className": "btn-notes",
      },
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false,
      },
    ],
    "paging"      : true,
    "pagingType"  : "simple_numbers",
    "pageLength"  : 50,
    "fixedHeader" : {
         "header" : true,
         "footer" : false
    }
    });
    if (jsonData.is_admin === 1) {
      flash_table.column(-1).visible(true);
    }

    // setting the column search bar width
    $('#flashFilterCols th').each( function (idx) {
      var title = $(this).text();
      if (this.id !== 'colBtn') {
        $(this).html( '<input type="text" style="width: 95%" placeholder="'+title+'" />' );
      }
    });

    // Apply the search
    $('#flashFilterCols th').each(function (idx){
      // The plus 2 is needed because the first two columns are the 
      // notes field (the child row) and scrapped field.
      var col = flash_table.column(idx+2);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });

    // Add event listener for opening and closing details
    flash_table.on('click', '.btn-notes', function () {
      var tr = $(this).closest('tr');
      var row = flash_table.row(tr);
      
      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
      } else {
        // Open this row
        row.child(format(row.data().notes)).show();

        // Setup form listener to send POST Ajax on submit.
        var childRow = $(tr).next();
        childRow.find('form').submit(function(e) {
          e.preventDefault();
          var newNotes = $(this).find('#notes').val();
          var dataToSend = {
            serial_num: row.data().serial_num,
            notes: newNotes
          };
          $.post('/update/flash/notes', dataToSend, function(data, status, jqXHR) {
            if (status !== 'success') {
              alert('Error: Could not save notes.');
            } else {
              row.data().notes = newNotes;
              childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
            }
          });
        });
      }
    });
    flash_table.on('click', '.btn-edit', function() {
      var tr = $(this).closest('tr');
      var row = flash_table.row(tr);
      flash_data = {
        index: row.index(),
        serial_num: row.data().serial_num,
        capacity: row.data().capacity,
        manufacturer: row.data().manufacturer,
        notes: row.data().notes,
        scrapped: row.data().scrapped
      };
      $('#editFlashModal').modal('show');
    });

    // Placing the table in a horizontally scrollable box.
    // NOTE: Don't try using the scrollX DataTables option.
    // It messes with the column widths between the table header and body.
    var tableId = 'flash_table';
    $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());
  });

  $.get('/data/board', function(jsonData) {
    board_table = $('#board_table').DataTable({
    "data": jsonToSend.board,
    "columns" : [
      {
        "className": 'notes-control',
        "orderable": false,
        "data": null,
        "defaultContent": '',
        "visible": false
      },
      {
        "className": 'scrap-control',
        "orderable": false,
        "defaultContent": '',
        "data": "scrapped",
        "visible": false
      },
      {"data" : "serial_num"},
      {"data" : "fpga"},
      {"data" : "bios"},
      {"data" : "mac"},
      {"data" : "fab"},
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-file-o"></i></button>',
        "orderable": false,
        "className": "btn-notes",
      },
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false,
      },
    ],
    "paging"      : true,
    "pagingType"  : "simple_numbers",
    "pageLength"  : 50,
    "fixedHeader" : {
         "header" : true,
         "footer" : false
    }
    });
    if (jsonData.is_admin === 1) {
      board_table.column(-1).visible(true);
    }

    // setting the column search bar width
    $('#boardFilterCols th').each( function (idx) {
      var title = $(this).text();
      if (this.id !== 'colBtn') {
        $(this).html( '<input type="text" style="width: 95%" placeholder="'+title+'" />' );
      }
    });

    // Apply the search
    $('#boardFilterCols th').each(function (idx){
      // The plus 2 is needed because the first two columns are the 
      // notes field (the child row) and scrapped field.
      var col = board_table.column(idx+2);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });

    // Add event listener for opening and closing details
    board_table.on('click', '.btn-notes', function () {
      var tr = $(this).closest('tr');
      var row = board_table.row(tr);
      
      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
      } else {
        // Open this row
        row.child(format(row.data().notes)).show();

        // Setup form listener to send POST Ajax on submit.
        var childRow = $(tr).next();
        childRow.find('form').submit(function(e) {
          e.preventDefault();
          var newNotes = $(this).find('#notes').val();
          var dataToSend = {
            serial_num: row.data().serial_num,
            notes: newNotes
          };
          $.post('/update/board/notes', dataToSend, function(data, status, jqXHR) {
            if (status !== 'success') {
              alert('Error: Could not save notes.');
            } else {
              row.data().notes = newNotes;
              childRow.find('#save-status').text('Time saved: ' + moment().format('hh:mm:ss a'));
            }
          });
        });
      }
    });
    board_table.on('click', '.btn-edit', function() {
      var tr = $(this).closest('tr');
      var row = board_table.row(tr);
      board_data = {
        index: row.index(),
        serial_num: row.data().serial_num,
        fpga: row.data().fpga,
        bios: row.data().bios,
        mac: row.data().mac,
        fab: row.data().fab,
        notes: row.data().notes,
        scrapped: row.data().scrapped
      };
      $('#editBoardModal').modal('show');
    });

    // Placing the table in a horizontally scrollable box.
    // NOTE: Don't try using the scrollX DataTables option.
    // It messes with the column widths between the table header and body.
    var tableId = 'board_table';
    $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());
  });

  /* Modals */
  $('#editCPUModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_num').val(cpu_data.serial_num);
    modal.find('#spec').val(cpu_data.spec);
    modal.find('#mm').val(cpu_data.mm);
    modal.find('#frequency').val(cpu_data.frequency);
    modal.find('#stepping').val(cpu_data.stepping);
    modal.find('#llc').val(cpu_data.llc);
    modal.find('#cores').val(cpu_data.cores);
    modal.find('#codename').val(cpu_data.codename);
    modal.find('#cpu_class').val(cpu_data.cpu_class);
    modal.find('#external_name').val(cpu_data.external_name);
    modal.find('#architecture').val(cpu_data.architecture);
    modal.find('#notes').val(cpu_data.notes);
    if(modal.find('#scrap').val(cpu_data.scrapped) == 1) {
      modal.find('#scrap').prop('checked', true);
    } else {
      modal.find('#scrap').prop('checked', false);
    };
  });
  $('#editCPUSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    cpu_data.spec = form.find('#spec').val();
    console.log(cpu_data.spec);
    cpu_data.mm = form.find('#mm').val();
    cpu_data.frequency = form.find('#frequency').val();
    cpu_data.stepping = form.find('#stepping').val();
    cpu_data.llc = form.find('#llc').val();
    cpu_data.cores = form.find('#cores').val();
    cpu_data.codename = form.find('#codename').val();
    cpu_data.cpu_class = form.find('#cpu_class').val();
    cpu_data.external_name = form.find('#external_name').val();
    cpu_data.architecture = form.find('#architecture').val();
    cpu_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap').checked) {
      cpu_data.scrapped = 1;
    } else {
      cpu_data.scrapped = 0;
    };

    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#CPU').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#cpu_' + key + '_help';
      $(k).html('');
    });

    $.post('/update/cpu', cpu_data, function(data, status, jqXHR) {
      if(cpu_data.scrapped == 1) {
        //Remove scrapped item and update banner to reflect that
        cpu_table.row(cpu_data.index).remove();
        $.get('/data/stats', function(data) {
          $('#infoBanner').empty();
          $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
          $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
                                  data.num_active + ' active + ' +
                                  data.num_scrapped + ' scrapped = ' +
                                  data.num_total + '</span>');
        });
        cpu_table.draw();
      } else {
        cpu_table.row(cpu_data.index).data(cpu_data).draw();
      }
      $('#editCPUModal').modal('hide');
    })
    .fail(function(data) {
      // get the list of errors
      var errors = data.responseJSON;

      // display the messages in the help divs
      $.each(errors, function(key, messages) {
        var k = '#cpu_' + key + '_help';

        var repDOM = [];
        $.each(messages, function(idx, m) {
          repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
        });

        $(k).append(repDOM);
      });
    });
  });

  $('#editSSDModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_num').val(ssd_data.serial_num);
    modal.find('#capacity').val(ssd_data.capacity);
    modal.find('#manufacturer').val(ssd_data.manufacturer);
    modal.find('#model').val(ssd_data.model);
    modal.find('#notes').val(ssd_data.notes);
    if(modal.find('#scrap').val(ssd_data.scrapped) == 1) {
      modal.find('#scrap').prop('checked', true);
    } else {
      modal.find('#scrap').prop('checked', false);
    };
  });
  $('#editSSDSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    ssd_data.capacity = form.find('#capacity').val();
    ssd_data.manufacturer = form.find('#manufacturer').val();
    ssd_data.model = form.find('#model').val();
    ssd_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap').checked) {
      ssd_data.scrapped = 1;
    } else {
      ssd_data.scrapped = 0;
    };

    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#SSD').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#ssd_' + key + '_help';
      $(k).html('');
    });

    $.post('/update/ssd', ssd_data, function(data, status, jqXHR) {
      if(ssd_data.scrapped == 1) {
        //Remove scrapped item and update banner to reflect that
        ssd_table.row(ssd_data.index).remove();
        $.get('/data/stats', function(data) {
          $('#infoBanner').empty();
          $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
          $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
                                  data.num_active + ' active + ' +
                                  data.num_scrapped + ' scrapped = ' +
                                  data.num_total + '</span>');
        });
        ssd_table.draw();
      } else {
        ssd_table.row(ssd_data.index).data(ssd_data).draw();
      }
      $('#editSSDModal').modal('hide');
    })
    .fail(function(data) {
      // get the list of errors
      var errors = data.responseJSON;

      // display the messages in the help divs
      $.each(errors, function(key, messages) {
        var k = '#ssd_' + key + '_help';

        var repDOM = [];
        $.each(messages, function(idx, m) {
          repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
        });

        $(k).append(repDOM);
      });
    });
  });

  $('#editMemoryModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_num').val(memory_data.serial_num);
    modal.find('#manufacturer').val(memory_data.manufacturer);
    modal.find('#physical_size').val(memory_data.physical_size);
    modal.find('#ecc').val(memory_data.ecc);
    modal.find('#ranks').val(memory_data.ranks);
    modal.find('#memory_type').val(memory_data.memory_type);
    modal.find('#capacity').val(memory_data.capacity);
    modal.find('#speed').val(memory_data.speed);
    modal.find('#notes').val(memory_data.notes);
    if(modal.find('#scrap').val(memory_data.scrapped) == 1) {
      modal.find('#scrap').prop('checked', true);
    } else {
      modal.find('#scrap').prop('checked', false);
    };
  });
  $('#editMemorySave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    memory_data.manufacturer = form.find('#manufacturer').val();
    memory_data.physical_size = form.find('#physical_size').val();
    memory_data.ecc = form.find('#ecc').val();
    memory_data.ranks = form.find('#ranks').val();
    memory_data.memory_type = form.find('#memory_type').val();
    memory_data.capacity = form.find('#capacity').val();
    memory_data.speed = form.find('#speed').val();
    memory_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap').checked) {
      memory_data.scrapped = 1;
    } else {
      memory_data.scrapped = 0;
    };

    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#Memory').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#memory_' + key + '_help';
      $(k).html('');
    });

    $.post('/update/memory', memory_data, function(data, status, jqXHR) {
      if(memory_data.scrapped == 1) {
        //Remove scrapped item and update banner to reflect that
        memory_table.row(memory_data.index).remove();
        $.get('/data/stats', function(data) {
          $('#infoBanner').empty();
          $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
          $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
                                  data.num_active + ' active + ' +
                                  data.num_scrapped + ' scrapped = ' +
                                  data.num_total + '</span>');
        });
        memory_table.draw();
      } else {
        memory_table.row(memory_data.index).data(memory_data).draw();
      }
      $('#editMemoryModal').modal('hide');
    })
    .fail(function(data) {
      // get the list of errors
      var errors = data.responseJSON;

      // display the messages in the help divs
      $.each(errors, function(key, messages) {
        var k = '#memory_' + key + '_help';

        var repDOM = [];
        $.each(messages, function(idx, m) {
          repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
        });

        $(k).append(repDOM);
      });
    });
  });

  $('#editFlashModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_num').val(flash_data.serial_num);
    modal.find('#capacity').val(flash_data.capacity);
    modal.find('#manufacturer').val(flash_data.manufacturer);
    modal.find('#notes').val(flash_data.notes);
    if(modal.find('#scrap').val(flash_data.scrapped) == 1) {
      modal.find('#scrap').prop('checked', true);
    } else {
      modal.find('#scrap').prop('checked', false);
    };
  });
  $('#editFlashSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    flash_data.capacity = form.find('#capacity').val();
    flash_data.manufacturer = form.find('#manufacturer').val();
    flash_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap').checked) {
      flash_data.scrapped = 1;
    } else {
      flash_data.scrapped = 0;
    };

    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#Flash').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#flash_' + key + '_help';
      $(k).html('');
    });

    $.post('/update/flash', flash_data, function(data, status, jqXHR) {
      if(flash_data.scrapped == 1) {
        //Remove scrapped item and update banner to reflect that
        flash_table.row(flash_data.index).remove();
        $.get('/data/stats', function(data) {
          $('#infoBanner').empty();
          $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
          $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
                                  data.num_active + ' active + ' +
                                  data.num_scrapped + ' scrapped = ' +
                                  data.num_total + '</span>');
        });
        flash_table.draw();
      } else {
        flash_table.row(flash_data.index).data(flash_data).draw();
      }
      $('#editFlashModal').modal('hide');
    })
    .fail(function(data) {
      // get the list of errors
      var errors = data.responseJSON;

      // display the messages in the help divs
      $.each(errors, function(key, messages) {
        var k = '#flash_' + key + '_help';

        var repDOM = [];
        $.each(messages, function(idx, m) {
          repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
        });

        $(k).append(repDOM);
      });
    });
  });

  $('#editBoardModal').on('show.bs.modal', function (event) {
    console.log('showing modal');
    var modal = $(this);
    modal.find('#serial_num').val(board_data.serial_num);
    modal.find('#fpga').val(board_data.fpga);
    modal.find('#bios').val(board_data.bios);
    modal.find('#mac').val(board_data.mac);
    modal.find('#fab').val(board_data.fab);
    modal.find('#notes').val(board_data.notes);
    if(modal.find('#scrap').val(board_data.scrapped) == 1) {
      modal.find('#scrap').prop('checked', true);
    } else {
      modal.find('#scrap').prop('checked', false);
    };
  });
  $('#editBoardSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    board_data.fpga = form.find('#fpga').val();
    board_data.bios = form.find('#bios').val();
    board_data.mac = form.find('#mac').val();
    board_data.fab = form.find('#fab').val();
    board_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap').checked) {
      board_data.scrapped = 1;
    } else {
      board_data.scrapped = 0;
    };

    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#Board').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#board_' + key + '_help';
      $(k).html('');
    });

    $.post('/update/board', board_data, function(data, status, jqXHR) {
      if(board_data.scrapped == 1) {
        //Remove scrapped item and update banner to reflect that
        board_table.row(board_data.index).remove();
        $.get('/data/stats', function(data) {
          $('#infoBanner').empty();
          $('#infoBanner').prepend('<div>Welcome ' + data.first_name + '</div>');
          $('#infoBanner').append('<span><strong>Total Items </strong>: ' +
                                  data.num_active + ' active + ' +
                                  data.num_scrapped + ' scrapped = ' +
                                  data.num_total + '</span>');
        });
        board_table.draw();
      } else {
        board_table.row(board_data.index).data(board_data).draw();
      }
      $('#editBoardModal').modal('hide');
    })
    .fail(function(data) {
      // get the list of errors
      var errors = data.responseJSON;

      // display the messages in the help divs
      $.each(errors, function(key, messages) {
        var k = '#board_' + key + '_help';

        var repDOM = [];
        $.each(messages, function(idx, m) {
          repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
        });

        $(k).append(repDOM);
      });
    });
  });
});