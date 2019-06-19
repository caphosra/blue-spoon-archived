var global_book_name: string | undefined = undefined;

function userInitBookName(){
    let params = libGetParams();
    let book_name = params["bn"];

    if(!book_name){
        console.error("BOOK NAME IS NULL !");
    }
    else{
        global_book_name = book_name;
    }
}

function userSetBookNameToElement(){
    let elem = document.getElementById("book_name_content");
    if(elem && global_book_name){
        elem.innerHTML = global_book_name;
    }
}
