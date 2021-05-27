
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