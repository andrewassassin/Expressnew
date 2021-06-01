const admin = require('../firebase')
const db= require('../db')


function loginChecker(router){
    router.use(function(req,res,next){
        console.log("進入檢查站")
        const cookieName = 'ession';
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
         next();
      
        })
        .catch(err => {
         console.log(err)
         res.locals.auth = auth;
         next();
         })
        } )
}


module.exports = loginChecker;