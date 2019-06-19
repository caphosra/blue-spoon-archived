function userMakeBook(){
    var book_name = window.prompt("Input your book name", "");

    if(book_name){
        var bookList = makeBookListInstance(book_name);
        if(bookList){
            bookList.save();
        }
    }

    userUpdateBookList();
}

function userUpdateBookList(){
    let bookListTable = getDataTable("BookList");
    
    if(!bookListTable){
        return;
    }

    bookListTable.fetchAll()
        .then(function(res){
            let tableElement = document.getElementById("book_list");

            if(tableElement != null){
                tableElement.innerHTML = "";

                for(let i = 0; i < res.length; i++){
                    let bookItem = res[i] as IBookItem;

                    tableElement.innerHTML += `<a href="#" onclick="userOpenBook('${bookItem.name}');">${bookItem.name}</a><br/>`;
                }
            }
        })
        .catch(function(err){
            console.error(err);
        });
}

function userOpenBook(book_name: string){
    location.href = `./book_item.html?ak=${appKey}&ck=${clientKey}&bn=${book_name}`;
}
