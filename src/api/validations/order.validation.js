const Joi = require('joi');

module.exports = {
  // POST /v1/orders
  createOrder: {
    body: {
      id: Joi.number().required(),
      user_id: Joi.number().required(),
      payment_status: Joi.string().valid('PENDING', 'PAID', 'FAILED', 'CANCELLED').required(),
      order_value: Joi.number().precision(2).required(),
    },
  },
};