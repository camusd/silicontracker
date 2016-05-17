$(document).ready(function() {
  var currentAttr = '';
  var currentItem = '';
  var dd = {
    cpu: {
    	codename: [],
    	cpu_class: []
    },
    ssd: {},
    memory: {},
    flash_drive: {},
    board: {}
  };

  function loadTable() {
    // clearing out the current table
    $('#attr_table tbody tr').remove();

    // adding new table items. for each attribute, add a new editable row.
    var attributeVals = dd[currentItem][currentAttr];
    for (var i = 0; i < attributeVals.length; i++) {
    	$('#attr_table tbody').append(
        '<tr><td contenteditable>' + attributeVals[i] +
        '</td><td><button class="del btn btn-link">delete</button></td></tr>');
      // Setting up the delete button for each row.
      $('#attr_table tbody tr').on('click', '.del', function() {
          var attrToRemove = $(this).parent().parent();
          attrToRemove.remove();
      });
    }
  }

  function loadAttr() {
  	var attributes = dd[currentItem];
		currentAttr = Object.keys(attributes)[0];

  	// Removing the disable on the attribute dropdown.
    if ($('#dd_attr').attr('disabled') === 'disabled') {
      $('#dd_attr').removeAttr('disabled');
    }

		// removing old attributes    
    $('#dd_attr').find('option').remove();
    
    // populating the attributes dropdown
    var attrCount = 0;
    for (attr in attributes) {
    	$('#dd_attr').append('<option value="'+attr+'">'+attrNames[attr]+'</option>')
    	attrCount++;

    	// Enable buttons.
    	$('#addAttribute').removeAttr('disabled');
    	$('#submitAttributes').removeAttr('disabled');
    	$('#dd_attr').removeAttr('disabled');
		}

		// No dropdown attributes for this item. Disable buttons.
		if (attrCount === 0) {	
      $('#dd_attr').append('<option>(None)</option>');
      $('#dd_attr').attr('disabled', 'disabled');
      $('#addAttribute').attr('disabled', 'disabled');
      $('#submitAttributes').attr('disabled', 'disabled');
		}
  }

  // Submitting the edited attributes. When invoked, it will create an
  // object with the attribute type, and the values within the type.
  $('#submitAttributes').click(function() {
      var submitAttrs = {item_type: currentItem, attr_type: currentAttr, attr_vals: []}
      $('#attr_table tbody tr td:first-child').each(function(idx, elem) {
        submitAttrs.attr_vals.push($(elem).text());              
      });
      $.post('/settings/attributes', submitAttrs, function(data) {
          alert('new attributes saved');
      });
  });

  // Adding a new text field to the list of attributes.
  $('#addAttribute').click(function() {
      if (currentAttr !== '' || currentAttr !== '(None)') {
        $('#attr_table tbody').append(
              '<tr><td contenteditable>New Attribute</td>' +
              '<td><button class="del btn btn-link">delete</button></td></tr>');
      }
  });

  // Getting all the current attributes from the server.
  $.get('/dd/keys', function(data) {
    $.each(data, function(idx, elem) {
      dd[elem.item_type][elem.attr_type].push(elem.attr_value);
    });
  });

  // This executes when the Item type is changed.
  $('#dd_item_type').change(function(e) {
    // remove the blank option from the list of items
    var first = $(this).find('option').first();
    if (first.text() === '') {
      first.remove();
    }

    currentItem = $('#dd_item_type').val();
    loadAttr();
    loadTable();
  });


  // This executes when the attribute is changed.
  $('#dd_attr').change(function(e) {
    currentAttr = $('#dd_attr').val();
    loadTable();
  });
});