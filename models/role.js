const Sequelize = require('sequelize')
const db = require('../util/database')

const Role = db.define(
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

module.exports = Role
