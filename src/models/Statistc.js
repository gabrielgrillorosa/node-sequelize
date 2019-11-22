const { Model, DataTypes } = require('sequelize')
const moment = require('moment')
const Queue = require ('./Queue')

class Statistic extends Model {
    static init(sequelize){
        super.init({
            
            completed: DataTypes.INTEGER,
            abandoned: DataTypes.INTEGER,
            talktime: DataTypes.INTEGER,
            holdtime:  DataTypes.INTEGER,
            SL: DataTypes.INTEGER,
            SLPerf:  DataTypes.DECIMAL,
            queue_id: DataTypes.INTEGER,
            created_at: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: new Date()
            },            
     

         }, {
  
                timestamps: true,
                // I don't want createdAt
               createdAt: false,
               updatedAt: 'updated_at',

                // don't delete database entries but set the newly added attribute deletedAt
                // to the current date (when deletion was done). paranoid will only work if
                // timestamps are enabled
                //paranoid: true,
              
                // don't use camelcase for automatically added attributes but underscore style
                // so updatedAt will be updated_at
                underscored: false,
              
                // disable the modification of table names; By default, sequelize will automatically
                // transform all passed model names (first parameter of define) into plural.
                // if you don't want that, set the following
               // freezeTableName: true,
                sequelize ,


            }
        
        )
       
    }
    static associate(models) {
        
        this.belongsTo(models.Queue, { foreignKey: 'queue_id', as: 'queue' })

    }

}
module.exports = Statistic