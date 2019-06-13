function saveSettings(content: CookieContent){
    const cookie = eval("Cookies") as ICookieControl;

    var json = JSON.stringify(content);

    cookie.set("bluespoon_setting", json);
}