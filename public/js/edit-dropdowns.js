$(document).ready(function() {
  var uniqueAttrs = [];
  var currentAttr = '';
  var currentItem = '';
  var dd = {
    cpu: [],
    ssd: [],
    memory: [],
    flash_drive: [],
    board: []
  };

  function getUniqueAttrs(attributes) {
    var attrsToFilter = [];

    for (var i = 0; i < attributes.length; i++) {
      attrsToFilter.push(attributes[i].attr_key);
    }

    return attrsToFilter.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  }

  function loadTable(itemType, attribute) {
    var attributes = dd[itemType];

    // clearing out the current table
    $('#attr_table tbody tr').remove();
    // adding new table items
    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].attr_key === attribute) {
        $('#attr_table tbody').append(
                      '<tr><td contenteditable>' + attributes[i].attr_value +
                      '</td><td><button class="del btn btn-link">delete</button></td></tr>');
        // Setting up the delete button for each row.
        $('#attr_table tbody tr').on('click', '.del', function() {
            var attrToRemove = $(this).parent().parent();
            attrToRemove.remove();
        });
      }
    }
  }

  function loadAttr(attributes) {
    if ($('#dd_attr').attr('disabled') === 'disabled') {
      $('#dd_attr').removeAttr('disabled');
    }
    // populating the attributes dropdown
    $('#dd_attr').find('option').remove();
    uniqueAttrs = getUniqueAttrs(attributes);
    currentAttr = uniqueAttrs[0];
    if (uniqueAttrs.length === 0) {
      $('#addAttribute').attr('disabled', 'disabled');
      $('#dd_attr').append('<option>(None)</option>');
    } else {
      $('#addAttribute').removeAttr('disabled');  
      $.each(uniqueAttrs, function(idx, elem) {
        $('#dd_attr').append('<option value="'+elem+'">'+attrNames[elem]+'</option>');
      });
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

  // Getting all the current attributes.
  $.get('/dd/keys', function(data) {
    $.each(data, function(idx, elem) {
      dd[elem.item_type].push({attr_key: elem.attr_type, attr_value: elem.attr_value});
    });
  });

  $('#dd_item_type').change(function(e) {
    // remove the blank option from the list of items
    var first = $(this).find('option').first();
    if (first.text() === '') {
      first.remove();
    }

    currentItem = $('#dd_item_type').val();
    $('#submitAttributes').removeAttr('disabled');
    loadAttr(dd[currentItem]);
    loadTable(currentItem, currentAttr);
  });

  $('#dd_attr').change(function(e) {
    currentAttr = $('#dd_attr').val();
    loadTable(currentItem, currentAttr);
  });
});