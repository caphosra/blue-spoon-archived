function saveSettings(content: SettingsContent){
    let json = JSON.stringify(content);

    Cookies.set("bluespoon_setting", json);
}