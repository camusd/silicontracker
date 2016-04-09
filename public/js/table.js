function format(notes) {
  return '<form id="form-notes" action="/update/cpu/notes" method="post">\
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
  // Datatable
  $('#filterCols th').each( function () {
    var title = $(this).text();
    var width = $(this).width();
    if (this.id !== 'colBtn') {
      $(this).html( '<input type="text" style="width: '+(width)+'px;" placeholder="'+title+'" />' );
      // The 14 represents the additional amount of space for the column sorting
      // Not sure if the 14 added to the width is neccessary, deleting for now to make the table smaller.
    }
  });

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
        "className": "btn-notes"
      },
      {
        "defaultContent": '<button class="btn btn-link"><i class="fa fa-lg fa-pencil-square-o"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false
      },
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
      cpu_table.column(-1).visible(true);
    }
    // Apply the search
    $('#filterCols th').each(function (idx){
      // The plus 1 is needed because the first column is the 
      // notes field (the child row).
      var col = cpu_table.column(idx+1);
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
  });

  $.get('/data/ssd', function(jsonData) {
    var ssd_table = $('#ssd_table').DataTable({
    "data": jsonData.items,
    "columns" : [
      {"data" : "serial_num"},
      {"data" : "capacity"},
      {"data" : "manufacturer"},
      {"data" : "model"},
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
      ssd_table.column(-1).visible(true);
    }
    // Apply the search
    $('#filterCols th').each(function (idx){
      var col = ssd_table.column(idx);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });
  });

  $.get('/data/memory', function(jsonData) {
    var memory_table = $('#memory_table').DataTable({
    "data": jsonData.items,
    "columns" : [
      {"data" : "serial_num"},
      {"data" : "manufacturer"},
      {"data" : "physical_size"},
      {"data" : "ecc"},
      {"data" : "ranks"},
      {"data" : "memory_type"},
      {"data" : "capacity"},
      {"data" : "speed"},
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
      memory_table.column(-1).visible(true);
    }
    // Apply the search
    $('#filterCols th').each(function (idx){
      var col = memory_table.column(idx);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });
  });

  $.get('/data/flash', function(jsonData) {
    var flash_table = $('#flash_table').DataTable({
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
    $('#filterCols th').each(function (idx){
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
});