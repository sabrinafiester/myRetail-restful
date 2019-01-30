const express        = require('express');
const mongoose 		 = require("mongoose");
const bodyParser     = require('body-parser');
const productRouter  = require('./routes/productRouter');
const app 			 = express();
const port 			 = process.env.PORT || 3000;
// Connecting to the database
const db = mongoose.connect("mongodb://localhost:27017/my-retail");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productRouter);

// Running the server
app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
