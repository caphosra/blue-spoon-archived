function userMakeBook(){
    var book_name = window.prompt("Input your book name", "");

    if(book_name != undefined){
        var bookList = makeBookListInstance(book_name);
        if(bookList != undefined){
            bookList.save();
            return;
        }
    }
}

function userUpdateBookList(){
    let bookListTable = getDataTable("BookList");
    
    if(bookListTable == undefined){
        return;
    }

    bookListTable.fetchAll()
        .then(function(res){
            let tableElement = document.getElementById("book_list");

            if(tableElement != null){
                tableElement.innerHTML = "";

                for(let i = 0; i < res.length; i++){
                    let bookItem = res[i] as IBookItem;

                    tableElement.innerHTML += `${bookItem.name}<br/>`;
                }
            }
        })
        .catch(function(err){
            console.error(err);
        });
}
