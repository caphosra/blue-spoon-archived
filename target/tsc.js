"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SettingsContent {
    constructor(APIKey, clientKey) {
        this.APIKey = APIKey;
        this.ClientKey = clientKey;
    }
}
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages.element_not_found = "THERE ARE NO CONTENTS WHICH THIS JOB REQUIRES !";
    ErrorMessages.unexpected = "UNEXPECTED ERROR !";
})(ErrorMessages || (ErrorMessages = {}));
var global_book_name = undefined;
function userInitBookName() {
    let params = libGetParams();
    let book_name = params["bn"];
    if (!book_name) {
        console.error("BOOK NAME IS NULL !");
    }
    else {
        global_book_name = book_name;
    }
}
function userSetBookNameToElement() {
    let elem = document.getElementById("book_name_content");
    if (elem && global_book_name) {
        elem.innerHTML = global_book_name;
    }
}
function userMakeBook() {
    var book_name = window.prompt("Input your book name", "");
    if (book_name) {
        var bookList = makeBookListInstance(book_name);
        if (bookList) {
            bookList.save();
        }
    }
    userUpdateBookList();
}
function userUpdateBookList() {
    let bookListTable = getDataTable("BookList");
    if (!bookListTable) {
        return;
    }
    bookListTable.fetchAll()
        .then(function (res) {
        let tableElement = document.getElementById("book_list");
        if (tableElement != null) {
            tableElement.innerHTML = "";
            for (let i = 0; i < res.length; i++) {
                let bookItem = res[i];
                tableElement.innerHTML += `<a href="#" onclick="userOpenBook('${bookItem.name}');">${bookItem.name}</a><br/>`;
            }
        }
    })
        .catch(function (err) {
        console.error(err);
    });
}
function userOpenBook(book_name) {
    location.href = `./book_item.html?ak=${appKey}&ck=${clientKey}&bn=${book_name}`;
}
var ncmb = undefined;
function userInitNCMB() {
    var ncmb = initalizeNCMB();
    if (!ncmb) {
        onCannotConnectToNCMB();
    }
}
var QuizDialog;
(function (QuizDialog) {
    const control_element_id = "book_control_content";
    const quiz_element_id = "quiz_dialog_content";
    const problem_counter_element_id = "problem_counter_content";
    const problem_element_id = "problem_content";
    const correct_rate_element_id = "correct_rate_content";
    const answer_group_element_id = "answer_group";
    const answer_element_id = "answer_content";
    const result_group_element_id = "quiz_result_group";
    const show_result_content_id = "show_result_content";
    QuizDialog.correct_count = 0;
    QuizDialog.incorrect_count = 0;
    let problem_count;
    /**
     * Show the quiz dialog.
     *
     * @export
     */
    function Enabled() {
        return __awaiter(this, void 0, void 0, function* () {
            let control_element = document.getElementById(control_element_id);
            let quiz_element = document.getElementById(quiz_element_id);
            if (control_element && quiz_element) {
                DisableElement(control_element);
                EnableElement(quiz_element);
                InitVariables();
                yield GetProblems();
                problem_count = QuizDialog.problems.length;
                GoToNextProblem();
            }
            else {
                console.error(ErrorMessages.element_not_found);
            }
        });
    }
    QuizDialog.Enabled = Enabled;
    /**
     * Hide the quiz dialog.
     *
     * @export
     */
    function Disabled() {
        let control_element = document.getElementById(control_element_id);
        let quiz_element = document.getElementById(quiz_element_id);
        if (control_element && quiz_element) {
            EnableElement(control_element);
            DisableElement(quiz_element);
        }
        else {
            console.error(ErrorMessages.element_not_found);
        }
    }
    QuizDialog.Disabled = Disabled;
    /**
     * Show the problem to this dialog or results.
     *
     * @warning This function calls ShowProblem() internally.
     * @export
     */
    function GoToNextProblem() {
        if (QuizDialog.problems.length != 0) {
            let problem = QuizDialog.problems.shift();
            if (problem) {
                QuizDialog.current_problem = problem;
                ShowProblem(problem);
            }
            else {
                console.error(ErrorMessages.unexpected);
            }
        }
        else {
            ShowResults();
        }
    }
    QuizDialog.GoToNextProblem = GoToNextProblem;
    /**
     * Show the problem to this dialog.
     *
     * @export
     * @param {IBookContent} content problem
     */
    function ShowProblem(content) {
        let problem_counter_element = document.getElementById(problem_counter_element_id);
        let problem_element = document.getElementById(problem_element_id);
        let correct_rate_element = document.getElementById(correct_rate_element_id);
        let answer_group_element = document.getElementById(answer_group_element_id);
        let answer_element = document.getElementById(answer_element_id);
        if (problem_counter_element && problem_element && correct_rate_element && answer_group_element && answer_element) {
            let current_problem_number = QuizDialog.correct_count + QuizDialog.incorrect_count + 1;
            problem_counter_element.innerHTML = `${current_problem_number}/${problem_count}`;
            problem_element.innerHTML = content.problem;
            correct_rate_element.innerHTML = `Correct Rate : ${GetCorrectRate(content.correct, content.incorrect)}%`;
            DisableElement(answer_group_element);
            answer_element.innerHTML = content.answer;
        }
        else {
            console.error(ErrorMessages.element_not_found);
        }
    }
    QuizDialog.ShowProblem = ShowProblem;
    /**
     * Show the answer.
     *
     * @export
     */
    function ShowAnswer() {
        let answer_group_element = document.getElementById(answer_group_element_id);
        if (answer_group_element) {
            EnableElement(answer_group_element);
        }
        else {
            console.error(ErrorMessages.element_not_found);
        }
    }
    QuizDialog.ShowAnswer = ShowAnswer;
    /**
     * Show results.
     *
     * @export
     */
    function ShowResults() {
        let quiz_group_element = document.getElementById(quiz_element_id);
        let result_group = document.getElementById(result_group_element_id);
        let show_result_content = document.getElementById(show_result_content_id);
        if (quiz_group_element && result_group && show_result_content) {
            DisableElement(quiz_group_element);
            EnableElement(result_group);
            show_result_content.innerHTML = `Your results is ${QuizDialog.correct_count}/${QuizDialog.correct_count + QuizDialog.incorrect_count}`;
        }
        else {
            console.error(ErrorMessages.element_not_found);
        }
    }
    QuizDialog.ShowResults = ShowResults;
    let Event;
    (function (Event) {
        function OnCorrectButtonClicked() {
            QuizDialog.correct_count++;
            QuizDialog.current_problem.correct++;
            QuizDialog.current_problem.update();
            GoToNextProblem();
        }
        Event.OnCorrectButtonClicked = OnCorrectButtonClicked;
        function OnIncorrectButtonClicked() {
            QuizDialog.incorrect_count++;
            QuizDialog.current_problem.incorrect++;
            QuizDialog.current_problem.update();
            GoToNextProblem();
        }
        Event.OnIncorrectButtonClicked = OnIncorrectButtonClicked;
    })(Event = QuizDialog.Event || (QuizDialog.Event = {}));
    function InitVariables() {
        QuizDialog.correct_count = 0;
        QuizDialog.incorrect_count = 0;
    }
    function GetCorrectRate(correct, incorrect) {
        if (correct + incorrect == 0) {
            return 0;
        }
        else {
            return Math.floor(correct / (correct + incorrect) * 100);
        }
    }
    function GetProblems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (ncmb && global_book_name) {
                let problemClass = ncmb.DataStore(global_book_name);
                if (problemClass) {
                    yield problemClass.fetchAll()
                        .then(function (results) {
                        let original_problems = results;
                        //
                        // Suffle
                        //
                        QuizDialog.problems = RandomSort.Do(original_problems);
                    })
                        .catch(function (err) {
                        console.error(err);
                    });
                }
            }
        });
    }
    function EnableElement(element) {
        element.style.display = "inline";
    }
    function DisableElement(element) {
        element.style.display = "none";
    }
})(QuizDialog || (QuizDialog = {}));
class BookList {
    constructor(data) {
        this.name = "";
        this.data = data;
    }
    save() {
        this.data.set("name", this.name)
            .save()
            .then(function (data) {
            console.log("Save Successfully");
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    delete() {
        this.data.delete()
            .then(function (val) {
            console.log("Delete Successfully");
        })
            .catch(function (err) {
            console.error(err);
        });
    }
}
function getDataTable(name) {
    if (ncmb != undefined) {
        let dataTable = ncmb.DataStore(name);
        return dataTable;
    }
    return undefined;
}
function makeDataTableInstance(name) {
    if (ncmb != undefined) {
        let SomeClass = ncmb.DataStore(name);
        let dataTableInstance = new SomeClass();
        return dataTableInstance;
    }
    return undefined;
}
function makeBookListInstance(bookName) {
    let bookListData = makeDataTableInstance("BookList");
    if (bookListData != undefined) {
        let list = new BookList(bookListData);
        list.name = bookName;
        return list;
    }
    return undefined;
}
function getAllProblems(book_name) {
    let dataTable = getDataTable(book_name);
    let allProblems = undefined;
    if (dataTable != undefined) {
        dataTable.fetchAll()
            .then(function (res) {
            allProblems = res.map((dataTable) => dataTable);
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    return allProblems;
}
function addProblem(book_name, problem, answer) {
    let dataTableItem = makeDataTableInstance(book_name);
    if (dataTableItem != undefined) {
        dataTableItem
            .set("problem", problem)
            .set("answer", answer)
            .set("solve_count", "0")
            .set("wrong_count", "0")
            .save()
            .then(function (res) {
            console.log("Added problem");
        })
            .catch(function (err) {
            console.error(err);
        });
    }
}
function libGetParams() {
    let params = {};
    let query_text = location.search;
    query_text = query_text.substring(1);
    let query = query_text.split("&");
    for (var q of query) {
        let params_array = q.split("=");
        if (params_array.length == 2) {
            let param_name = params_array[0];
            let param_value = params_array[1];
            params[param_name] = param_value;
        }
        else {
            console.error("PARAMS ARE BAD");
            return params;
        }
    }
    return params;
}
function makeInstance(className, args) {
    let args_str = "";
    for (let index = 0; index < args.length; index++) {
        if (index != 0)
            args_str += ",";
        args_str += `args[${index}]`;
    }
    return eval(`new ${className}(${args_str})`);
}
var RandomSort;
(function (RandomSort) {
    function Do(list) {
        let n = list.length;
        let temp = 0, i = 0;
        while (n) {
            i = Math.floor(Math.random() * n--);
            temp = list[n];
            list[n] = list[i];
            list[i] = temp;
        }
        return list;
    }
    RandomSort.Do = Do;
})(RandomSort || (RandomSort = {}));
const CANNOT_CONNECT_HTML_PATH = "./cannot_connect.html";
function onCannotConnectToNCMB() {
    var result = window.confirm("Retry to connect NCMB ?");
    if (result) {
        location.reload(true);
    }
    else {
        location.href = CANNOT_CONNECT_HTML_PATH;
    }
}
function loadSettings() {
    var promise = new Promise((resolve, reject) => {
        let json = Cookies.get("bluespoon_setting");
        if (json == undefined) {
            reject("Not found.");
        }
        var content = JSON.parse(json);
        resolve(content);
    });
    return promise;
}
var appKey;
var clientKey;
var ncmb = undefined;
function initalizeNCMB() {
    if (ncmb) {
        return ncmb;
    }
    let params = libGetParams();
    appKey = params["ak"];
    clientKey = params["ck"];
    if (appKey && clientKey) {
        ncmb = new NCMB(appKey, clientKey);
        return ncmb;
    }
    appKey = Cookies.get("bs_apikey");
    clientKey = Cookies.get("bs_clientkey");
    if (appKey && clientKey) {
        ncmb = new NCMB(appKey, clientKey);
        return ncmb;
    }
    console.error("COULDN'T FIND AN APP KEY AND AN CLIENT KEY !");
    return undefined;
}
function saveSettings(content) {
    let json = JSON.stringify(content);
    Cookies.set("bluespoon_setting", json);
}
