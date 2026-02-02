const Sequelize = require('sequelize');
const db = require('./index');

const TestQuery = async () => {
  const results = await db.sequelize.query(`
    SELECT * from products`, {
    type: Sequelize.QueryTypes.SELECT,
    logging: true
  });
}

TestQuery();