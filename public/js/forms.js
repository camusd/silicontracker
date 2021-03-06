var attrNames = {
  // CPU
  serial_num:   'Serial Number',
  spec:     'Spec',
  mm:       'MM',
  frequency:     'Frequency',
  stepping:     'Stepping',
  llc:      'LLC',
  cores:    'Cores',
  codename: 'Codename',
  cpu_class:    'Class',
  external_name: 'External Name',
  architecture:     'Architecture',
  notes:    'Notes',

  // SSD
  capacity:     'Capacity',
  manufacturer: 'Manufacturer',
  model:        'Model',

  // Memory
  physical_size:  'Physical Size',
  memory_type:    'Type',
  speed:      'Speed',
  ecc:        'ECC',
  ranks:      'Ranks',

  // Flash Drives

  // Boards
  fpga: 'FPGA',
  bios: 'BIOS',
  mac: 'MAC Address',
  fab: 'Fab'
};

$(document).ready(function() {
  var pathname = window.location.pathname;
  if (pathname === '/add/cpu') {
    // Codename Dropdown    
    $.get('/dd/values/codename', function(data) {
      $.each(data, function(idx, elem) {
        $('#dd_codename').append('<option value="'+elem.attr_value+'">');
      });
    });

    // CPU Class Dropdown    
    $.get('/dd/values/cpu_class', function(data) {
      $.each(data, function(idx, elem) {
        $('#dd_cpu_class').append('<option value="'+elem.attr_value+'">');
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

          scrubbedData.serial_num = scrubbedData.serial_num.join('\n');
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
  } else if (pathname === '/add/ssd') {
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

          scrubbedData.serial_num = scrubbedData.serial_num.join('\n');
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
  } else if (pathname === '/add/memory') {
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

          scrubbedData.serial_num = scrubbedData.serial_num.join('\n');
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
  } else if (pathname === '/add/flash') {
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

          scrubbedData.serial_num = scrubbedData.serial_num.join('\n');
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
  } else if (pathname === '/add/board') {
    $('#Board').on('submit', function(event) {
      event.preventDefault();
      
      // Getting the keys and values of all the fields in the form
      var obj = {};
      $.each($('#Board').serializeArray(), function(_, kv) {
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

          scrubbedData.serial_num = scrubbedData.serial_num.join('\n');
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
  }
});