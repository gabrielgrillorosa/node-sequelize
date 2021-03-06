'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('member_queues', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'members', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      queue_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'queues', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
   return queryInterface.dropTable('member_queues');
  }
};
