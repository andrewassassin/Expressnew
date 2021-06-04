const express = require('express');
const router = express.Router();
const db = require("../db");
const admin = require("../firebase")

// 登入
router.post('/login', function (req, res, next) {
    // console.log('[準備登入]');
    // console.log('[前端送來的資料]', req.body);
    // Create session cookie
    // https://firebase.google.com/docs/auth/admin/manage-cookies#create_session_cookie
    // TODO: 取得前端傳來的使用者 idToken
    const idToken = req.body.idToken;
    console.log('[前端傳來的idToken]', idToken);
    // 有效期間
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // 建立 Session Cookie
    admin.auth().createSessionCookie(idToken, { expiresIn })
        .then(sessionCookie => {
            // console.log("[sessionCookie]", sessionCookie);
            // cookie選項
            const options = {
                maxAge: expiresIn,
                httpOnly: true
            };
            // res.cookie(Cookie名稱, 資料, 選項)
            res.cookie("ession", sessionCookie, options);
            res.status(200).json({
                msg: "Login!"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// 登出
router.post('/logout', function (req, res, next) {
    // Sign Out
    // https://firebase.google.com/docs/auth/admin/manage-cookies#sign_out
    const cookieName = "ession";
    const sessionCookie = req.cookies[cookieName] || '';
    // 清除指定cookie
    res.clearCookie(cookieName);
    // 驗證sessionCookie
    admin.auth().verifySessionCookie(sessionCookie)
        .then(user => {
            // 讓Firebase Sever知道此人的sessionCookie是無效的
            admin.auth().revokeRefreshTokens(user.sub)
            res.status(200).json({ msg: "Logout!" })
        })
        .catch(err => {
            res.status(200).json({ msg: 'Logout' })
        });
});

// 新增商品
router.post('/create',  function(req,res,next){
    // console.log('[準備新增商品]');
    const product = req.body;
    // console.log("前端送來的資料", product)
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
    // console.log("前端送來的資料", product)
    const doc = await db.doc(`productList/${pid}`).update(product)
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