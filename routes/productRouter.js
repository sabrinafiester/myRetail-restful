const express = require('express');
const Price = require('../models/priceModel');
const bodyParser = require('body-parser');
const productRouter = express.Router();
const fetch = require('node-fetch');

productRouter.use(bodyParser.json());
productRouter.route('/')
  .get((req, res) => {
    Price.find(function (err, prices) {
      if (err) return console.error(err);
      res.priceObject(prices);
    })
  })
  .post((req, res) => {
    let price = new Price(req.body);
    price.save();
    res.status(201).send(price)
  });

productRouter.route('/:id')
.get(getPriceData, getProductData, (req, res) => {
  const product = req.productObject;
  const price = req.priceObject;
  const newProduct = {
    id: product.item.tcin,
    title: product.item.product_description.title || '',
    buy_url: product.item.buy_url || '',
    dpci: product.item.dpci || '',
    upc: product.item.upc || '',
    currentPrice: price.currentPrice || 0,
    formattedCurrentPrice: price.formattedCurrent || '',
    listPrice: price.listPrice || 0,
    formattedListPrice: price.formattedList || '',
    saveDollar: price.saveDollar || 0,
    savePercent: price.savePercent || ''
  };
  res.send(newProduct);
})
.put((req, res) => {
  Price.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(price => {
      if (!price) {
        return res.status(404).send({
          message: "Id not found: " + req.params.id
        });
      }
      res.send(price);
    });
});

function getPriceData(req, res, next){
  Price.findById(req.params.id, function (err, prices) {
    if (err) return res.send(err);
    req.priceObject = prices;
    next();
  });
}

function getProductData(req, res, next){
  const tcin = req.params.id;
  const reqUrl = "https://redsky.target.com/v2/pdp/tcin/" + tcin + "?excludes=taxonomy,promotion,esp,deep_red_labels,available_to_promise_network,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics"
  fetch(reqUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      req.productObject = jsonResponse.product;
      next();
    })
}

module.exports = productRouter;