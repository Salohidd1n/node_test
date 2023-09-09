const Sequelize = require("sequelize");
const db = require("../util/database");

const User = db.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    first_name: Sequelize.STRING,
    second_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    thumb: Sequelize.STRING,
    role: Sequelize.UUID,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()")
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("NOW()")
    }
  },
  {
    timestamps: true
  }
);

module.exports = User;
