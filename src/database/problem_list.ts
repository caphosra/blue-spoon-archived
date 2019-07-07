function getAllProblems(book_name: string): Array<IProblemItem> | undefined{
    let dataTable = NCMBWrap.DataStore(book_name);
    let allProblems: Array<IProblemItem> | undefined = undefined;

    if(dataTable != undefined){
        dataTable.fetchAll()
            .then(function(res){
                allProblems = res.map((dataTable) => dataTable as IProblemItem);
            })
            .catch(function(err){
                console.error(err);
            });
    }

    return allProblems;
}

function addProblem(book_name: string, problem: string, answer: string){
    let dataTableItem = NCMBWrap.CreateNewData(book_name);

    if(dataTableItem != undefined){
        dataTableItem
            .set("problem", problem)
            .set("answer", answer)
            .set("solve_count", "0")
            .set("wrong_count", "0")
            .save()
            .then(function(res){
                console.log("Added problem");
            })
            .catch(function(err){
                console.error(err);
            });
    }
}
