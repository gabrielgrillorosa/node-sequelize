const { Model, DataTypes } = require('sequelize')
const Caller = require('./Caller')
const  Statistics = require('./Statistics')

class Queue extends Model {
    static init(sequelize){
        super.init({
            sid: DataTypes.INTEGER,
            name: DataTypes.STRING,
            weight: DataTypes.INTEGER,
            max: DataTypes.INTEGER,
    }, {sequelize}
        
        )
       
    }
    static associate(models) {
        this.belongsToMany( models.Member, { foreignKey: 'queue_id', through: 'MemberQueues',  as: 'Members' } )
        this.hasMany(models.Caller,{ foreignKey: 'queue_id',  as: 'callers' })
        this.hasMany(models.Statistics, { foreignKey: 'queue_id', as: ' statistics' })
    }
}
module.exports = Queue;