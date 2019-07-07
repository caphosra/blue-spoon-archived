module BookItem{
    export let book_name: string | undefined = undefined;

    function InitBookName(){
        let params = HTMLQuery.GetParams();
        book_name = params["bn"];

        if(!book_name){
            console.error("BOOK NAME IS NULL !");
        }
    }
    function SetBookNameToElement(){
        let elem = document.getElementById("book_name_content");
        if(elem && book_name){
            elem.innerHTML = book_name;
        }
    }

    export module Event{
        export function OnLoad(){
            InitBookName();
            SetBookNameToElement();
        }
    }
}

OnLoadWrap.AddToOnLoadIf(PageLocation.book_item, BookItem.Event.OnLoad);
