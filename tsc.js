"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var OnLoadWrap;
(function (OnLoadWrap) {
    let functions = [];
    function AddToOnLoad(func) {
        functions.push(func);
        window.onload = OnLoadFunc;
    }
    OnLoadWrap.AddToOnLoad = AddToOnLoad;
    function AddToOnLoadIf(filename, func) {
        if (PageLocation.GetCurrentFile() == filename) {
            AddToOnLoad(func);
        }
    }
    OnLoadWrap.AddToOnLoadIf = AddToOnLoadIf;
    function OnLoadFunc() {
        for (let func of functions) {
            func();
        }
    }
})(OnLoadWrap || (OnLoadWrap = {}));
var NCMBWrap;
(function (NCMBWrap) {
    let ncmbInstance;
    function DataStore(name) {
        return ncmbInstance.DataStore(name);
    }
    NCMBWrap.DataStore = DataStore;
    function CreateNewData(name) {
        let GeneratedClass = ncmbInstance.DataStore(name);
        return new GeneratedClass();
    }
    NCMBWrap.CreateNewData = CreateNewData;
    function Initalize() {
        InitKeysFromQuery();
        if (NCMBWrap.API_key && NCMBWrap.client_key) {
            ncmbInstance = new NCMB(NCMBWrap.API_key, NCMBWrap.client_key);
            return ncmbInstance;
        }
        InitKeysFromCookie();
        if (NCMBWrap.API_key && NCMBWrap.client_key) {
            ncmbInstance = new NCMB(NCMBWrap.API_key, NCMBWrap.client_key);
            return ncmbInstance;
        }
        PageLocation.JumpToPageWithoutInfo(PageLocation.cannnot_connect);
        throw new TypeError("COULDN'T FIND AN APP KEY AND AN CLIENT KEY !");
    }
    NCMBWrap.Initalize = Initalize;
    function InitKeysFromQuery() {
        let params = HTMLQuery.GetParams();
        NCMBWrap.API_key = params["ak"];
        NCMBWrap.client_key = params["ck"];
    }
    function InitKeysFromCookie() {
        NCMBWrap.API_key = Cookies.get("bs_apikey");
        NCMBWrap.client_key = Cookies.get("bs_clientkey");
    }
})(NCMBWrap || (NCMBWrap = {}));
OnLoadWrap.AddToOnLoad(NCMBWrap.Initalize);
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages.element_not_found = "THERE ARE NO CONTENTS WHICH THIS JOB REQUIRES !";
    ErrorMessages.unexpected = "UNEXPECTED ERROR !";
})(ErrorMessages || (ErrorMessages = {}));
var HTMLQuery;
(function (HTMLQuery) {
    let params = undefined;
    function GetParams() {
        if (params) {
            return params;
        }
        params = {};
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
    HTMLQuery.GetParams = GetParams;
})(HTMLQuery || (HTMLQuery = {}));
var PageLocation;
(function (PageLocation) {
    PageLocation.book_item = "./book_item.html";
    PageLocation.book_list = "./book_list.html";
    PageLocation.index = "./index.html";
    PageLocation.cannnot_connect = "./cannnot_connect.html";
    let current_file;
    function GetCurrentFile() {
        if (!current_file) {
            let filename_with_query = window.location.pathname.split("/").pop();
            if (filename_with_query) {
                let file_name = filename_with_query.split("?").shift();
                current_file = `./${file_name}`;
            }
        }
        if (current_file) {
            return current_file;
        }
        else {
            throw new TypeError("CURRENT FILE NAME IS NULL !");
        }
    }
    PageLocation.GetCurrentFile = GetCurrentFile;
    function JumpToPage(url) {
        location.href =
            `${url}?ak=${NCMBWrap.API_key}&ck=${NCMBWrap.client_key}`;
    }
    PageLocation.JumpToPage = JumpToPage;
    function JumpToPageWithBookName(url, book_name) {
        location.href =
            `${url}?ak=${NCMBWrap.API_key}&ck=${NCMBWrap.client_key}&bn=${book_name}`;
    }
    PageLocation.JumpToPageWithBookName = JumpToPageWithBookName;
    function JumpToPageWithoutInfo(url) {
        location.href = url;
    }
    PageLocation.JumpToPageWithoutInfo = JumpToPageWithoutInfo;
})(PageLocation || (PageLocation = {}));
var BookItem;
(function (BookItem) {
    BookItem.book_name = undefined;
    function InitBookName() {
        let params = HTMLQuery.GetParams();
        BookItem.book_name = params["bn"];
        if (!BookItem.book_name) {
            console.error("BOOK NAME IS NULL !");
        }
    }
    function SetBookNameToElement() {
        let elem = document.getElementById("book_name_content");
        if (elem && BookItem.book_name) {
            elem.innerHTML = BookItem.book_name;
        }
    }
    let Event;
    (function (Event) {
        function OnLoad() {
            InitBookName();
            SetBookNameToElement();
        }
        Event.OnLoad = OnLoad;
    })(Event = BookItem.Event || (BookItem.Event = {}));
})(BookItem || (BookItem = {}));
OnLoadWrap.AddToOnLoadIf(PageLocation.book_item, BookItem.Event.OnLoad);
var BookList;
(function (BookList) {
    const update_list_button_id = "update_list_button";
    const add_book_button_id = "add_book_button";
    function MakeBook() {
        var book_name = window.prompt("Input your book name", "");
        if (book_name) {
            let newRecord = NCMBWrap.CreateNewData("BookList");
            newRecord.name = book_name;
            newRecord.save();
        }
        UpdateBookList();
    }
    BookList.MakeBook = MakeBook;
    function UpdateBookList() {
        let bookListTable = NCMBWrap.DataStore("BookList");
        bookListTable.fetchAll()
            .then(function (res) {
            let tableElement = document.getElementById("book_list");
            if (tableElement) {
                tableElement.innerHTML = "";
                for (let item of res) {
                    let bookItem = item;
                    let clickEvent = `PageLocation.JumpToPageWithBookName('${PageLocation.book_item}', '${bookItem.name}');`;
                    tableElement.innerHTML += `<a href="#" name="book_item_link" onclick="${clickEvent}">${bookItem.name}</a><br/>`;
                }
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    BookList.UpdateBookList = UpdateBookList;
    let Event;
    (function (Event) {
        function OnLoad() {
            let update_list_button = document.getElementById(update_list_button_id);
            if (update_list_button) {
                update_list_button.onclick = OnUpdateListButtonClicked;
            }
            let add_book_button = document.getElementById(add_book_button_id);
            if (add_book_button) {
                add_book_button.onclick = OnAddBookButtonClicked;
            }
            UpdateBookList();
        }
        Event.OnLoad = OnLoad;
        function OnUpdateListButtonClicked() {
            UpdateBookList();
        }
        function OnAddBookButtonClicked() {
            MakeBook();
        }
    })(Event = BookList.Event || (BookList.Event = {}));
})(BookList || (BookList = {}));
OnLoadWrap.AddToOnLoadIf(PageLocation.book_list, BookList.Event.OnLoad);
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
            if (BookItem.book_name) {
                let problemClass = NCMBWrap.DataStore(BookItem.book_name);
                if (problemClass) {
                    yield problemClass.fetchAll()
                        .then(function (results) {
                        let original_problems = results;
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
function getAllProblems(book_name) {
    let dataTable = NCMBWrap.DataStore(book_name);
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
    let dataTableItem = NCMBWrap.CreateNewData(book_name);
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
