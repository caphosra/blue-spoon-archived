import * as React from "react"

import { NCMBQuizServer } from "../api/ncmb-quiz-server";
import { QuizResultView } from "./quiz-result-view";

interface QuizViewProps{
    name: string;
    quizServer: NCMBQuizServer;
}

interface QuizViewState{
    currentQuiz: number;
    isLoading: boolean;
}

export class QuizView extends React.Component<QuizViewProps, QuizViewState> {
    quiz: IQuiz[] = [];
    correct: number = 0;
    wrong: number = 0;
    
    constructor(props: QuizViewProps){
        super(props);
        this.state = {
            currentQuiz: 0,
            isLoading: true
        };

        this.props.quizServer.getQuiz(this.props.name).then((res) => {
            let shuffled = res
                .map((a) => ({sort: Math.random(), value: a}))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value);
            this.quiz = shuffled;
            this.setState({
                currentQuiz: 0,
                isLoading: false
            });
        });
    }

    calcAccuracy(quiz: IQuiz): number{
        if(quiz.correctCount + quiz.wrongCount == 0){
            return 0;
        }
        else{
            return quiz.correctCount / (quiz.correctCount + quiz.wrongCount) * 100;
        }
    }

    render() {
        if(this.state.isLoading){
            return (
                <div>Now loading...</div>
            );
        }

        if(this.state.currentQuiz == this.quiz.length){
            return (
                <QuizResultView correct={this.correct} wrong={this.wrong} />
            );
        }

        let onCorrectButtonCliecked = () => {
            let currentQuizItem: INCMBDataItem = currentQuiz;
            currentQuizItem.set("correctCount", currentQuiz.correctCount + 1).update().then((res) => {
                this.correct++;
                this.setState({
                    currentQuiz: this.state.currentQuiz + 1
                });
            });  
        };
        let onWrongButtonCliecked = () => {
            let currentQuizItem: INCMBDataItem = currentQuiz;
            currentQuizItem.set("wrongCount", currentQuiz.wrongCount + 1).update().then((res) => {
                this.wrong++;
                this.setState({
                    currentQuiz: this.state.currentQuiz + 1
                });
            }); 
        };

        let currentQuiz = this.quiz[this.state.currentQuiz];

        let content: JSX.Element[] = [];
        
        content.push(<h5>{this.props.name}</h5>);

        content.push(
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Problem</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Accuracy: {this.calcAccuracy(currentQuiz)}%
                        </h6>
                        <p className="card-text">{currentQuiz.problem}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Answer</h5>
                        <p className="card-text">{currentQuiz.answer}</p>
                    </div>
                </div>
                <button className="btn btn-success" onClick={onCorrectButtonCliecked}>Correct</button>
                <button className="btn btn-danger" onClick={onWrongButtonCliecked}>Wrong</button>
            </div>
        );

        return <div>{content}</div>;
    }
}