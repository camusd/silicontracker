var form = '<form id="form-notes">\
              <div class="form-group">\
                <textarea rows="4" cols="80" id="notes" placeholder="Add Notes Here"></textarea>\
              </div>\
              <button class="btn btn-primary" id="save-notes">Save</button>\
            </form>';

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
    },
    "order": [[1, 'asc']]
    });
    if (jsonData.is_admin === 1) {
      cpu_table.column(-1).visible(true);
    }
    // Apply the search
    $('#filterCols th').each(function (idx){
      var col = cpu_table.column(idx);
      $('input', this).on( 'keyup change', function () {
        col.search( this.value ).draw();
      });
    });

    // Add event listener for opening and closing details
    cpu_table.on('click', '.btn-notes', function () {
      var tr = $(this).closest('tr');
      var row = cpu_table.row(tr);
      var serial = {serial: row.data().serial_num};
      $.ajax({
        type: 'GET',
        url: '/data/notes',
        data: serial,
        dataType: 'json',
        success: function(result) {
          if (row.child.isShown()) {
              // This row is already open - close it
              row.child.hide();
          } else {
            // Open this row
            row.child(form).show();
          }    
        }
      });
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