const { Model, DataTypes } = require('sequelize')


class MemberQueue extends Model {
    static init(sequelize){
        super.init({
           
       },
        {
            sequelize,
          
        
        }
        
       
    )
    
}

    static associate(models) {

        
    }
}
module.exports = MemberQueue;