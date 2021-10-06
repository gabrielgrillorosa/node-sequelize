'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('members', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        caller_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'callers', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        calls_taken: {
          type: Sequelize.INTEGER
        },
       created_at:{
         type: Sequelize.DATE,
         allowNull: false
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
   return queryInterface.dropTable('members');
  }
};
