const express = require('express');
const router = express.Router();
const db = require('../db');
const adminGuard = require('../middleware/admin-guard');

adminGuard(router);

//建立產品路由
router.get('/create',function(req,res,next){
    res.render('create');
});

//編輯產品路由
router.get('/edit/:pid', async function(req,res,next){
    const pid = req.params.pid;
    // console.log("pid",pid)
    const doc =  await db.doc(`productList/${pid}`).get()
    // console.log("doc",doc)
    const product = doc.data();
    product.id = doc.id;
    res.locals.product = product;
    // console.log(typeof product,"$$$$$$$$$$$$product",product)
    res.render('edit');
})



module.exports = router;