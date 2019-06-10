interface IDataTable{
    set(name: string, val: any): IDataTable;
    save(): Promise<IDataTable>;
    delete(): Promise<any>;
}

interface IDataTableMain{
    fetchAll(): Promise<Array<IDataTable>>;
}
