import * as React from "react"
import { NCMBQuizServer } from "api/ncmb-quiz-server";

interface LoginViewProps {
    quizServer: NCMBQuizServer;
}

interface LoginViewState {

}

export class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    constructor(props: LoginViewProps) {
        super(props);
        this.state = {

        };
    }


    render() {
        let onLoginButtonClicked = () => {
            let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
            let username = usernameInput.value;

            let passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
            let password = passwordInput.value;

            this.props.quizServer.login(username, password)
                .then((res) => {
                    location.href = "./pages/book-list.html";
                })
                .catch((err) => {
                    window.alert("Login failed");
                });
        };

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="usernameInput">User name</label>
                    <input className="form-control" id="usernameInput" placeholder="Enter user name" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
                </div>
                <button onClick={onLoginButtonClicked} className="btn btn-primary">Login</button>
            </div>
        );
    }
}
