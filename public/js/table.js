function format(notes) {
  return '<form id="form-notes" action="/update/cpu/notes" method="post">\
            <div id="fg" class="form-group">\
              <textarea rows="4" cols="80" id="notes" placeholder="Add Notes Here">'+notes+'</textarea>\
            </div>\
            <button class="btn btn-primary form-submit" id="save-notes">Save</button>\
          </form>\
          <div class="col-xs-12" id="save-status"></div>';
}

var cpuColNames = ['', '', 'Serial Number','Spec','MM','Freq','Step','LLC','Cores','Codename','CPU Class','External Name', 'Architecture'];

$(document).ready(function() {
  var cpu_table;
  var cpu_data;
  var ssd_table;
  var ssd_data;
  var memory_table;
  var memory_data;
  var flash_table;
  var flash_data;

  $.get('/data/cpu', function(jsonData) {
    cpu_table = $('#cpu_table').DataTable({
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
    "data": jsonData.items,
    "columns" : [
      {"data" : "serial_num"},
      {"data" : "capacity"},
      {"data" : "manufacturer"},
      {"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
    ],
    "scrollX"     : true,
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
    // Apply the search
    $('#flashFilterCols th').each(function (idx){
      var col = flash_table.column(idx);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });
  });

  /* Modals */
  $('#editCPUModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_input').val(cpu_data.serial_num);
    modal.find('#spec_input').val(cpu_data.spec);
    modal.find('#mm_input').val(cpu_data.mm);
    modal.find('#freq_input').val(cpu_data.frequency);
    modal.find('#step_input').val(cpu_data.stepping);
    modal.find('#llc_input').val(cpu_data.llc);
    modal.find('#cores_input').val(cpu_data.cores);
    modal.find('#codename_input').val(cpu_data.codename);
    modal.find('#class_input').val(cpu_data.cpu_class);
    modal.find('#external_input').val(cpu_data.external_name);
    modal.find('#arch_input').val(cpu_data.architecture);
    modal.find('#notes_input').val(cpu_data.notes);
    if(modal.find('#scrap_input').val(cpu_data.scrapped) == 1) {
      modal.find('#scrap_input').prop('checked', true);
    } else {
      modal.find('#scrap_input').prop('checked', false);
    };
  });
  $('#editCPUSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    cpu_data.spec = form.find('#spec_input').val();
    cpu_data.mm = form.find('#mm_input').val();
    cpu_data.frequency = form.find('#freq_input').val();
    cpu_data.stepping = form.find('#step_input').val();
    cpu_data.llc = form.find('#llc_input').val();
    cpu_data.cores = form.find('#cores_input').val();
    cpu_data.codename = form.find('#codename_input').val();
    cpu_data.cpu_class = form.find('#class_input').val();
    cpu_data.external_name = form.find('#external_input').val();
    cpu_data.architecture = form.find('#arch_input').val();
    cpu_data.notes = form.find('#notes_input').val();
    if(document.getElementById('scrap_input').checked) {
      cpu_data.scrapped = 1;
    } else {
      cpu_data.scrapped = 0;
    };
    $.post('/update/cpu', cpu_data, function(data, status, jqXHR) {
      if (status !== 'success') {
        alert('CPU item did not update!');
      } else {
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
        };
        $('#editCPUModal').modal('hide');
      }
    });
  });

  $('#editSSDModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_input').val(ssd_data.serial_num);
    modal.find('#capacity_input').val(ssd_data.capacity);
    modal.find('#manufacturer_input').val(ssd_data.manufacturer);
    modal.find('#model_input').val(ssd_data.model);
    modal.find('#notes_input').val(ssd_data.notes);
    if(modal.find('#scrap_input').val(ssd_data.scrapped) == 1) {
      modal.find('#scrap_input').prop('checked', true);
    } else {
      modal.find('#scrap_input').prop('checked', false);
    };
  });
  $('#editSSDSave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    ssd_data.capacity = form.find('#capacity_input').val();
    ssd_data.manufacturer = form.find('#manufacturer_input').val();
    ssd_data.model = form.find('#model_input').val();
    ssd_data.notes = form.find('#notes_input').val();
    if(document.getElementById('scrap_input').checked) {
      ssd_data.scrapped = 1;
    } else {
      ssd_data.scrapped = 0;
    };
    $.post('/update/ssd', ssd_data, function(data, status, jqXHR) {
      if (status !== 'success') {
        alert('SSD item did not update!');
      } else {
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
        };
        $('#editSSDModal').modal('hide');
      }
    });
  });

  $('#editMemoryModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('#serial_input').val(memory_data.serial_num);
    modal.find('#manufacturer_input').val(memory_data.manufacturer);
    modal.find('#physical_size_input').val(memory_data.physical_size);
    modal.find('#ecc_input').val(memory_data.ecc);
    modal.find('#ranks_input').val(memory_data.ranks);
    modal.find('#memory_type_input').val(memory_data.memory_type);
    modal.find('#capacity_input').val(memory_data.capacity);
    modal.find('#speed_input').val(memory_data.speed);
    modal.find('#notes_input').val(memory_data.notes);
    if(modal.find('#scrap_input').val(memory_data.scrapped) == 1) {
      modal.find('#scrap_input').prop('checked', true);
    } else {
      modal.find('#scrap_input').prop('checked', false);
    };
  });
  $('#editMemorySave').on('click', function() {
    var form = $(this).closest('.modal-content').find('form');
    memory_data.manufacturer = form.find('#manufacturer_input').val();
    memory_data.physical_size = form.find('#physical_size_input').val();
    memory_data.ecc = form.find('#ecc_input').val();
    memory_data.ranks = form.find('#ranks_input').val();
    memory_data.memory_type = form.find('#memory_type_input').val();
    memory_data.capacity = form.find('#capacity_input').val();
    memory_data.speed = form.find('#speed_input').val();
    memory_data.notes = form.find('#notes_input').val();
    if(document.getElementById('scrap_input').checked) {
      memory_data.scrapped = 1;
    } else {
      memory_data.scrapped = 0;
    };
    $.post('/update/memory', memory_data, function(data, status, jqXHR) {
      if (status !== 'success') {
        alert('Memory item did not update!');
      } else {
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
        };
        $('#editMemoryModal').modal('hide');
      }
    });
  });
});