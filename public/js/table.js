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
      {"defaultContent": '<button class=\"btn btn-link\"><i class=\"fa fa-lg fa-file-o\"></i></button>',
        "orderable": false,
        "className": "btn-notes"},
      {"defaultContent": '<button class=\"btn btn-link\"><i class=\"fa fa-lg fa-pencil-square-o\"></i></button>',
        "orderable": false,
        "className": "btn-edit",
        "visible": false}
    ],
    "scrollX"     : true,
    "paging"      : true,
    "pagingType"  : "simple_numbers",
    "pageLength"  : 10,
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
    "pageLength"  : 10,
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
    "pageLength"  : 10,
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
    "pageLength"  : 10,
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

});