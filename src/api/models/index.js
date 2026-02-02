const Sequelize = require('sequelize');
const path = require('path');

require('dotenv-safe').config({
  path: path.join(__dirname, '../../../.env'),
  example: path.join(__dirname, '../../../.env.example'),
  allowEmptyValues: true
});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  dialectModule: require("pg")
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order_items     = require('./order_items')(sequelize, Sequelize);
db.orders   = require('./orders')(sequelize, Sequelize);
db.products    = require('./products')(sequelize, Sequelize);
db.users      = require('./users')(sequelize, Sequelize);


// db.users.hasMany(db.<table_name>, { foreignKey: 'user_id' });


// db.quotes.belongsToMany(db.tags, {
//   through: '<table>',
//   foreignKey: '<>',
//   otherKey: '<>'
// });

module.exports = db;




