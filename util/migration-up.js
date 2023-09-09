const sequelize = require("./database");

const roleQuery = `
CREATE TABLE IF NOT EXISTS role(id UUID PRIMARY KEY, name STRING)

INSERT INTO role(id,name) VALUES ('8dcc49a6-4ef4-11ee-be56-0242ac120002','admin');
INSERT INTO role(id,name) VALUES ('7e5916de-4ef9-11ee-be56-0242ac120002','agent');
`;

const runInitDbValues = async () => {
  //   await sequelize.query(roleQuery, { raw: true });
};

module.exports = runInitDbValues;
