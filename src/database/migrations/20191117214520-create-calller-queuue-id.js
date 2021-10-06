'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn ('callers', 'queue_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'queues', key: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('callers','queue_id')

  }
};
