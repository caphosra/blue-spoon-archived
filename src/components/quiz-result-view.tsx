import * as React from "react"

interface QuizResultViewProps {
    correct: number;
    wrong: number;
}

interface QuizResultViewState {

}

export class QuizResultView extends React.Component<QuizResultViewProps, QuizResultViewState> {
    constructor(props: QuizResultViewProps) {
        super(props);
        this.state = {

        };
    }

    render() {
        let content: JSX.Element[] = [];

        content.push(
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Result</h5>
                        <p className="card-text">{this.props.correct}/{this.props.correct + this.props.wrong}</p>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => { location.href = "./book-list.html"; }}>GoBack</button>
            </div>
        );

        return <div>{content}</div>;
    }
}