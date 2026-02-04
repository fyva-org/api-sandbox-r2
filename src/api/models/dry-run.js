const Sequelize = require('sequelize');
const db = require('./index');
const Orders = require('./orders');

const TestQuery = async () => {
  const results = await db.sequelize.query(`
    SELECT * from products`, {
    type: Sequelize.QueryTypes.SELECT,
    logging: true
  });

  console.log('results')
  console.log(results)
}

Orders.sync();

TestQuery();