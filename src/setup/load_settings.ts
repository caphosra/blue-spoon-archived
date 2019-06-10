function loadSettings(): Promise<CookieContent>{

    var promise = new Promise<CookieContent>((resolve: (value: CookieContent) => void, reject: (reason: string) => void) => {
        const cookie = eval("Cookies") as ICookieControl;
    
        var json = cookie.get("bluespoon_setting");

        if(json == undefined){
            reject("Not found.");
        }

        var content = JSON.parse(json) as CookieContent;
        resolve(content);
    });
    
    return promise;
}
