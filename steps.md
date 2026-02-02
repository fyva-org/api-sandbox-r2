# API Implementation Tasks

### Core Functionality
- [ `GET` ] Create a route to retrieve all orders.
    - Add Option for pagination.
- [ `POST` ] Create a POST route →
    - Validate incoming data → Use a package if required.

### Caching
- Use redis and add a caching layer.
    - Only for the GET request
    - Cache invalidation / handling not required. Basic TTL sufficient.

### Error handling
- Add basic error handling.

### Performance & Security
- Add rate limiter (in the micro-service itself)
    - You may use a package.


