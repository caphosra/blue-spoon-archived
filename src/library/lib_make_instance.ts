function makeInstance(className: string, args: any[]): any{
    let args_str: string = "";

    for (let index = 0; index < args.length; index++) {
        if(index != 0) args_str += ","; 
        args_str += `args[${index}]`;
    }

    return eval(`new ${className}(${args_str})`);
}
