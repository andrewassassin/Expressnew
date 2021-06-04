const admin = require('../firebase')
const db= require('../db')


function loginChecker(router){
    router.use(function(req,res,next){
        console.log("終端機訊息",req.method, req.url);
        console.log("進入檢查站")
        const cookieName = 'ession';
        console.log("req.cookies%%%%%%",req.cookies)
        const sessionCookie = req.cookies[cookieName] || '';
        console.log("驗證sessionCookie",sessionCookie)
        const auth ={
            isAdmin:false,
            isLogin:false,
            user :null
        }
        admin
        .auth()
        .verifySessionCookie(sessionCookie, true )
        .then(async user => {
         console.log("驗證成功",user)
         const email = user.email;
         auth.isLogin = true;
         auth.user = user;
         const adminDoc = await db.doc(`adminList/${email}`).get()
            // 如果文件存在
        if(adminDoc.exists){
            // 此人為管理者
            auth.isAdmin = true;
        }
         res.locals.auth = auth;
         console.log("驗證成功要call next")
         next();
      
        })
        .catch(err => {
         console.log(err)
         res.locals.auth = auth;
         console.log("驗證失敗要call next")
         next();
         })
        } )
}


module.exports = loginChecker;