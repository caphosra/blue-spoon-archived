class BookList{
    private data: IDataTable;

    constructor(data: IDataTable){
        this.data = data;
    }

    name: string = "";

    save(): void{
        this.data.set("name", this.name)
            .save()
            .then(function(data) {
                console.log("Save Successfully");
            })
            .catch(function(err) {
                console.error(err);
            });
    }

    delete(): void{
        this.data.delete()
            .then(function(val){
                console.log("Delete Successfully");
            })
            .catch(function(err){
                console.error(err);
            });
    }
}

function getDataTable(name: string): IDataTableMain | undefined{
    if(ncmb != undefined){
        let dataTable = ncmb.DataStore(name) as IDataTableMain;
        return dataTable;
    }
    return undefined;
}

function makeDataTableInstance(name: string): IDataTable | undefined{
    if(ncmb != undefined){
        let SomeClass = ncmb.DataStore(name);
        let dataTableInstance = new SomeClass() as IDataTable;
        return dataTableInstance;
    }
    return undefined;
}

function makeBookListInstance(bookName: string): BookList | undefined{
    let bookListData = makeDataTableInstance("BookList");
    if(bookListData != undefined){
        let list = new BookList(bookListData);
        list.name = bookName;
        return list;
    }
    return undefined;
}
