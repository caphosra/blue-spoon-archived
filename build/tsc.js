"use strict";
class CookieContent {
    constructor(APIKey, clientKey) {
        this.APIKey = APIKey;
        this.ClientKey = clientKey;
    }
}
class BookList {
    constructor(data) {
        this.name = "";
        this.data = data;
    }
    save() {
        this.data.set("name", this.name)
            .save()
            .then(function (data) {
            console.log("Save Successfully");
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    delete() {
        this.data.delete()
            .then(function (val) {
            console.log("Delete Successfully");
        })
            .catch(function (err) {
            console.error(err);
        });
    }
}
function getDataTable(name) {
    if (ncmb != undefined) {
        let dataTable = ncmb.DataStore(name);
        return dataTable;
    }
    return undefined;
}
function makeDataTableInstance(name) {
    if (ncmb != undefined) {
        let SomeClass = ncmb.DataStore(name);
        let dataTableInstance = new SomeClass();
        return dataTableInstance;
    }
    return undefined;
}
function makeBookListInstance(bookName) {
    let bookListData = makeDataTableInstance("BookList");
    if (bookListData != undefined) {
        let list = new BookList(bookListData);
        list.name = bookName;
        return list;
    }
    return undefined;
}
function makeInstance(className, args) {
    let args_str = "";
    for (let index = 0; index < args.length; index++) {
        if (index != 0)
            args_str += ",";
        args_str += `args[${index}]`;
    }
    return eval(`new ${className}(${args_str})`);
}
function onCannotConnectToNCMB() {
    var result = window.confirm("Retry to connect NCMB");
    if (result) {
        location.reload(true);
    }
    else {
        location.href = "cannot_connect.html";
    }
}
function loadSettings() {
    var promise = new Promise((resolve, reject) => {
        const cookie = eval("Cookies");
        var json = cookie.get("bluespoon_setting");
        if (json == undefined) {
            reject("Not found.");
        }
        var content = JSON.parse(json);
        resolve(content);
    });
    return promise;
}
function initNCMB() {
    var promise = new Promise((resolve, reject) => {
        loadSettings()
            .then(value => {
            var ncmb = generateNCMB(value.APIKey, value.ClientKey);
            if (ncmb != undefined) {
                resolve(ncmb);
            }
            else {
                reject("NCMB is undefined");
            }
        })
            .catch(value => {
            reject(value);
        });
    });
    return promise;
}
function generateNCMB(APIKey, clientKey) {
    return eval(`new NCMB(\"${APIKey}\", \"${clientKey}\")`);
}
function saveSettings(content) {
    const cookie = eval("Cookies");
    var json = JSON.stringify(content);
    cookie.set("bluespoon_setting", json);
}
function userMakeBook() {
    var book_name = window.prompt("Input your book name", "");
    if (book_name != undefined) {
        var bookList = makeBookListInstance(book_name);
        if (bookList != undefined) {
            bookList.save();
            return;
        }
    }
}
function userUpdateBookList() {
    let bookListTable = getDataTable("BookList");
    if (bookListTable == undefined) {
        return;
    }
    bookListTable.fetchAll()
        .then(function (res) {
        let tableElement = document.getElementById("book_list");
        if (tableElement != null) {
            tableElement.innerHTML = "";
            for (let i = 0; i < res.length; i++) {
                let bookItem = res[i];
                tableElement.innerHTML += `${bookItem.name}<br/>`;
            }
        }
    })
        .catch(function (err) {
        console.error(err);
    });
}
var ncmb = undefined;
window.onload = userInitNCMB;
function userInitNCMB() {
    var promise = initNCMB();
    promise
        .then(value => {
        ncmb = value;
    })
        .catch(value => {
        console.error(value);
        var APIKey = window.prompt("Input your API key", "");
        if (APIKey != undefined) {
            var clientKey = window.prompt("Input your Client key", "");
            if (clientKey != undefined) {
                //
                // Save new settings
                //
                var content = new CookieContent(APIKey, clientKey);
                saveSettings(content);
                ncmb = generateNCMB(APIKey, clientKey);
            }
            else {
                console.log("Canceled");
                ncmb = undefined;
                onCannotConnectToNCMB();
            }
        }
        else {
            console.log("Canceled");
            ncmb = undefined;
            onCannotConnectToNCMB();
        }
    });
}
