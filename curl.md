Get orders with pagination
http://localhost:3000/orders/get-all-orders?page=2&limit=1

Get all the orders
http://localhost:3000/orders/get-all-orders

Post/create the orders
http://localhost:3000/orders/create

Body:
{
"user_id": 1,
"payment_status": "PENDING",
"order_value": 0
}
