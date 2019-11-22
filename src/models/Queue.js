const { Model, DataTypes } = require('sequelize')
const Caller = require('./Caller')
const Member = require('./Member')
const  Statistic = require('./Statistc')
const MemberQueue = require('./MemberQueue')

class Queue extends Model {
    
   
    static init(sequelize){
       
        super.init({
            sid: DataTypes.INTEGER,
            name: DataTypes.STRING,
            weight: DataTypes.INTEGER,
            max: DataTypes.INTEGER,
                        
         },
          {sequelize
        
        
        }
        
        )
       
    }
    static associate(models) {
        
        
        this.hasMany(models.Caller,{ foreignKey: 'queue_id',  as: 'callers' })
        this.hasMany(models.Statistic, { foreignKey: 'queue_id', as: 'statistics'})
        this.belongsToMany( models.Member,
            {
                foreignKey: 'queue_id',
                through: MemberQueue,
                as: 'Members' ,
                onDelete: 'SET NULL',
                model: MemberQueue,
                onUpdate: 'CASCADE',
                constraints: true
        
           } )
    }
}
module.exports = Queue;