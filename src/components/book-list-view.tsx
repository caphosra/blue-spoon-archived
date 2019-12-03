import * as React from "react"
import { NCMBQuizServer } from "../api/ncmb-quiz-server"

interface BookListViewProps{
    quizServer: NCMBQuizServer;
}

interface BookListViewState{
    bookNames: IBook[];
}

export class BookListView extends React.Component<BookListViewProps, BookListViewState> {
    constructor(props: BookListViewProps){
        super(props);
        this.state = {
            bookNames: []
        };

        this.initBookList();
    }

    initBookList(){
        this.props.quizServer.getQuizBookNameList()
            .then((res) => {
                this.setState({
                    bookNames: res
                });
            });
    }

    render() {
        let onChallengeButtonCliecked = (book: IBook) => {
            location.href = `./quiz-player.html?name=${book.name}`;
        };
        let onEditButtonCliecked = (book: IBook) => {
            location.href = `./edit-book.html?name=${book.name}`;
        };
        let onAddButtonClicked = () => {
            let name = window.prompt("New book name");
            let Book = this.props.quizServer.ncmb.DataStore("books_table");
            let book = new Book({
                name: name
            }) as INCMBDataItem;
            book.set("acl", this.props.quizServer.getAcl()).save().then((res) => {
                this.initBookList();
            });
        };

        let bookCards: JSX.Element[] = [];

        bookCards.push(
            <button type="button" className="btn btn-success" onClick={onAddButtonClicked}>Add new</button>
        );

        for(let book of this.state.bookNames) {
            bookCards.push(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{book.name}</h5>
                        <button type="button" className="btn btn-primary" onClick={() => onChallengeButtonCliecked(book)}>Challenge</button>
                        <button type="button" className="btn btn-success" onClick={() => onEditButtonCliecked(book)}>Edit</button>
                    </div>
                </div>
            );
        }

        return (
            <div>{bookCards}</div>
        );
    }
}
