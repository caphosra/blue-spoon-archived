import * as React from "react"
import * as ReactDOM from "react-dom"

import { BookListView } from "./components/book-list-view"
import { NCMBQuizServer } from "./api/ncmb-quiz-server"
import { PermissionDeniedView } from "./components/permission-denied"

let mainElement = document.getElementById("main");

let quizServer = new NCMBQuizServer();

let currentUser = quizServer.ncmb.User.getCurrentUser();
if (currentUser) {
    console.log(`You logged in as ${currentUser.get("userName")}`);
    ReactDOM.render(
        (
            <div>
                <BookListView quizServer={quizServer} />
            </div>
        ),
        mainElement
    );
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
