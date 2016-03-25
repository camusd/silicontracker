$(document).ready(function() {
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
  	var cpu_table = $('#cpu_table').DataTable({
		"data": jsonData.items,
		"columns" : [
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
			{"data" : "notes"},
			{"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
		],
		"scrollX" 	  : true,
	  "paging" 		  : true,
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
	  	var col = cpu_table.column(idx);
	  	$('input', this).on( 'keyup change', function () {
	  		col.search( this.value ).draw();
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
			{"data" : "notes"},
			{"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
		],
		"scrollX" 	  : true,
	  "paging" 		  : true,
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
			{"data" : "notes"},
			{"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
		],
		"scrollX" 	  : true,
	  "paging" 		  : true,
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
			{"data" : "notes"},
			{"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
		],
		"scrollX" 	  : true,
	  "paging" 		  : true,
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