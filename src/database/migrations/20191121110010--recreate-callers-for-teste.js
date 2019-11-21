'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.dropTable('callers')
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
     });
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
