
$(".delete-btn").click(function(e){
    e.preventDefault();
  
      const pid =this.dataset.id;
     console.log("pid",pid)
      axios
      .delete(`/api/${pid}`,{})
      .then(res =>{
        console.log("成功刪除",res)
        window.location="/"
     })
      .catch(err =>{
       console.log(err)
     })
    })

 function finalizeFrontEndLogin(response) {  
      // 取得idToken
   response.user.getIdToken()
   .then(
     idToken=>{
       console.log("idtoken",idToken)
       const data ={idToken}
       axios.post('/api/login',data)
       .then(res=>{
        window.location.reload()
         console.log("後端傳回的資料",res)
       })
       .catch(err =>{
         console.log(err)
       })
     }
   )
   .catch(err =>{
     console.log(err)
   })
  }


// 註冊表單送出時
$('#signUpForm').submit(function (event) {
  event.preventDefault();
  const email = $('#signUpEmail').val(),
      password = $('#signUpPassword').val();
  console.log('[開始註冊]', { email: email, password: password });
 
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
  console.log("註冊成功",res);
  finalizeFrontEndLogin(res)
    // ...
  })
  .catch(err => {
   console.log("註冊失敗",err.code);
  });
})

// 登入表單送出時
$('#loginForm').submit(function (event) {
  event.preventDefault();
  const email = $('#loginEmail').val(),
      password = $('#loginPassword').val();
  console.log('[開始登入]', { email: email, password: password });
  // TODO: 處理登入流程
  // https://firebase.google.com/docs/auth/web/start#sign_in_existing_users
  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
          console.log('[登入成功]', response);
          finalizeFrontEndLogin(response)
      })
      .catch(function (error) {
          console.log('[登入失敗]', error);
          alert('密碼錯誤');
      });
})

// 登出按鈕點擊時
$('#logoutBtn').click(function () {
  console.log('[開始登出]');
  // TODO: 處理登出流程
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout
  firebase
      .auth()
      .signOut()
      .then(function () {
          console.log('[登出成功]');
          axios.post('/api/logout', {})
              .then(function () {
                  window.location = '/'
              })
              .catch(function () {
                  window.location = '/'
              });
      })
      .catch(function (error) {
          console.log('[登出失敗]', error);
          window.location = '/'
      });
});

// 密碼強度驗證
var oPassword = document.getElementById("loginPassword");
var oDiv = document.getElementById("intension");
var nodes = oDiv.getElementsByTagName("div");

oPassword.onkeyup = function() {
    var xValue = oPassword.value;
        for(var i = 0; i < nodes.length; i++){
            nodes[i].className = '';
            }
            if(/\d/.test(xValue) && /[a-z]/.test(xValue) && /[A-Z]/.test(xValue)){ 
            nodes[2].className = "active";   
            } else if(/^\d+$/.test(xValue) || /^[A-Z]+$/.test(xValue) || /^[a-z]+$/.test(xValue)){   
            nodes[0].className = "active";  
            } else{   
            nodes[1].className = "active";  
        }
}
    