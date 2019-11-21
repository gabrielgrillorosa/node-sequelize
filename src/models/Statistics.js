const { Model, DataTypes } = require('sequelize')
const moment = require('moment')
const Queue = require ('./Queue')

class Statistics extends Model {
    static init(sequelize){
        super.init({
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                  return moment(this.getDataValue('created_at'))
                    .utcOffset(this.getDataValue('offset'));
                },
                set(){


                }
            },            
            completed: DataTypes.INTEGER,
            abandoned: DataTypes.INTEGER,
            talktime: DataTypes.INTEGER,
            holdtime:  DataTypes.INTEGER,
            SL: DataTypes.INTEGER,
            SLPerf:  DataTypes.DECIMAL,
            queue_id: DataTypes.INTEGER,
     

            }, {sequelize        
            }
        
        )
       
    }
    static associate(models) {
        
        this.belongsTo(models.Queue, { foreignKey: 'queue_id', as: 'queue' })

    }

}
module.exports = Statistics