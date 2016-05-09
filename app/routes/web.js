var rootdir = process.env.ROOT_DIR;
var request = require('request');
var scrub = require('../scrubbers');
var validate = require('../validators');

module.exports = function(app, pool) {
  
  // Middleware: Enforce admin privileges to add items.
  
  /* 
   * checkSerials: checks for duplicate entries in the textbox,
   * and if the serial number exists in the database.
   */
  function checkSerials(req, res, next) {
  	pool.getConnection(function(err, conn) {
  		var serailNumsString = "'\\'" + req.body.serial_num.toString().replace(/,/g, "\\',\\'") + "\\''";
			var errorList = [];

  		conn.query("CALL check_serial("+serailNumsString+");",
  			function(error, results, fields) {
  				if (error) {
  					throw error;
  				}
  				conn.release();

  				if (results[0].length !== 0) {
  					for (var i = 0; i < results[0].length; i++) {
  						errorList.push(results[0][i].serial_num + ' already exists.');
  					}
  				}

  				var occurrences = { };
					for (var i = 0, j = req.body.serial_num.length; i < j; i++) {
					   occurrences[req.body.serial_num[i]] = (occurrences[req.body.serial_num[i]] || 0) + 1;
					}

					for (var key in occurrences) {
						if (occurrences.hasOwnProperty(key)) {
							if (occurrences[key] > 1) {
								errorList.push(key+' was entered more than once.');
							}
						}
					}

  				if (errorList.length > 0) {
  					res.status(400).send({serial_num: errorList});  					
  				} else {
  					next();
  				}
  			});
  	});
  }

	/*
	 * scrubAndValidate: sanitizes and validates the user input.
	 */
	function scrubAndValidate(itemType) {
		var verrors;
		return function(req,res,next) {
			if (itemType === 'CPU')    {
				req.body = scrub.CPU(req.body);
				verrors = validate.CPU(req.body);
			} else if (itemType === 'SSD') {
				req.body = scrub.SSD(req.body);
				verrors = validate.SSD(req.body);
			} else if (itemType === 'Memory') {
				req.body = scrub.Memory(req.body);
				verrors = validate.Memory(req.body);
			} else if (itemType === 'Flash') {
				req.body = scrub.Flash(req.body);
				verrors = validate.Flash(req.body);
			} else if (itemType === 'Board') {
				req.body = scrub.Board(req.body);
				verrors = validate.Board(req.body);
			}

		  if (verrors) {
		    res.status(400).send(verrors);
		  } else {
		  	next();
		  }
		}
	}

  /* Posts for the web interface
   * These are when someone submits 
   * a form and POSTS the data. */

  app.post('/update/cpu', scrubAndValidate('CPU'), function(req, res) {
  	pool.getConnection(function(err, conn) {
	    conn.query("CALL update_cpu('"+req.body.serial_num+"','"
        +req.body.spec+"','"+req.body.mm+"','"
        +req.body.frequency+"','"+req.body.stepping+"','"
        +req.body.llc+"','"+req.body.cores+"','"
        +req.body.codename+"','"+req.body.cpu_class+"','"
        +req.body.external_name+"','"+req.body.architecture+"','"
        +req.body.notes+"','"+req.body.scrapped+"');",
      function(error, results, fields){
        if(error) {
          throw error;
        }
        conn.release();
      });
    });
    res.status(200).send(req.body);
	});

  app.post('/update/cpu/notes', function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_notes('"+req.body.serial_num+"', '"+req.body.notes+"');",
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.end();
  });

  app.post('/update/ssd', scrubAndValidate('SSD'), function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_ssd('"+req.body.serial_num+"','"
        +req.body.capacity+"','"+req.body.manufacturer+"','"
        +req.body.model+"','"
        +req.body.notes+"','"+req.body.scrapped+"');",
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.status(200).send(req.body);
  });

  app.post('/update/ssd/notes', function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_notes('"+req.body.serial_num+"', '"+req.body.notes+"');",
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.end();
  });

  app.post('/update/memory', scrubAndValidate('Memory'), function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_memory('"+
        req.body.serial_num+"','"+
        req.body.manufacturer+"','"+
        req.body.physical_size+"','"+
        req.body.ecc+"','"+
        req.body.ranks+"','"+
        req.body.memory_type+"','"+
        req.body.capacity+"','"+
        req.body.speed+"','"+
        req.body.notes+"','"+
        req.body.scrapped+"');",
        function(error, results, fields){
          console.log(results);
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.status(200).send(req.body);
  });

  app.post('/update/memory/notes', function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_notes('"+req.body.serial_num+"', '"+req.body.notes+"');",
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.end();
  });

  app.post('/update/flash', scrubAndValidate('Flash'), function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_flash('"+req.body.serial_num+"','"
        +req.body.capacity+"','"+req.body.manufacturer+"','"
        +req.body.notes+"','"+req.body.scrapped+"');",
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.status(200).send(req.body);
  });

  app.post('/update/flash/notes', function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_notes('"+req.body.serial_num+"', '"+req.body.notes+"');",
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.end();
  });

  app.post('/update/board', scrubAndValidate('Board'), function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_board('"+req.body.serial_num+"','"
        +req.body.fpga+"','"+req.body.bios+"','"
        +req.body.mac+"','"+req.body.fab+"','"
        +req.body.notes+"','"+req.body.scrapped+"');",
        function(error, results, fields){
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.status(200).send(req.body);
  });

  app.post('/update/board/notes', function(req, res) {
    pool.getConnection(function(err, conn) {
      conn.query("CALL update_notes('"+req.body.serial_num+"', '"+req.body.notes+"');",
        function(error, results, fields) {
          if(error) {
            throw error;
          }
          conn.release();
      });
    });
    res.end();
  });

  app.post('/add/cpu', [scrubAndValidate('CPU'), checkSerials], function(req, res) {
    var stringifySerials = req.body.serial_num.toString();
    pool.getConnection(function(err, conn) {
      conn.query("CALL put_cpu('"+stringifySerials+"','"
        +req.body.spec+"','"+req.body.mm+"','"
        +req.body.frequency+"','"+req.body.stepping+"','"
        +req.body.llc+"','"+req.body.cores+"','"
        +req.body.codename+"','"+req.body.cpu_class+"','"
        +req.body.external_name+"','"+req.body.architecture+"','"
        +req.body.notes+"');",
      	function(error, results, fields){
        	if(error) {
          	throw error;
        	}
    	});

  		conn.release();
    	res.status(200).send(req.body);
  	});
  });

  app.post('/add/ssd', [scrubAndValidate('SSD'), checkSerials], function(req, res) {
    var stringifySerials = req.body.serial_num.toString();
    pool.getConnection(function(err, conn) {
      conn.query("CALL put_ssd('"+stringifySerials+"','"
        +req.body.manufacturer+"','"+req.body.model+"','"
        +req.body.capacity+"','"+req.body.notes+"');",
      function(error, results, fields){
        if(error) {
          throw error;
        }
      });

      conn.release();
      res.status(200).send(req.body);
    });
  });

  app.post('/add/memory', [scrubAndValidate('Memory'), checkSerials], function(req, res) {
    var stringifySerials = req.body.serial_num.toString();
    pool.getConnection(function(err, conn) {
      conn.query("CALL put_memory('"+stringifySerials+"','"
        +req.body.manufacturer+"','"+req.body.physical_size+"','"
        +req.body.memory_type+"','"+req.body.capacity+"','"
        +req.body.speed+"','"+req.body.ecc+"','"
        +req.body.ranks+"','"+req.body.notes+"');",
      function(error, results, fields){
        if(error) {
          throw error;
        }
      });
      conn.release();
      res.status(200).send(req.body);
    });
  });

  app.post('/add/flash', [scrubAndValidate('Flash'), checkSerials], function(req, res) {
    var stringifySerials = req.body.serial_num.toString();
    pool.getConnection(function(err, conn) {
      conn.query("CALL put_flash_drive('"+stringifySerials+"','"
        +req.body.manufacturer+"','"+req.body.capacity+"','"
        +req.body.notes+"');",
      function(error, results, fields){
        if(error) {
          throw error;
        }
      });
      conn.release();
      res.status(200).send(req.body);
    });
  });

  app.post('/add/board', [scrubAndValidate('Board'), checkSerials], function(req, res) {
    var stringifySerials = req.body.serial_num.toString();
    pool.getConnection(function(err, conn) {
      conn.query("CALL put_board('"+stringifySerials+"','"
        +req.body.fpga+"','"+req.body.bios+"','"
        +req.body.mac+"','"+req.body.fab+"','"+req.body.notes+"');",
      function(error, results, fields){
        if(error) {
          throw error;
        }
      });
      conn.release();
      res.status(200).send(req.body);
    });
  });

  app.post('/scrap/submit', function(req, res) {
    if(req.body.hasOwnProperty('cpu')) {
      pool.getConnection(function(err, conn) {
        for(var i = 0; i < req.body.cpu.length; i++) {
          conn.query("CALL scrap_item('"+req.body.cpu[i].serial_num+"');",
          function(error, results, fields) {
            if(error) {
              throw error;
            }
          });
        }
        conn.release();
      });
    }
    if(req.body.hasOwnProperty('ssd')) {
      pool.getConnection(function(err, conn) {
        for(var i = 0; i < req.body.ssd.length; i++) {
          conn.query("CALL scrap_item('"+req.body.ssd[i].serial_num+"');",
          function(error, results, fields) {
            if(error) {
              throw error;
            }
          });
        }
        conn.release();
      });
    }
    if(req.body.hasOwnProperty('memory')) {
      pool.getConnection(function(err, conn) {
        for(var i = 0; i < req.body.memory.length; i++) {
          conn.query("CALL scrap_item('"+req.body.memory[i].serial_num+"');",
          function(error, results, fields) {
            if(error) {
              throw error;
            }
          });
        }
        conn.release();
      });
    }
    if(req.body.hasOwnProperty('flash')) {
      pool.getConnection(function(err, conn) {
        for(var i = 0; i < req.body.flash.length; i++) {
          conn.query("CALL scrap_item('"+req.body.flash[i].serial_num+"');",
            function(error, results, fields) {
            if(error) {
              throw error;
            }
          });
        }
        conn.release();
      });
    }
    if(req.body.hasOwnProperty('board')) {
      pool.getConnection(function(err, conn) {
        for(var i = 0; i < req.body.flash.length; i++) {
          conn.query("CALL scrap_item('"+req.body.board[i].serial_num+"');",
            function(error, results, fields) {
            if(error) {
              throw error;
            }
          });
        }
        conn.release();
      });
    }
  });

  /* Routes for loading pages in the web interface */

  app.get('/', function(req, res) {
    res.sendFile(rootdir + '/public/web/index.html');
  });

  app.get('/add/cpu', function(req, res) {
    res.sendFile(rootdir + '/public/web/add_cpu.html');
  });

  app.get('/add/ssd', function(req, res) {
    res.sendFile(rootdir + '/public/web/add_ssd.html');
  });

  app.get('/add/memory', function(req, res) {
    res.sendFile(rootdir + '/public/web/add_memory.html');
  });

  app.get('/add/flash', function(req, res) {
    res.sendFile(rootdir + '/public/web/add_flash_drive.html');
  });

  app.get('/add/board', function(req, res) {
    res.sendFile(rootdir + '/public/web/add_board.html');
  });

  app.get('/settings/attributes', enforceAdminLogin, function(req, res) {
    res.sendFile(rootdir + '/public/web/edit_dropdowns.html');
  });

  app.get('/scrap-items', enforceAdminLogin, function(req, res) {
    res.sendFile(rootdir + '/public/web/scrap-items.html');
  })

  app.get('/view-scrapped', enforceAdminLogin, function(req, res) {
    res.sendFile(rootdir + '/public/web/view-scrapped.html');
  })

  // TODO: Add new attributes to the database
  app.post('/settings/attributes', enforceAdminLogin, function(req, res) {
    console.log(req.body);
    res.send({redirect: '/settings'});
  });

   // For testing purposes. Will need to be deleted.
  app.get('/testsite', function(req, res) {
    res.sendFile(rootdir + '/public/web/testsite.html');
  });

  app.get('/login', function(req, res) {
    res.sendFile(rootdir + '/public/web/login.html');
  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err)
      };
    });
    res.clearCookie('my.tracker.sid');
    res.redirect('/');
  });

  /* 
   * Middleware for logging into the web interface. We need a few things done in sequential order.
   *
   * 1. Go to Intel's Active Directory Server, get WWID back.
   * 2. Check our database for user information using the WWID as a key.
   *
   * After that, we have the user's name and wwid stored in session, and can allow them into the cart.
   */
  app.use('/login/login', function(req, res, next) {
    request.post({url: process.env.CRED_ADDR, form: {'username': req.body.username, 'pass': req.body.pass}},
      function(error, response, body) {
        if (error) {
          console.log(error);
        }

        // Checking if the user exists in AD.
        if (body !== '') {
          // We have a user in the AD system. Parse out the wwid.
          req.session.wwid = body;
        } else {
          // No wwid found, erase current session and create new session for user.
          req.session.regenerate();
          res.redirect('/login');
        }
        next();
      });
  }, function(req,res,next) {
    // We know at this point we have a wwid, so let's try to get the user from our DB.
    pool.getConnection(function(err, conn) {
      conn.query('CALL get_user_from_wwid('+req.session.wwid+')', function(error, results, fields) {
          if (error) {
            throw error;
          }
          conn.release();
          
          if (results[0].length === 1) {
            req.session.last_name = results[0][0].last_name;
            req.session.first_name = results[0][0].first_name;
            req.session.is_admin = results[0][0].is_admin;
            req.session.save();
          } else {
            // Got no results
            res.redirect('/login');
          }
          next();
        });
    });
  });

  app.post('/login/login', function(req, res) {
    // If we made it this far through the middleware,
    // It must mean success. Send them to the cart!

    //TEST LOGS
    if (process.env.ENV === 'dev') {
      console.log(req.session.wwid);
      console.log(req.session.last_name);
      console.log(req.session.first_name);
    }
    
    res.redirect('/');
  });

};

function enforceLogin(req, res, next) {
  if (req.session.wwid) {
    next();
  } else {
    res.redirect('/login');
  }
}

function enforceAdminLogin(req, res, next) {
  if (req.session.wwid && req.session.is_admin) {
    next();
  } else {
    res.redirect('/login');
  }
}
