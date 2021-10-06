const { Model, DataTypes } = require('sequelize')
const Caller = require ('./Caller')
const Member = require ('./Member')

class Attemp extends Model {
    static init(sequelize){
        super.init({
            id: { 
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false              
            },
            status: DataTypes.STRING,
            caller_uid: DataTypes.STRING,
            member_id: DataTypes.INTEGER,
            
            }, {
                 timestamps: true,
                 // I don't want createdAt
                createdAt: 'created_at',
                updatedAt: false,

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
                 tableName: 'attemps',
                 sequelize,

            }      
    )
       
    }
    static associate(models) {
        this.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member'})
        this.belongsTo(models.Caller, { foreignKey: 'caller_uid', as: 'caller'}) 
    }

}

module.exports = Attemp;