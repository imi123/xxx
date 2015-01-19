/**
 * Created by gazdi on 2014.08.19..
 */


 var routes  = require('./routes')
 var dbs    = require('./models')
 , user    = require('./routes/user')
 , task    = require('./routes/task')
 , lodash    = require('lodash')


var Sequelize = require('sequelize-sqlite').sequelize
var sqlite    = require('sequelize-sqlite').sqlite


var sequelize = new Sequelize('fing', '', '', {
    force: true,
    dialect: 'sqlite',
    storage: 'db/bbb-login.db'

})

var User      = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

sequelize.sync({ force: true }).complete(function(err) {
    User.create({ username: 'john', password: '1111' }).complete(function(err, user1) {
        User.find({ username: 'john' }).complete(function(err, user2) {
            console.log(user1.values, user2.values)
        })
    })
})
/*


 */
sequelize.sync({ force: true })
    .success(function(){
        console.log('database synced')
    })

var User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})
sequelize
    .sync({ force: true })
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err)
        } else {
            console.log('Table ready, It worked!')
        }
    })



/*
 sequelize.query("SELECT * FROM Users").success(function(Rows) {
 console.log(Rows)
 })
*/

var Cycle = sequelize.define('Cycle', {
    cyclenumber: Sequelize.STRING
})
sequelize.sync({ force: true }).complete(function(err) {
    Cycle.create({ cyclenumber: '77' }).complete(function(err, cyclenumber1) {
    })
})
module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, dbs)

