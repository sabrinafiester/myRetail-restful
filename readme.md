## myRetail RESTful API
    Price and product API utilizing mongoDB data store and redsky API

    GET /products/{id} returns product with price information
    PUT /products/{id} updates price information for specified product using json request body
    GET /products returns price information for all products (not paginated or limited at this time)
    POST /products creates  price object using json request body

### Instructions

Install required packages

    npm install 

Run server 

    npm start 

Visit `http://localhost:3000/products` for the API root.