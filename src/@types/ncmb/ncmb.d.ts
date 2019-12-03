interface INCMB{
    DataStore(name: string): any;
    User: any;
    Acl: any;
}

interface INCMBDataItem{
    set(name: string, val: any): INCMBDataItem;
    save(): Promise<INCMBDataItem>;
    update(): Promise<any>;
    delete(): Promise<any>;
}

interface INCMBDataQuery{
    fetchAll(): Promise<Array<INCMBDataItem>>;
}
