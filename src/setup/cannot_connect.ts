function onCannotConnectToNCMB(){
    var result = window.confirm("Retry to connect NCMB");

    if(result){
        location.reload(true);
    }
    else{
        location.href = "cannot_connect.html";
    }
}
