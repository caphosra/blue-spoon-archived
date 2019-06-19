function loadSettings(): Promise<SettingsContent>{

    var promise = new Promise<SettingsContent>((resolve: (value: SettingsContent) => void, reject: (reason: string) => void) => {
        let json = Cookies.get("bluespoon_setting");

        if(json == undefined){
            reject("Not found.");
        }

        var content = JSON.parse(json) as SettingsContent;
        resolve(content);
    });
    
    return promise;
}
