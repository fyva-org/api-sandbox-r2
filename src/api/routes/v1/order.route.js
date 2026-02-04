const express = require("express");

const controller = require("../../controllers/order.controller");
const validate = require("express-validation");

const {
  getOrders,
  createOrder,
} = require("../../validations/order.validation");

const { limiter } = require("../../../config/rate-limit");

const router = express.Router();

router.route("/get-all").get(limiter, controller.getAllOrders);

router
  .route("/createOrder")
  .post(validate(createOrder), limiter, controller.createOrder);

router.route("/get-all-redis").get(limiter, controller.getAllOrdersAndRedis);

module.exports = router;
