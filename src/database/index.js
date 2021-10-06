const Sequelize = require('sequelize')
const dbconfig = require ('../config/database')

const MemberQueue = require('../models/MemberQueue')
const Caller = require('../models/Caller')
const Member = require('../models/Member')
const Queue = require('../models/Queue')
const Statistic = require('../models/Statistc')
const Attemp = require('../models/Attemp')

const connection = new Sequelize(dbconfig)

MemberQueue.init(connection)
Caller.init(connection)
Member.init(connection)
Queue.init(connection)
Statistic.init(connection)
Attemp.init(connection)

Caller.associate(connection.models)
Member.associate(connection.models)
Queue.associate(connection.models)
Statistic.associate(connection.models)
MemberQueue.associate(connection.models)
Attemp.associate(connection.models)


module.exports = connection