
$(document).ready(function() {
    // Datatable
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
	    			// "sScrollY": "400",
	    			"scrollX" : true,
			        paging:         true,
        			"pagingType": "simple_numbers",
        			"pageLength": 10,
			        orderCellsTop: true,
			        fixedHeader : {
			        	header: true,
			        	footer: false
			        }
					});
	$('#cpu_table').dataTable().columnFilter({
		sPlaceHolder : 'head:after',
		aoColumns: [ 
			{ type: "text"},
         	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"},
        	{ type: "text"}
       	] 
	});
});