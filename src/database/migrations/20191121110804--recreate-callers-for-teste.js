'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.dropTable('callers');
      return queryInterface.createTable('callers', {
         uid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoincrement: false,
          allowNull: false,
          unnique: true
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
       chan: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       position: {
        type: Sequelize.STRING,
        allowNull: false
       },
       created_at:{
         type: Sequelize.DATE,
         timestamp: false,
         allowNull: false,
         unnique: true

       },
       updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }    
     },{
     timestamps: false,
                 

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
    
     
     
     
      } );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('callers');
  }
};
