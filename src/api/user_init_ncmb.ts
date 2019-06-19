var ncmb: INCMB | undefined = undefined;

function userInitNCMB(): void{
    var ncmb = initalizeNCMB();
    if(!ncmb){
        onCannotConnectToNCMB();
    }
}
