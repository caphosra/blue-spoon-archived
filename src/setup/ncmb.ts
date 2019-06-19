var appKey: string;
var clientKey: string;

var ncmb: INCMB | undefined = undefined;

function initalizeNCMB(): INCMB | undefined{
    if(ncmb){
        return ncmb;
    }
    
    let params = libGetParams();
    appKey = params["ak"];
    clientKey = params["ck"];

    if(appKey && clientKey){
        ncmb = new NCMB(appKey, clientKey) as INCMB;
        return ncmb;
    }

    appKey = Cookies.get("bs_apikey");
    clientKey = Cookies.get("bs_clientkey");

    if(appKey && clientKey){
        ncmb = new NCMB(appKey, clientKey) as INCMB;
        return ncmb;
    }

    console.error("COULDN'T FIND AN APP KEY AND AN CLIENT KEY !");

    return undefined;
}
