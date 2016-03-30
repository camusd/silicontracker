/* Getters for the web interface */

var rootdir = process.env.ROOT_DIR;
var models = require(rootdir + '/app/models');

module.exports = function(app, conn) {

  /* 
   * This portion of /data/XXX is returning a json object
   * with data on the specific item.
   * ex: /data/cpu will call the stored procedure 'get_cpu()'
   * and get all the rows from the Processor table.
   */

  app.get('/data/stats', function(req, res) {
    var jsonToSend = {};
    conn.query("CALL get_scrapped_status();", function(error, results, fields) {
      if(error) {
        throw error;
      }
      jsonToSend.num_scrapped =  results[0][0].num_scrapped;
      jsonToSend.num_active = results[0][0].num_active;
      jsonToSend.num_total = jsonToSend.num_scrapped + jsonToSend.num_active;
      if (req.session.wwid) {
        jsonToSend.is_admin = req.session.is_admin;
      } else {
        jsonToSend.is_admin = 0;
      }
      if (req.session.first_name) {
        jsonToSend.first_name = req.session.first_name;
      }
      if (req.session.last_name) {
        jsonToSend.last_name = req.session.last_name;
      }
      res.json(jsonToSend);
    });
  });

  app.get('/data/cpu', function(req, res) {
    var jsonToSend = {};
    conn.query("CALL get_cpu();", function(error, results, fields){
      if(error) {
        throw error;
      }
      // We send admin stats for the table because there are admin-specific
      // elements to the table.
      if (req.session.wwid) {
        jsonToSend.is_admin = req.session.is_admin;
      } else {
        jsonToSend.is_admin = 0;
      }
      var a = [];
      for (var i in results[0]) {
        a.push(new models.CPU(results[0][i].serial_num, results[0][i].spec, results[0][i].mm, 
          results[0][i].frequency, results[0][i].stepping, results[0][i].llc, results[0][i].cores,
          results[0][i].codename, results[0][i].cpu_class, results[0][i].external_name, results[0][i].architecture,
          results[0][i].user, results[0][i].checked_in, results[0][i].notes));
      }
      jsonToSend.items = a;
      res.json(jsonToSend);
    });
  });


  // WORK IN PROGRESS:
  // Still needs work to be complete.
  // Currently not being referenced anywhere.
  app.get('/data/notes', function(req, res) {
    var serial = req.params.serial;
    conn.query('SELECT i.notes FROM Items i JOIN Processor p ON i.id = p.product_id WHERE p.serial_num = \''+serial+'\';',
      function(error, results, fields) {
      if (error) {
        throw error;
      }
      console.log(results[0]);
      res.send(results[0]);
    });
  });

  app.get('/data/ssd', function(req, res) {
    var jsonToSend = {};
    conn.query("CALL get_ssd();", function(error, results, fields){
      if(error) {
        throw error;
      }
      // We send admin stats for the table because there are admin-specific
      // elements to the table.
      if (req.session.wwid) {
        jsonToSend.is_admin = req.session.is_admin;
      } else {
        jsonToSend.is_admin = 0;
      }
      var a = [];
      for (var i in results[0]) {
        a.push(new models.SSD(results[0][i].serial_num, results[0][i].manufacturer, 
          results[0][i].model, results[0][i].capacity, results[0][i].user,
          results[0][i].checked_in, results[0][i].notes));
      }
      jsonToSend.items = a;
      res.json(jsonToSend);
    });
  });

  app.get('/data/memory', function(req, res) {
    var jsonToSend = {};
    conn.query("CALL get_memory();", function(error, results, fields){
      if(error) {
        throw error;
      }
      // We send admin stats for the table because there are admin-specific
      // elements to the table.
      if (req.session.wwid) {
        jsonToSend.is_admin = req.session.is_admin;
      } else {
        jsonToSend.is_admin = 0;
      }
      var a = [];
      for (var i in results[0]) {
        a.push(new models.Memory(results[0][i].serial_num, results[0][i].manufacturer,
          results[0][i].physical_size, results[0][i].memory_type, results[0][i].capacity, 
          results[0][i].speed, results[0][i].ecc, results[0][i].ranks, results[0][i].user,
          results[0][i].checked_in, results[0][i].notes));
      }
      jsonToSend.items = a;
      res.json(jsonToSend);
    });
  });

  app.get('/data/flash', function(req, res) {
    var jsonToSend = {};
    conn.query("CALL get_flash_drive();", function(error, results, fields){
      if(error) {
        throw error;
      }
      // We send admin stats for the table because there are admin-specific
      // elements to the table.
      if (req.session.wwid) {
        jsonToSend.is_admin = req.session.is_admin;
      } else {
        jsonToSend.is_admin = 0;
      }
      var a = [];
      for (var i in results[0]) {
        a.push(new models.Flash_Drive(results[0][i].serial_num, results[0][i].capacity,
          results[0][i].manufacturer, results[0][i].user, results[0][i].checked_in, results[0][i].notes));
      }
      jsonToSend.items = a;
      res.json(jsonToSend);
    });
  });

  /* Gets all the different column names that are dropdown menus. */
  app.get('/dd/keys', function(req, res) {
    conn.query('CALL get_dropdown_keys()',
      function(error, results, fields) {
        if (error) {
          throw error;
        }
        res.send(results[0]);
      });
  });

  /* Gets the dropdown menu items when someone needs to add a new item. */
  app.get('/dd/values/:attr', function(req, res) {
    var attr = req.params.attr;
    conn.query('CALL get_dropdown(\''+attr+'\')',
      function(error, results, fields){
        if(error) {
          throw error;
        }
        res.send(results[0]);
      });
  });
};