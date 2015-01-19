var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname+'/db/bb-login.db');



var rasp2c = require('rasp2c');

var TSL2561 = require('sensor_tsl2561');
var Lux=0;
var sense = new TSL2561({
    'timingMode': '13.7ms',
    'gainMode': '16'
});


sense.init(function(err, val) {
    if (!err) {    }
});

setInterval(function() {
    sense.getLux(function (error, val) {
        if (!error) {
            console.log(val + ' lux');
            Lux=val; var milliseconds = (new Date).getTime();
            db.serialize(function () {
                db.run("INSERT INTO mess (cycle, day, timestamp, six, light ) VALUES (?, ? ,? ,? ,?)",
                    [ '1', '300' ,milliseconds, '6', Lux ], function (err, rows) {
                        if (err) {
                            console.log('Error-tsl2561!')
                        }
                    });
            });
        }
    });


// Detect devices on the I2C Bus
rasp2c.detect(function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// Dump the addresses 0x11 - 0x15 of the I2C device at address 0xa1 on the I2C bus

rasp2c.dump('0x39', '0x00', function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});






},50000);