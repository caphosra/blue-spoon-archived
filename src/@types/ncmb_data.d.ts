interface IDataTable{
    set(name: string, val: any): IDataTable;
    save(): Promise<IDataTable>;
    update(): Promise<any>;
    delete(): Promise<any>;
}

interface IDataTableMain{
    fetchAll(): Promise<Array<IDataTable>>;
}
