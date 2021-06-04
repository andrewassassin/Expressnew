var express = require('express');
var router = express.Router();
const db = require('../db');
const loginchecker = require('../middleware/login-checker')

loginchecker(router)


/* GET home page. */
router.get('/',async function(req, res, next) {
  console.log("這裡是router get/")
  const productList= [];
  const collection = await db 
  .collection("productList")
  .orderBy("createdAt","desc")
  .get()


  // console.log("collection",collection)
  
  collection.forEach(doc=> {
    const product = doc.data();
      product.id = doc.id;
    productList.push(product)

  });

  res.locals.productList = productList;


  res.render('index');
});

module.exports = router;
