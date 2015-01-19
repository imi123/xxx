/**
 * Created by gazdi on 2014.12.29..
 */

old_id1=0; new_id1=0; old_id2=0; new_id2=0;
var sql      = require('mysql');
var connlocal_kovago  = sql.createConnection({
    host     : '192.168.1.102',
    //host     : 'szkk.no-ip.org',
    database: 'kovago',
    user     : 'wp',
    password : 'wp'
});
var connlocal_szkk  = sql.createConnection({
    host     : '192.168.1.102',
    //host     : 'szkk.no-ip.org',
    database: 'szkk',
    user     : 'wp',
    password : 'wp'
});




var connszkk  = sql.createConnection({
    //host     : '192.168.1.100',
    host     : 'szkk.no-ip.org',
    database: 'test',
    user     : 'wp',
    password : 'wp'
});
var connkovago  = sql.createConnection({
    //host     : '192.168.1.100',
    host     : 'kovago.no-ip.org',
    database: 'test',
    user     : 'wp',
    password : 'wp'
});
connlocal_kovago.connect();
connlocal_szkk.connect();
connszkk.connect();
connkovago.connect();

module.exports = {
    locator: function () {
        zemba() ;// whatever
    },
    bar: function () {
        // whatever
    }
};

var zemba = function () {
     connszkk.query((' select *     from adc  ORDER BY Id DESC  LIMIT 1'), function(err, rows, fields) {
        if (err) throw err;

         new_id1=rows["0"].Id
         if (old_id1 != new_id1  )
         {
             var post = rows;   //var post  = { name: 'Hello MySQL'};
             var query = connlocal_szkk.query('INSERT INTO adc SET ?', post, function(err, result) {
                 // Neat!
             });
             console.log(query.sql);
             old_id1=new_id1;
         }




    });
    connkovago.query((' select *    from adc  ORDER BY Id DESC  LIMIT 1'), function(err, rows, fields) {
    if (err) throw err;

        new_id2=rows["0"].Id
        if (old_id2 != new_id2  )
        {
            var post = rows;   //var post  = { name: 'Hello MySQL'};
            var query = connlocal_kovago.query('INSERT INTO adc SET ?', post, function(err, result) {
                // Neat!
            });
            console.log(query.sql);
            old_id2=new_id2;
        }


    });


};

