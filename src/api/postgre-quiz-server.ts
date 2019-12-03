/*
import { PostgreParameters } from "../data/postgre-params"
import * as Postgre from "pg"

export class PostgreQuizServer{
    userName: string;

    private client: Postgre.Client;

    constructor(){
        let parameter = new PostgreParameters();
        this.client = new Postgre.Client({
            user: parameter.DB_USER,
            database: parameter.DB_DATABSE,
            host: parameter.DB_HOST,
            password: parameter.DB_PASSWORD,
            port: parameter.DB_PORT
        });
        this.client.connect();
    }

    async logIn(name: string, password: string): Promise<boolean>{
        const query = {
            text: "SELECT * FROM usernames_table WHERE name=$1 AND password=$2",
            values: [name, password]
        };
        let loggedIn = false;
        let result = await this.client.query(query);
        if(result.rowCount != 0) {
            loggedIn = true;
            this.userName = name;
        }
        return loggedIn;
    }

    async getQuizBookList(): Promise<string[]> {
        const query = {
            text: "SELECT * FROM booknames_table WHERE owner=$1",
            values: [this.userName]
        };
        let result = await this.client.query(query);
        let bookList: string[] = [];
        for(let book of result.rows){
            bookList.push(book.name);
        }
        return bookList;
    }

    async addQuizBook(name: string): Promise<void> {
        const query = {
            text: "INSERT INTO booknames_table (name, owner) VALUES($1, $2)",
            values: [name, this.userName]
        };
        await this.client.query(query);
        return;
    }

    async deleteQuizBook(name: string): Promise<void> {
        const query = {
            text: "DELETE FROM booknames_table WHERE name=$1 AND owner=$2",
            values: [name, this.userName]
        };
        await this.client.query(query);
        return;
    }

    async getQuizList(quizBookName: string): Promise<QuizItem[]> {
        const query = {
            text: "SELECT * FROM quiz_table WHERE bookname=$1",
            values: [quizBookName]
        };
        let result = await this.client.query(query);
        let quizList = result.rows as QuizItem[];
        return quizList;
    }

    async addQuiz(quizBookName:string, problem: string, answer: string): Promise<void> {
        const query = {
            text: "INSERT INTO quiz_table (bookname, problem, answer, correct, wrong) VALUES($1, $2, $3, $4, $5)",
            values: [quizBookName, problem, answer, 0, 0]
        };
        await this.client.query(query);
        return;
    }

    async deleteQuiz(quizBookName:string, id: number): Promise<void> {
        const query = {
            text: "DELETE FROM quiz_table WHERE id=$1",
            values: [id]
        };
        await this.client.query(query);
        return;
    }
}

export class QuizItem implements IQuiz{
    id: number;
    bookname: string;

    problem: string;
    answer: string;

    correct: number;
    wrong: number;
}
*/