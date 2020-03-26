import * as React from "react"

import { NCMBQuizServer } from "../api/ncmb-quiz-server";
import { QuizResultView } from "./quiz-result-view";

interface EditViewProps {
    name: string;
    quizServer: NCMBQuizServer;
}

interface EditViewState {
    quiz: IQuiz[];
    isLoading: boolean;
}

export class EditView extends React.Component<EditViewProps, EditViewState> {
    constructor(props: EditViewProps) {
        super(props);
        this.state = {
            quiz: [],
            isLoading: true
        };
        this.reloadView();
    }

    reloadView() {
        this.props.quizServer.getQuiz(this.props.name).then((res) => {
            this.setState({
                quiz: res,
                isLoading: false
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>Now loading...</div>
            );
        }

        let content: JSX.Element[] = [];

        content.push(<h5>{this.props.name}</h5>);

        let onAddButtonClicked = () => {
            let QuizItem = this.props.quizServer.ncmb.DataStore("quiz_table");
            let quiz = new QuizItem({
                problem: "New problem",
                answer: "New answer",
                correctCount: 0,
                wrongCount: 0,
                bookName: this.props.name
            }) as INCMBDataItem;
            quiz.set("acl", this.props.quizServer.getAcl()).save().then((res) => {
                this.reloadView();
            });
        };

        content.push(<button type="button" className="btn btn-success" onClick={onAddButtonClicked}>Add new</button>);

        for (let i = 0; i < this.state.quiz.length; i++) {
            let currentQuiz = this.state.quiz[i];

            let saveClicked = () => {
                let problemInput = document.getElementById(`problemInput${i}`) as HTMLInputElement;
                let problem = problemInput.value;

                let answerInput = document.getElementById(`answerInput${i}`) as HTMLInputElement;
                let answer = answerInput.value;

                currentQuiz.set("problem", problem)
                    .set("answer", answer)
                    .set("correctCount", 0)
                    .set("wrongCount", 0)
                    .update()
                    .then((res) => {
                        this.reloadView();
                    });
            };
            let deleteClicked = () => {
                currentQuiz.delete()
                    .then((res) => {
                        this.reloadView();
                    });
            };

            content.push(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Quiz</h5>
                        <div className="form-group">
                            <label htmlFor="problem">Problem</label>
                            <input className="form-control" id={`problemInput${i}`} placeholder="Problem" defaultValue={currentQuiz.problem} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="answer">Answer</label>
                            <input className="form-control" id={`answerInput${i}`} placeholder="answer" defaultValue={currentQuiz.answer} />
                        </div>
                        <button onClick={saveClicked} className="btn btn-primary">Save</button>
                        <button onClick={deleteClicked} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            );
        }

        return <div>{content}</div>;
    }
}