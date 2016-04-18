var attrNames = {
  // CPU
  serial_input:   'Serial Number',
  spec_input:     'Spec',
  mm_input:       'MM',
  freq_input:     'Frequency',
  step_input:     'Stepping',
  llc_input:      'LLC',
  cores_input:    'Cores',
  codename_input: 'Codename',
  class_input:    'Class',
  external_input: 'External Name',
  arch_input:     'Architecture',
  notes_input:    'Notes',

  // SSD
  capacity_input:     'Capacity',
  manufacturer_input: 'Manufacturer',
  model_input:        'Model',

  // Memory
  physical_size_input:  'Physical Size',
  memory_type_input:    'Type',
  speed_input:      'Speed',
  ecc_input:        'ECC',
  ranks_input:      'Ranks'

  // Flash Drives
};

$(document).ready(function() {
  // Codename Dropdown    
  $.get('/dd/values/codename', function(data) {
    $.each(data, function(idx, elem) {
      $('#dd_codename').append('<option value="'+elem.attr_value+'">');
    });
  });

  // Submitting the form
  $('#CPU').on('submit', function(event) {
    event.preventDefault();
    
    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#CPU').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#' + key + '_help';
      $(k).html('');
    });

    // POSTing the data to the server
    $.ajax({
      type: 'POST',
      url: window.location.pathname,
      data: obj,
      success: function(scrubbedData) { 
        // clear all the fields
        $.each(Object.keys(obj), function(idx, k) {
          key = '#' + k;
          $(key).val('');
        });

        // display the success message
        $('#submit-results').html('');

        scrubbedData.serial_input = scrubbedData.serial_input.join('\n');
        $.each(scrubbedData, function(key, val) {
          $('#submit-results').append('<div class="col-sm-3 col-xs-6"><strong>'+attrNames[key]+':</strong></div><div class="col-sm-3 col-xs-6">'+val+'</div>')
        });
        $('#SuccessModal').modal();
        obj = {};
      },
      error: function(data) {
        // get the list of errors
        var errors = data.responseJSON;

        // display the messages in the help divs
        $.each(errors, function(key, messages) {
          var k = '#' + key + '_help';

          var repDOM = [];
          $.each(messages, function(idx, m) {
            repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
          });

          $(k).append(repDOM);
        });
      }
    });
  });

  $('#SSD').on('submit', function(event) {
    event.preventDefault();
    
    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#SSD').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#' + key + '_help';
      $(k).html('');
    });

    // POSTing the data to the server
    $.ajax({
      type: 'POST',
      url: window.location.pathname,
      data: obj,
      success: function(scrubbedData) { 
        // clear all the fields
        $.each(Object.keys(obj), function(idx, k) {
          key = '#' + k;
          $(key).val('');
        });

        // display the success message
        $('#submit-results').html('');

        scrubbedData.serial_input = scrubbedData.serial_input.join('\n');
        $.each(scrubbedData, function(key, val) {
          $('#submit-results').append('<div class="col-sm-3 col-xs-6"><strong>'+attrNames[key]+':</strong></div><div class="col-sm-3 col-xs-6">'+val+'</div>')
        });
        $('#SuccessModal').modal();
        obj = {};
      },
      error: function(data) {
        // get the list of errors
        var errors = data.responseJSON;

        // display the messages in the help divs
        $.each(errors, function(key, messages) {
          var k = '#' + key + '_help';

          var repDOM = [];
          $.each(messages, function(idx, m) {
            repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
          });

          $(k).append(repDOM);
        });
      }
    });
  });
  $('#Memory').on('submit', function(event) {
    event.preventDefault();
    
    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#Memory').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#' + key + '_help';
      $(k).html('');
    });

    // POSTing the data to the server
    $.ajax({
      type: 'POST',
      url: window.location.pathname,
      data: obj,
      success: function(scrubbedData) { 
        // clear all the fields
        $.each(Object.keys(obj), function(idx, k) {
          key = '#' + k;
          $(key).val('');
        });

        // display the success message
        $('#submit-results').html('');

        scrubbedData.serial_input = scrubbedData.serial_input.join('\n');
        $.each(scrubbedData, function(key, val) {
          $('#submit-results').append('<div class="col-sm-3 col-xs-6"><strong>'+attrNames[key]+':</strong></div><div class="col-sm-3 col-xs-6">'+val+'</div>')
        });
        $('#SuccessModal').modal();
        obj = {};
      },
      error: function(data) {
        // get the list of errors
        var errors = data.responseJSON;

        // display the messages in the help divs
        $.each(errors, function(key, messages) {
          var k = '#' + key + '_help';

          var repDOM = [];
          $.each(messages, function(idx, m) {
            repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
          });

          $(k).append(repDOM);
        });
      }
    });
  });
  $('#Flash').on('submit', function(event) {
    event.preventDefault();
    
    // Getting the keys and values of all the fields in the form
    var obj = {};
    $.each($('#Flash').serializeArray(), function(_, kv) {
      obj[kv.name] = kv.value;
    });

    // Clearing all the old error messages
    $.each(obj, function(key, o) {
      var k = '#' + key + '_help';
      $(k).html('');
    });

    // POSTing the data to the server
    $.ajax({
      type: 'POST',
      url: window.location.pathname,
      data: obj,
      success: function(scrubbedData) { 
        // clear all the fields
        $.each(Object.keys(obj), function(idx, k) {
          key = '#' + k;
          $(key).val('');
        });

        // display the success message
        $('#submit-results').html('');

        scrubbedData.serial_input = scrubbedData.serial_input.join('\n');
        $.each(scrubbedData, function(key, val) {
          $('#submit-results').append('<div class="col-sm-3 col-xs-6"><strong>'+attrNames[key]+':</strong></div><div class="col-sm-3 col-xs-6">'+val+'</div>')
        });
        $('#SuccessModal').modal();
        obj = {};
      },
      error: function(data) {
        // get the list of errors
        var errors = data.responseJSON;

        // display the messages in the help divs
        $.each(errors, function(key, messages) {
          var k = '#' + key + '_help';

          var repDOM = [];
          $.each(messages, function(idx, m) {
            repDOM.push('<span class="help-block"><p class="text-danger">'+m+'</p></span>')
          });

          $(k).append(repDOM);
        });
      }
    });
  });
});