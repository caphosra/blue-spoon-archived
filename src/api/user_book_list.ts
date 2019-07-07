module BookList{
    const update_list_button_id = "update_list_button";
    const add_book_button_id = "add_book_button";

    export function MakeBook(){
        var book_name = window.prompt("Input your book name", "");
    
        if(book_name){
            let newRecord = NCMBWrap.CreateNewData("BookList") as IBookItem;
            newRecord.name = book_name;
            newRecord.save();
        }
    
        UpdateBookList();
    }
    
    export function UpdateBookList(){
        let bookListTable = NCMBWrap.DataStore("BookList");
    
        bookListTable.fetchAll()
            .then(function(res){
                let tableElement = document.getElementById("book_list");
    
                if(tableElement){
                    tableElement.innerHTML = "";
                    
                    for(let item of res){
                        let bookItem = item as IBookItem;

                        let clickEvent = `PageLocation.JumpToPageWithBookName('${PageLocation.book_item}', '${bookItem.name}');`;
                        tableElement.innerHTML += `<a href="#" name="book_item_link" onclick="${clickEvent}">${bookItem.name}</a><br/>`;
                    }
                }
            })
            .catch(function(err){
                console.error(err);
            });
    }

    export module Event{
        export function OnLoad(){
            let update_list_button = document.getElementById(update_list_button_id);
            if(update_list_button){
                update_list_button.onclick = OnUpdateListButtonClicked;
            }

            let add_book_button = document.getElementById(add_book_button_id);
            if(add_book_button){
                add_book_button.onclick = OnAddBookButtonClicked;
            }

            UpdateBookList();
        }

        function OnUpdateListButtonClicked(){
            UpdateBookList();
        }
        function OnAddBookButtonClicked(){
            MakeBook();
        }
    }
}

OnLoadWrap.AddToOnLoadIf(PageLocation.book_list, BookList.Event.OnLoad);
