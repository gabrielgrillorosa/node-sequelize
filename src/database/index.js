const Sequelize = require('sequelize')
const dbconfig = require ('../config/database')


const Caller = require('../models/Caller')
const Member = require('../models/Member')
const Queue = require('../models/Queue')
const Statistics = require('../models/Statistics')

const connection = new Sequelize(dbconfig)




Caller.init(connection)
Member.init(connection)
Queue.init(connection)
Statistics.init(connection)

Caller.associate(connection.models)
Member.associate(connection.models)
Queue.associate(connection.models)
Statistics.associate(connection.models)

Caller.sync()
Member.sync()
Queue.sync()
Statistics.sync({force:true});





module.exports = connection