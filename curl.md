curl --location 'http://localhost:5432/v1/orders/get-all-redis' \
--header 'Content-Type: application/json'

curl --location 'http://localhost:5432/v1/orders/createOrder' \
--header 'Content-Type: application/json' \
--data '{
    "id": 48,
    "user_id": 15,
    "payment_status": "PAID",
    "order_value": "9.99"
}'

curl --location 'http://localhost:5432/v1/orders/get-all-redis' \
--header 'Content-Type: application/json'