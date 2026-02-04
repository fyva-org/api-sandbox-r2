const {Sequelize,DataTypes} = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
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
    }

  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
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
  });
};

