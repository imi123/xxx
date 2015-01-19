module.exports = function (tsl2561w32)
{
    var TSL2561 = require('sensor_tsl2561');
    var sense = new TSL2561({
        'timingMode': '13.7ms',
        'gainMode': '16'
    });

    sense.init(function(err, val) {
        if (!err) {
            sense.getLux(function(error, val) {
                if (!error) console.log(val + ' lux');
            });
        }
    });

    setInterval(function(){
        sense.getLux(function(error, val) {
            if (!error) console.log(val + ' lux');
        });

    },1000);




}

