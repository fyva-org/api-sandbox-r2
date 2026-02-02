const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
autoIncrement :true   },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    payment_status: {
      type: DataTypes.ENUM("PENDING","PAID","CANCELLED","FAILED"),
      allowNull: true
    },
    order_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    createdAt: false,
    updatedAt: false

  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    // timestamps: true,
    indexes: [
      {
        name: "fki_order_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  },{
    timestamps: false
  })
};
