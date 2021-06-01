const admin = require('../firebase')


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
        .then(user => {
         console.log("驗證成功",auth)
         auth.isLogin = true;
         auth.user = user;

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