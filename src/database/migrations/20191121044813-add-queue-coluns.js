'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('queues','weight ', {
      type: Sequelize.STRING, 
      allowNull:false      
  })
 return queryInterface.addColumn('queues','max ', {
    type: Sequelize.STRING, 
    allowNull:false      
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
