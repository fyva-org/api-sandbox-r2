
const { sequelize } = require('../models');

const {getFromRedis, setToRedis} = require('../../config/redisFunction');

exports.getAllOrders = async (req, res, next) => {
    try {

        // check in redis cache first



        let orders = await sequelize.models.orders.findAll()
        let limit = req.query.limit;
        let offset = req.query.offset;

        if (limit) {
            orders.limit = limit;
        }
        if (offset) {
            orders.offset = offset;
        }

        let results = {
            count: orders.length,
            rows: orders
        }
        return res.json(results);
    } catch (error) {
        next(error);
    }
};


exports.createOrder = async (req, res, next) => {
    try {

        if (!req.body.id || !req.body.user_id || !req.body.payment_status || !req.body.order_value) {
            return res.status(400).json({ message: "All fields are required: id, user_id, payment_status, order_value" });
        }
        const orderData = {
            id: req.body.id,
            user_id: req.body.user_id,
            payment_status: req.body.payment_status,
            order_value: req.body.order_value,
        };
        const existingOrder = await sequelize.models.orders.findOne({ where: { id: orderData.id } });
        if (existingOrder) {
            return res.status(409).json({ message: "Order with the given ID already exists." });
        }

        const newOrder = await sequelize.models.orders.create(orderData);
        return res.status(201).json(newOrder);
    }
    catch (error) {

        next(error);
    }
}


exports.getAllOrdersAndRedis = async (req, res, next) => {
    try {
        const cacheKey = 'all_orders';
        const cachedOrders = await getFromRedis(cacheKey);

        if (cachedOrders) {
            console.log('Serving from Redis cache');
            return res.json(JSON.parse(cachedOrders));
        }

        let orders = await sequelize.models.orders.findAll();
        let limit = req.query.limit;
        let offset = req.query.offset;

        if (limit) {
            orders.limit = limit;
        }
        if (offset) {
            orders.offset = offset;
        }

        let results = {
            count: orders.length,
            rows: orders
        };

        // Cache the results in Redis for 1 hour
        await setToRedis(cacheKey, JSON.stringify(results), 3600);

        return res.json(results);

    } catch (error) {
        next(error);
    }
};