function initNCMB(): Promise<INCMB>{
    var promise = new Promise<INCMB>((resolve: (value: INCMB) => void, reject: (value: string) => void) => {
        loadSettings()
            .then(value => {
                var ncmb = generateNCMB(value.APIKey, value.ClientKey);
                if(ncmb != undefined){
                    resolve(ncmb);
                }
                else{
                    reject("NCMB is undefined");
                }
            })
            .catch(value => {
                reject(value);
            });
    });

    return promise;
}

function generateNCMB(APIKey: string, clientKey: string): INCMB | undefined{
    return eval(`new NCMB(\"${APIKey}\", \"${clientKey}\")`) as INCMB;
}
