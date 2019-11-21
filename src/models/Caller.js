const { Model, DataTypes } = require('sequelize')
const Queue = require ('./Queue')
const moment = require('moment')

class Caller extends Model {
    static init(sequelize){
        super.init({
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: moment("2016-25") 
                
            },
            status: DataTypes.INTEGER,
            uid: { 
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false,
                unique: true
            },
            chan: DataTypes.STRING,
            position: DataTypes.INTEGER,
            member_id: DataTypes.INTEGER,
            queue_id: DataTypes.INTEGER,
            }, {sequelize}      
    )
       
    }
    static associate(models) {
        this.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' })
        this.belongsTo(models.Queue, { foreignKey: 'queue_id', as: 'queue' })

    }

}
module.exports = Caller;