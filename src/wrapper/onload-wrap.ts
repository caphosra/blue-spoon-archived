module OnLoadWrap{
    let functions: Array<() => void> = [ ];

    export function AddToOnLoad(func: (() => void)): void{
        functions.push(func);
        window.onload = OnLoadFunc;
    }
    export function AddToOnLoadIf(filename: string, func: (() => void)): void{
        if(PageLocation.GetCurrentFile() == filename){
            AddToOnLoad(func);
        }
    }

    function OnLoadFunc(): any{
        for(let func of functions){
            func();
        }
    }
}