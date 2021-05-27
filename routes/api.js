const express = require('express');
const router = express.Router();
const db = require("../db");

// 新增商品
router.post('/create',  function(req,res,next){
    console.log('[準備新增商品]');
    const product = req.body;
    console.log("前端送來的資料", product)
     db.collection("productList").add(product)
    res.status(200).json({
        msg:"ok",
        productName: product.name
    })
})

// 更新商品
router.put('/product/edit/:pid',async function(req,res,next){
    const product = req.body;
    const pid =req.params.pid;
    console.log("前端送來的資料", product)
    const doc = await db.doc(`productList/${pid}`).update(product)
    console.log("doc%%%%%%%%%%",doc)
    res.status(200).json({
        msg:"Updated",
    })
})


// 刪除商品
router.delete('/:pid', async function (req, res, next) {
    console.log('[準備刪除商品]');
    console.log('[pid]', req.params.pid);
    const pid = req.params.pid;
    await db.doc(`productList/${pid}`).delete();
    res.status(200).json({
        msg: "Deleted!"
    });
});

module.exports = router;