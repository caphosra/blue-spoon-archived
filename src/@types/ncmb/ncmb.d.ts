interface INCMB{
    DataStore(name: string): any;
    User: INCMBUser;
    Acl: any;
}

interface INCMBUser{
    getCurrentUser(): any;
    login(username: string, password: string): Promise<any>;
    logout(): Promise<any>;
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
