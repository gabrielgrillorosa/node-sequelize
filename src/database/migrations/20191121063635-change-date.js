'use strict'

module.exports = {
 up(queryInterface, Sequelize) {
  return queryInterface.createTable('statistics', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    queue_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'queues', key: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    completed: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    abandoned: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    talktime: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    holdtime: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    SL: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    SLPerf: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })
},
 down(queryInterface, Sequelize) {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.dropTable('users');
  */
  return queryInterface.dropTable('statistics');
}
}