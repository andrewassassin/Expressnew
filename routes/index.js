var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET home page. */
router.get('/',async function(req, res, next) {
  const productList= [];
  const collection = await db 
  .collection("productList")
  .orderBy("createdAt","desc")
  .get()


  console.log("collection",collection)
  
  collection.forEach(doc=> {
    const product = doc.data();
      product.id = doc.id;
    productList.push(product)

  });

  res.locals.productList = productList;


  res.render('index');
});

module.exports = router;
