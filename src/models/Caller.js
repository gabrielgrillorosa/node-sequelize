const { Model, DataTypes } = require('sequelize')
const Queue = require ('./Queue')
const moment = require('moment')

class Caller extends Model {
    static init(sequelize){
        super.init({
            
            uid: { 
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false
              
            },
            status: {
                type: DataTypes.STRING,
                 allowNull: false,
            },     
         
            chan: DataTypes.STRING,
            position: DataTypes.INTEGER,
            member_id: DataTypes.INTEGER,
            queue_id: DataTypes.INTEGER,
            
            }, {
                 timestamps: true,
                 // I don't want createdAt
                createdAt: 'created_at',
                updatedAt: 'updated_at',

                 // don't delete database entries but set the newly added attribute deletedAt
                 // to the current date (when deletion was done). paranoid will only work if
                 // timestamps are enabled
                 //paranoid: true,
               
                 // don't use camelcase for automatically added attributes but underscore style
                 // so updatedAt will be updated_at
                 underscored: true,
               
                 // disable the modification of table names; By default, sequelize will automatically
                 // transform all passed model names (first parameter of define) into plural.
                 // if you don't want that, set the following
                 freezeTableName: true,
               
                 // define the table's name
                 tableName: 'callers',
                 sequelize,

            }      
    )
       
    }
    static associate(models) {
        this.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member'})
        this.belongsTo(models.Queue, { foreignKey: 'queue_id', as: 'queue'})
        this.hasMany(models.Attemp,{ foreignKey: 'caller_uid',  as: 'attemps'})
        
    }

}

module.exports = Caller;