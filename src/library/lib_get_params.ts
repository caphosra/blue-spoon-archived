function libGetParams(): { [key: string]: string; } {
    let params: { [key: string]: string; } = { };

    let query_text = location.search;
    query_text = query_text.substring(1);

    let query = query_text.split("&");

    for(var q of query){
        let params_array = q.split("=");

        if(params_array.length == 2){
            let param_name = params_array[0];
            let param_value = params_array[1];

            params[param_name] = param_value;
        }
        else{
            console.error("PARAMS ARE BAD");
            return params;
        }
    }

    return params;
}
