const Queue = require('./Queue')
const { Model, DataTypes } = require('sequelize')
const Caller = require('./Caller')
const Atemp = require('./Attemp')
const MemberQueue = require('./MemberQueue')

class Member extends Model {
    static init(sequelize){
        super.init({
           name: DataTypes.STRING,
           callsTaken: DataTypes.INTEGER,
       }, {sequelize}
        
        )
       
    }
    static associate(models) {
        this.hasMany(models.Attemp,{ foreignKey: 'member_id',  as: 'attemps'})
         this.hasMany( models.Caller, { foreignKey: 'member_id', as: 'callers' } )
         this.belongsToMany( models.Queue, {
                foreignKey: 'member_id',
                through: MemberQueue,
                as: 'Queues' ,       
                model: MemberQueue,     
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                constraints: true        
        } )
    }
}
module.exports = Member;