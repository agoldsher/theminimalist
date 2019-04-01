const handleFormSubmit = event => {
    if (e.preventDefault) e.preventDefault();
}

$("#login").on("submit",function(event){
    event.preventDefault()
    $("#loginFailedMessage").hide()

    let login={}
    //process the form
    $("form").find("input").each(function(){
        login[$(this).attr("id")]=$(this).val()
    })
    console.log(login)
    let user={user:login}

    $.ajax({
        type:"POST",
        url:"/api/users/login",
        data:user
    }).then(function(data){
        console.log(data)

        //TODO store token in local storage for use in every request
        localStorage.setItem("theMinimalistLogin",JSON.stringify(data));

        //Now get the actual page using this token.
        userdata=JSON.parse(localStorage.getItem("theMinimalistLogin"))
        $.ajax({
            url:'/',
            headers:{"Authorization":`Token ${userdata.user.token}`},
            method: 'GET'
        }).then(data=>{
            console.log(data)
            
        });
    }).catch(function(err){
        // console.log("That failed. Epicly.")
        console.log(err)
        $("#loginFailedMessage").show()
        // flash to the user that the login failed
    })

})