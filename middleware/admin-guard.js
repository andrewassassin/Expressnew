// 設置管理者路由守衛
function adminGuard(router){
    router.use(function(req,res,next){
        const isAdmin = res.locals.auth.isAdmin;
        if(isAdmin){
            next();
        }else {
            // 強制轉回首頁
            res.redirect("/");
        }
    })
}

module.exports = adminGuard;