module PageLocation{
    export const book_item = "./book_item.html";
    export const book_list = "./book_list.html";
    export const index = "./index.html";
    export const cannnot_connect = "./cannnot_connect.html";

    let current_file: string | undefined;
    
    export function GetCurrentFile(): string{
        if(!current_file){
            let filename_with_query = window.location.pathname.split("/").pop();
            if(filename_with_query){
                let file_name = filename_with_query.split("?").shift();
                current_file = `./${file_name}`;
            }
        }

        if(current_file){
            return current_file;
        }
        else{
            throw new TypeError("CURRENT FILE NAME IS NULL !");
        }
    }
    export function JumpToPage(url: string): void{
        location.href = 
            `${url}?ak=${NCMBWrap.API_key}&ck=${NCMBWrap.client_key}`;
    }
    export function JumpToPageWithBookName(url: string, book_name: string): void{
        location.href = 
            `${url}?ak=${NCMBWrap.API_key}&ck=${NCMBWrap.client_key}&bn=${book_name}`;
    }
    export function JumpToPageWithoutInfo(url: string){
        location.href = url;
    }
}