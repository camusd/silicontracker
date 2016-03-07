$(document).ready(function() {
    // Datatable
    $('#filterCols th').each( function () {
        var title = $(this).text();
        var width = $(this).width();

        if (this.id !== 'colBtn') {
        	$(this).html( '<input type="text" style="width: '+(width+14)+'px;" placeholder="'+title+'" />' );
        	// The 14 represents the additional amount of space for the column sorting
        }
    } );

    $.get('/data/cpu', function(jsonData) {
    	var cpu_table = $('#cpu_table').DataTable({
			"data": jsonData.items,
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
				{"data" : "architecture"},
				{"defaultContent": "<button class=\"scrap_btn\">Scrap</button>", "visible": false}
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
		if (jsonData.is_admin === 1) {
			cpu_table.column(-1).visible(true);
		}

		// Apply the search
		$('#filterCols th').each(function (idx){
			var col = cpu_table.column(idx);
			$('input', this).on( 'keyup change', function () {
				col.search( this.value )
				   .draw();
			});
		});
	});
});