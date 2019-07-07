module NCMBWrap{
    export let API_key: string;
    export let client_key: string;

    let ncmbInstance: INCMB;

    /**
     * Wrap function for INCMB.DataStore
     *
     */
    export function DataStore(name: string): INCMBDataQuery{
        return ncmbInstance.DataStore(name) as INCMBDataQuery;
    }
    /**
     * Wrap function for INCMB.DataStore
     *
     */
    export function CreateNewData(name: string): INCMBDataItem{
        let GeneratedClass = ncmbInstance.DataStore(name);
        return new GeneratedClass() as INCMBDataItem; 
    }
    /**
     * Initalize INCMB
     *
     */
    export function Initalize(): INCMB{
        InitKeysFromQuery();

        if(API_key && client_key){
            ncmbInstance = new NCMB(API_key, client_key) as INCMB;
            return ncmbInstance;
        }

        InitKeysFromCookie();

        if(API_key && client_key){
            ncmbInstance = new NCMB(API_key, client_key) as INCMB;
            return ncmbInstance;
        }

        PageLocation.JumpToPageWithoutInfo(PageLocation.cannnot_connect);

        throw new TypeError("COULDN'T FIND AN APP KEY AND AN CLIENT KEY !");
    }

    function InitKeysFromQuery(): void{
        let params = HTMLQuery.GetParams();
        API_key = params["ak"];
        client_key = params["ck"];
    }
    function InitKeysFromCookie(): void{
        API_key = Cookies.get("bs_apikey");
        client_key = Cookies.get("bs_clientkey");
    }
}

OnLoadWrap.AddToOnLoad(NCMBWrap.Initalize);
