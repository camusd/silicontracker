$(document).ready(function() {
    // Datatable
    $('#filterCols th').each( function () {
        var title = $(this).text();
        var width = $(this).width();
        $(this).html( '<input type="text" style="width: '+(width+14)+'px;" placeholder="'+title+'" />' );
        // The 14 represents the additional amount of space for the column sorting
    } );

	var table = $('#cpu_table').DataTable({
		"ajax": {
			"url" :"/data",
			"dataSrc" : "",
		},
		"columns" : [
			{"data" : "spec"},
			{"data" : "mm"},
			{"data" : "frequency"},
			{"data" : "stepping"},
			{"data" : "llc"},
			{"data" : "cores"},
			{"data" : "codename"},
			{"data" : "cpu_class"},
			{"data" : "external_name"},
			{"data" : "architecture"}
		],
		"scrollX" 	: true,
	    paging 		: true,
		"pagingType": "simple_numbers",
		"pageLength": 10,
	    fixedHeader : {
	    	header: true,
	    	footer: false
	    }
	});

	// Apply the search
	$('#filterCols th').each(function (idx){
		var col = table.column(idx);
		$('input', this).on( 'keyup change', function () {
			col.search( this.value )
			   .draw();
		});
	});
});