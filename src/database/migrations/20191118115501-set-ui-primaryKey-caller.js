'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // queryInterface.removeColumn('callers','uid');
    queryInterface.addColumn('callers','uid', {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        unique: true
    })
   return  queryInterface.addConstraint('callers',['uid'], {
      type: 'primary key'
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
