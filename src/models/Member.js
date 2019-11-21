const Queue = require('./Queue')
const { Model, DataTypes } = require('sequelize')
const Caller = require('./Caller')

class Member extends Model {
    static init(sequelize){
        super.init({
           name: DataTypes.STRING,
           callsTaken: DataTypes.INTEGER,
       }, {sequelize}
        
        )
       
    }
    static associate(models) {
        this.hasMany( models.Caller, { foreignKey: 'member_id', as: 'callers' } )
        this.belongsToMany( models.Queue, { foreignKey: 'member_id', through: 'MemberQueues',  as: 'Queues' } )
    }
}
module.exports = Member;