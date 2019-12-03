import * as React from "react"
import * as ReactDOM from "react-dom"

import { NCMBQuizServer } from "./api/ncmb-quiz-server"
import { LoginView } from "./components/login-view"

let mainElement = document.getElementById("main");

let quizServer = new NCMBQuizServer();

let currentUser = quizServer.ncmb.User.getCurrentUser();
if (currentUser) {
    //
    // Logout
    //
    console.log(`You logged in as ${currentUser.get("userName")}`);
    console.log("Logout...");
    quizServer.ncmb.User.logout();
}

ReactDOM.render(
    (
        <div>
            <LoginView quizServer={quizServer} />
        </div>
    ),
    mainElement
);
