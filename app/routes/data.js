/* Getters for the web interface */

var rootdir = process.env.ROOT_DIR;
var models = require(rootdir + '/app/models');

module.exports = function(app, pool) {

  /* 
   * This portion of /data/XXX is returning a json object
   * with data on the specific item.
   * ex: /data/cpu will call the stored procedure 'get_cpu()'
   * and get all the rows from the Processor table.
   */

  app.get('/data/stats', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query("CALL get_scrapped_status();", function(error, results, fields) {
        if(error) {
          throw error;
        }
        conn.release();

        jsonToSend.num_scrapped =  results[0][0].num_scrapped;
        jsonToSend.num_active = results[0][0].num_active;
        jsonToSend.num_total = jsonToSend.num_scrapped + jsonToSend.num_active;
        if (req.session.webLogin && req.session.wwid) {
          jsonToSend.is_admin = req.session.is_admin;
        } else {
          jsonToSend.is_admin = 0;
        }
        if (req.session.webLogin && req.session.first_name) {
          jsonToSend.first_name = req.session.first_name;
        }
        if (req.session.webLogin && req.session.last_name) {
          jsonToSend.last_name = req.session.last_name;
        }
        res.json(jsonToSend);
      });
    });
  });

  app.get('/data/cpu', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query("CALL get_cpu();", function(error, results, fields){
        if(error) {
          throw error;
        }
        conn.release();

        // We send admin stats for the table because there are admin-specific
        // elements to the table.
        if (req.session.webLogin && req.session.wwid) {
          jsonToSend.is_admin = req.session.is_admin;
        } else {
          jsonToSend.is_admin = 0;
        }
        var a = [];
        var user_name = null;
        for (var i in results[0]) {
          if(results[0][i].first_name == undefined || results[0][i].last_name == undefined) {
            user_name = null;
          } else {
            user_name = results[0][i].first_name + " " + results[0][i].last_name;
          }
          a.push(new models.CPU(results[0][i].serial_num, results[0][i].spec,
            results[0][i].mm, results[0][i].frequency, results[0][i].stepping,
            results[0][i].llc, results[0][i].cores, results[0][i].codename,
            results[0][i].cpu_class, results[0][i].external_name, results[0][i].architecture,
            results[0][i].user, results[0][i].checked_in, results[0][i].notes,
            results[0][i].scrapped, user_name));
        }
        jsonToSend.items = a;
        res.json(jsonToSend);
      });
    });
  });

  app.get('/data/ssd', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query("CALL get_ssd();", function(error, results, fields){
        if(error) {
          throw error;
        }
        conn.release();

        // We send admin stats for the table because there are admin-specific
        // elements to the table.
        if (req.session.webLogin && req.session.wwid) {
          jsonToSend.is_admin = req.session.is_admin;
        } else {
          jsonToSend.is_admin = 0;
        }
        var a = [];
        var user_name = null;
        for (var i in results[0]) {
          if(results[0][i].first_name == undefined || results[0][i].last_name == undefined) {
            user_name = null;
          } else {
            user_name = results[0][i].first_name + " " + results[0][i].last_name;
          }
          a.push(new models.SSD(results[0][i].serial_num, results[0][i].manufacturer, 
            results[0][i].model, results[0][i].capacity, results[0][i].user,
            results[0][i].checked_in, results[0][i].notes, results[0][i].scrapped, user_name));
        }
        jsonToSend.items = a;
        res.json(jsonToSend);
      });
    });
  });

  app.get('/data/memory', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query("CALL get_memory();", function(error, results, fields){
        if(error) {
          throw error;
        }
        conn.release();

        // We send admin stats for the table because there are admin-specific
        // elements to the table.
        if (req.session.webLogin && req.session.wwid) {
          jsonToSend.is_admin = req.session.is_admin;
        } else {
          jsonToSend.is_admin = 0;
        }
        var a = [];
        var user_name = null;
        for (var i in results[0]) {
          if(results[0][i].first_name == undefined || results[0][i].last_name == undefined) {
            user_name = null;
          } else {
            user_name = results[0][i].first_name + " " + results[0][i].last_name;
          }
          a.push(new models.Memory(results[0][i].serial_num, results[0][i].manufacturer,
            results[0][i].physical_size, results[0][i].memory_type, results[0][i].capacity, 
            results[0][i].speed, results[0][i].ecc, results[0][i].ranks, results[0][i].user,
            results[0][i].checked_in, results[0][i].notes, results[0][i].scrapped, user_name));
        }
        jsonToSend.items = a;
        res.json(jsonToSend);
      });
    });
  });

  app.get('/data/flash', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query("CALL get_flash();", function(error, results, fields){
        if(error) {
          throw error;
        }
        conn.release();

        // We send admin stats for the table because there are admin-specific
        // elements to the table.
        if (req.session.webLogin && req.session.wwid) {
          jsonToSend.is_admin = req.session.is_admin;
        } else {
          jsonToSend.is_admin = 0;
        }
        var a = [];
        var user_name = null;
        for (var i in results[0]) {
          if(results[0][i].first_name == undefined || results[0][i].last_name == undefined) {
            user_name = null;
          } else {
            user_name = results[0][i].first_name + " " + results[0][i].last_name;
          }
          a.push(new models.Flash_Drive(results[0][i].serial_num, 
            results[0][i].capacity, results[0][i].manufacturer,
            results[0][i].user, results[0][i].checked_in, results[0][i].notes,
            results[0][i].scrapped, user_name));
        }
        jsonToSend.items = a;
        res.json(jsonToSend);
      });
    });
  });

  app.get('/data/board', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query("CALL get_board();", function(error, results, fields){
        if(error) {
          throw error;
        }
        conn.release();

        // We send admin stats for the table because there are admin-specific
        // elements to the table.
        if (req.session.webLogin && req.session.wwid) {
          jsonToSend.is_admin = req.session.is_admin;
        } else {
          jsonToSend.is_admin = 0;
        }
        var a = [];
        var user_name = null;
        for (var i in results[0]) {
          if(results[0][i].first_name == undefined || results[0][i].last_name == undefined) {
            user_name = null;
          } else {
            user_name = results[0][i].first_name + " " + results[0][i].last_name;
          }
          a.push(new models.Board(results[0][i].serial_num, results[0][i].fpga,
            results[0][i].bios, results[0][i].mac, results[0][i].fab,
            results[0][i].user, results[0][i].checked_in, results[0][i].notes,
            results[0][i].scrapped, user_name));
        }
        jsonToSend.items = a;
        res.json(jsonToSend);
      });
    });
  });

  /* Getters for json data on items in the scrap table */
  app.get('/data/scrap/cpu/:serial', function(req, res) {
    var serial = req.params.serial;
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_cpu_by_serial("'+ serial +'");',
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();

          if (process.env.ENV == 'dev' && results[0].length > 0) {
            console.log(results[0][0].serial_num);
          }
          if(results[0].length > 0) {
            jsonToSend = new models.CPU(results[0][0].serial_num, results[0][0].spec,
              results[0][0].mm, results[0][0].frequency, results[0][0].stepping,
              results[0][0].llc, results[0][0].cores, results[0][0].codename,
              results[0][0].cpu_class, results[0][0].external_name, results[0][0].architecture,
              results[0][0].user, results[0][0].checked_in, results[0][0].notes,
              results[0][0].scrapped);
          } else {
            jsonToSend = [];
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/ssd/:serial', function(req, res) {
    var serial = req.params.serial;
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_ssd_by_serial("'+ serial +'");',
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();

          if (process.env.ENV == 'dev' && results[0].length > 0) {
            console.log(results[0][0].serial_num);
          }
          if(results[0].length > 0) {
            jsonToSend = new models.SSD(results[0][0].serial_num, results[0][0].manufacturer, 
            results[0][0].model, results[0][0].capacity, results[0][0].user,
            results[0][0].checked_in, results[0][0].notes, results[0][0].scrapped);
          } else {
            jsonToSend = [];
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/memory/:serial', function(req, res) {
    var serial = req.params.serial;
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_memory_by_serial("'+ serial +'");',
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();

          if (process.env.ENV == 'dev' && results[0].length > 0) {
            console.log(results[0][0].serial_num);
          }
          if(results[0].length > 0) {
            jsonToSend = new models.Memory(results[0][0].serial_num, results[0][0].manufacturer,
            results[0][0].physical_size, results[0][0].memory_type, results[0][0].capacity, 
            results[0][0].speed, results[0][0].ecc, results[0][0].ranks, results[0][0].user,
            results[0][0].checked_in, results[0][0].notes, results[0][0].scrapped);
          } else {
            jsonToSend = [];
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/flash/:serial', function(req, res) {
    var serial = req.params.serial;
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_flash_by_serial("'+ serial +'");',
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();

          if (process.env.ENV == 'dev' && results[0].length > 0) {
            console.log(results[0][0].serial_num);
          }
          if(results[0].length > 0) {
            jsonToSend = new models.Flash_Drive(results[0][0].serial_num, 
              results[0][0].capacity, results[0][0].manufacturer, 
              results[0][0].user, results[0][0].checked_in, results[0][0].notes,
              results[0][0].scrapped);
          } else {
            jsonToSend = [];
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/board/:serial', function(req, res) {
    var serial = req.params.serial;
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_board_by_serial("'+ serial +'");',
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();

          if (process.env.ENV == 'dev' && results[0].length > 0) {
            console.log(results[0][0].serial_num);
          }
          if(results[0].length > 0) {
            jsonToSend = new models.Board(results[0][0].serial_num, results[0][0].fpga,
            results[0][0].bios, results[0][0].mac, results[0][0].fab,
            results[0][0].user, results[0][0].checked_in, results[0][0].notes,
            results[0][0].scrapped);
          } else {
            jsonToSend = [];
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/cpu', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_scrapped_cpu();',
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
          if (req.session.webLogin && req.session.wwid) {
            jsonToSend.is_admin = req.session.is_admin;
          } else {
            jsonToSend.is_admin = 0;
          }
          if(results[0].length > 0) {
            var a = [];
            for (var i in results[0]) {
              a.push(new models.CPU(results[0][i].serial_num, results[0][i].spec,
                results[0][i].mm, results[0][i].frequency, results[0][i].stepping,
                results[0][i].llc, results[0][i].cores, results[0][i].codename,
                results[0][i].cpu_class, results[0][i].external_name, results[0][i].architecture,
                results[0][i].user, results[0][i].checked_in, results[0][i].notes,
                results[0][i].scrapped));
            }
            jsonToSend.items = a;
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/ssd', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_scrapped_ssd();',
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
          if (req.session.webLogin && req.session.wwid) {
            jsonToSend.is_admin = req.session.is_admin;
          } else {
            jsonToSend.is_admin = 0;
          }
          if(results[0].length > 0) {
            var a = [];
            for (var i in results[0]) {
              a.push(new models.SSD(results[0][i].serial_num, results[0][i].manufacturer, 
                results[0][i].model, results[0][i].capacity, results[0][i].user,
                results[0][i].checked_in, results[0][i].notes, results[0][i].scrapped));
            }
            jsonToSend.items = a;
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/memory', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_scrapped_memory();',
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
          if (req.session.webLogin && req.session.wwid) {
            jsonToSend.is_admin = req.session.is_admin;
          } else {
            jsonToSend.is_admin = 0;
          }
          if(results[0].length > 0) {
            var a = [];
            for (var i in results[0]) {
              a.push(new models.Memory(results[0][i].serial_num, results[0][i].manufacturer,
                results[0][i].physical_size, results[0][i].memory_type, results[0][i].capacity, 
                results[0][i].speed, results[0][i].ecc, results[0][i].ranks, results[0][i].user,
                results[0][i].checked_in, results[0][i].notes, results[0][i].scrapped));
            }
            jsonToSend.items = a;
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/flash', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_scrapped_flash();',
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
          if (req.session.webLogin && req.session.wwid) {
            jsonToSend.is_admin = req.session.is_admin;
          } else {
            jsonToSend.is_admin = 0;
          }
          if(results[0].length > 0) {
            var a = [];
            for (var i in results[0]) {
              a.push(new models.Flash_Drive(results[0][i].serial_num, 
                results[0][i].capacity, results[0][i].manufacturer,
                results[0][i].user, results[0][i].checked_in, results[0][i].notes,
                results[0][i].scrapped));
            }
            jsonToSend.items = a;
          }
          res.json(jsonToSend);
        });
    });
  });

  app.get('/data/scrap/board', function(req, res) {
    var jsonToSend = {};
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_scrapped_board();',
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
          if (req.session.webLogin && req.session.wwid) {
            jsonToSend.is_admin = req.session.is_admin;
          } else {
            jsonToSend.is_admin = 0;
          }
          if(results[0].length > 0) {
            var a = [];
            for (var i in results[0]) {
              a.push(new models.Board(results[0][i].serial_num, results[0][i].fpga,
                results[0][i].bios, results[0][i].mac, results[0][i].fab,
                results[0][i].user, results[0][i].checked_in, results[0][i].notes,
                results[0][i].scrapped));
            }
            jsonToSend.items = a;
          }
          res.json(jsonToSend);
        });
    });
  });

  /* Gets all the different column names that are dropdown menus. */
  app.get('/dd/keys', function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_dropdown_keys()',
        function(error, results, fields) {
          if (error) {
            throw error;
          }
          conn.release();

          res.send(results[0]);
        });
    });
  });

  /* Gets the dropdown menu items when someone needs to add a new item. */
  app.get('/dd/values/:attr', function(req, res) {
    var attr = req.params.attr;
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_dropdown(\''+attr+'\')',
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();

          res.send(results[0]);
        });
    });
  });
};