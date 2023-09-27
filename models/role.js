'use strict'

const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  const Role = sequelize.define(
    'role',
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING
    },
    {
      timestamps: false,
      hooks: {
        afterSync: () => {
          try {
            Role.create({
              id: '8dcc49a6-4ef4-11ee-be56-0242ac120002',
              name: 'admin'
            })

            Role.create({
              id: '7e5916de-4ef9-11ee-be56-0242ac120002',
              name: 'agent'
            })
          } catch (err) {
            console.error(err)
          }
        }
      }
    }
  )

  return Role
}
