const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_items', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    transition_status: {
      type: DataTypes.ENUM("IN_TARNSIT","DELEVIRED","CANCELLED","CREATED","PENDING","COMPLETED","FAILED"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_items',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "fki_order_item_product_key",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fki_order_items_order_key",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "order_items_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
