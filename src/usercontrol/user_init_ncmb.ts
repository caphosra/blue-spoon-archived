var ncmb: INCMB | undefined = undefined;

window.onload = userInitNCMB;

function userInitNCMB(): void{
    var promise = initNCMB();

    promise
        .then(value => {
            ncmb = value;
        })
        .catch(value => {
            console.error(value);

            var APIKey = window.prompt("Input your API key", "");
            if(APIKey != undefined){
                var clientKey = window.prompt("Input your Client key", "");
                if(clientKey != undefined){
                    //
                    // Save new settings
                    //
                    var content = new CookieContent(APIKey, clientKey);

                    saveSettings(content);

                    ncmb = generateNCMB(APIKey, clientKey);
                }
                else{
                    console.log("Canceled");
                    ncmb = undefined;

                    onCannotConnectToNCMB();
                }
            }
            else{
                console.log("Canceled");
                ncmb = undefined;

                onCannotConnectToNCMB();
            }
        });
}