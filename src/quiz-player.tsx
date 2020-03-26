import * as React from "react"
import * as ReactDOM from "react-dom"

import { QuizView } from "./components/quiz-view"
import { NCMBQuizServer } from "./api/ncmb-quiz-server"
import { PermissionDeniedView } from "./components/permission-denied"
import { HTMLQuery } from "./library/html-query"

let mainElement = document.getElementById("main");

let quizServer = new NCMBQuizServer();

let currentUser = quizServer.ncmb.User.getCurrentUser();
if (currentUser) {
    console.log(`You logged in as ${currentUser.get("userName")}`);

    let bookName = HTMLQuery.GetParams();
    if (bookName["name"]) {
        ReactDOM.render(
            (
                <div>
                    <QuizView name={bookName["name"]} quizServer={quizServer} />
                </div>
            ),
            mainElement
        );
    }
    else {
        console.error("OMG! I can't find the name of the book.");
        ReactDOM.render(
            (
                <div>
                    <PermissionDeniedView />
                </div>
            ),
            mainElement
        );
    }
}
else {
    ReactDOM.render(
        (
            <div>
                <PermissionDeniedView />
            </div>
        ),
        mainElement
    );
}
