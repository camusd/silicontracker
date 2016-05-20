function format(notes) {
  return '<form id="form-notes" action="/update/notes" method="post">\
            <div id="fg" class="form-group">\
              <textarea rows="4" cols="80" id="notes" placeholder="Add Notes Here">'+notes+'</textarea>\
            </div>\
            <button class="btn btn-primary form-submit" id="save-notes">Save</button>\
          </form>\
          <div class="col-xs-12" id="save-status"></div>';
}

$(document).ready(function() {
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

  $.get('/data/reserve/cpu', function(jsonData) {
    cpu_table = $('#cpu_table').DataTable({
    "data": jsonData.items,
    "columns" : [
      {
        "className": 'reserve-status',
        "orderable": false,
        "defaultContent": '',
        "data": "reserve_status",
        "visible": false
      },
      {
        "className": 'reservation-date',
        "orderable": false,
        "defaultContent": '',
        "data": "reservation_date",
        "visible": false
      },      
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
      {"data" : "user_name"},
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
      {
        "data": "button_type",
        "orderable": false,
        "className": "btn-reserve",
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
      cpu_table.column(-2).visible(true);
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
          $.post('/update/notes', dataToSend, function(data, status, jqXHR) {
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
        scrapped: row.data().scrapped,
        user_name: row.data().user_name
      };
      $('#editCPUModal').modal('show');
    });
    cpu_table.on('click', '.btn-reserve', function() {
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
        scrapped: row.data().scrapped,
        reservation_date: row.data().reservation_date
      };
      if(row.data().reserve_status === 0) {
        $('#reserveModal').modal('show');
      } else {
        $('#reserved-message').html('You reserved this item on ' + moment(cpu_data.reservation_date).format('MMMM Do YYYY, h:mm a'));
        $('#reservedModal').modal('show');
      }
    });

    // Placing the table in a horizontally scrollable box.
    // NOTE: Don't try using the scrollX DataTables option.
    // It messes with the column widths between the table header and body.
    var tableId = 'cpu_table';
    $('<div style="width: 100%; overflow: auto"></div>').append($('#' + tableId)).insertAfter($('#' + tableId + '_wrapper div').first());
  });


  $.get('/data/ssd', function(jsonData) {
    ssd_table = $('#ssd_table').DataTable({
    "data": jsonData.items,
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
      {"data" : "user_name"},
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
          $.post('/update/notes', dataToSend, function(data, status, jqXHR) {
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
        scrapped: row.data().scrapped,
        user_name: row.data().user_name
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
    "data": jsonData.items,
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
      {"data" : "user_name"},
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
          $.post('/update/notes', dataToSend, function(data, status, jqXHR) {
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
        scrapped: row.data().scrapped,
        user_name: row.data().user_name
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
    "data": jsonData.items,
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
      {"data" : "user_name"},
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
          $.post('/update/notes', dataToSend, function(data, status, jqXHR) {
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
        scrapped: row.data().scrapped,
        user_name: row.data().user_name
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
    "data": jsonData.items,
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
      {"data" : "user_name"},
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
          $.post('/update/notes', dataToSend, function(data, status, jqXHR) {
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
        scrapped: row.data().scrapped,
        user_name: row.data().user_name
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
    if(cpu_data.scrapped == 1) {
      modal.find('#scrap_cpu').prop('checked', true);
    } else {
      modal.find('#scrap_cpu').prop('checked', false);
    };
  });
  $('#editCPUSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    cpu_data.spec = form.find('#spec').val();
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
    if(document.getElementById('scrap_cpu').checked) {
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
  $('#reserveSave').on('click', function() {
    var serial_num = cpu_data.serial_num;
    jsonToSend = {serial_num: serial_num};
    $.post('/reserve', jsonToSend)
      .done(function() {
        location.reload();
    });
    $('#reserveModal').modal('hide');
  });

  $('#editSSDModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_num').val(ssd_data.serial_num);
    modal.find('#capacity').val(ssd_data.capacity);
    modal.find('#manufacturer').val(ssd_data.manufacturer);
    modal.find('#model').val(ssd_data.model);
    modal.find('#notes').val(ssd_data.notes);
    if(ssd_data.scrapped == 1) {
      modal.find('#scrap_ssd').prop('checked', true);
    } else {
      modal.find('#scrap_ssd').prop('checked', false);
    };
  });
  $('#editSSDSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    ssd_data.capacity = form.find('#capacity').val();
    ssd_data.manufacturer = form.find('#manufacturer').val();
    ssd_data.model = form.find('#model').val();
    ssd_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap_ssd').checked) {
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
    if(memory_data.scrapped == 1) {
      modal.find('#scrap_memory').prop('checked', true);
    } else {
      modal.find('#scrap_memory').prop('checked', false);
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
    if(document.getElementById('scrap_memory').checked) {
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
    if(flash_data.scrapped == 1) {
      modal.find('#scrap_flash').prop('checked', true);
    } else {
      modal.find('#scrap_flash').prop('checked', false);
    };
  });
  $('#editFlashSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    flash_data.capacity = form.find('#capacity').val();
    flash_data.manufacturer = form.find('#manufacturer').val();
    flash_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap_flash').checked) {
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
    var modal = $(this);
    modal.find('#serial_num').val(board_data.serial_num);
    modal.find('#fpga').val(board_data.fpga);
    modal.find('#bios').val(board_data.bios);
    modal.find('#mac').val(board_data.mac);
    modal.find('#fab').val(board_data.fab);
    modal.find('#notes').val(board_data.notes);
    if(board_data.scrapped == 1) {
      modal.find('#scrap_board').prop('checked', true);
    } else {
      modal.find('#scrap_board').prop('checked', false);
    };
  });
  $('#editBoardSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    board_data.fpga = form.find('#fpga').val();
    board_data.bios = form.find('#bios').val();
    board_data.mac = form.find('#mac').val();
    board_data.fab = form.find('#fab').val();
    board_data.notes = form.find('#notes').val();
    if(document.getElementById('scrap_board').checked) {
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