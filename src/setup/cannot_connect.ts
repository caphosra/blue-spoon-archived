const CANNOT_CONNECT_HTML_PATH = "./cannot_connect.html";

function onCannotConnectToNCMB(){
    var result = window.confirm("Retry to connect NCMB ?");

    if(result){
        location.reload(true);
    }
    else{
        location.href = CANNOT_CONNECT_HTML_PATH;
    }
}
