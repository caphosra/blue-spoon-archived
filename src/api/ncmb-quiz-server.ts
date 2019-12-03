import { HTMLQuery } from "../library/html-query"
import { NCMBParams } from '../data/ncmb-params'

export class NCMBQuizServer{
    ncmb: INCMB;
    
    constructor(){
        let params = new NCMBParams();

        let NCMB = require("ncmb");
        this.ncmb = new NCMB(params.AppKey, params.ClientKey);
    }

    getAcl(): any{
        let acl = new this.ncmb.Acl();
        acl.setUserReadAccess(this.ncmb.User.getCurrentUser(), true);
        acl.setUserWriteAccess(this.ncmb.User.getCurrentUser(), true);
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        return acl;
    }

    async login(userName: string, password: string): Promise<void> {
        try{
            await this.ncmb.User.login(userName, password);
        }
        catch(e){
            throw new Error("Login failed")
        }
    }

    async getQuizBookNameList(): Promise<IBook[]> {
        let table = this.ncmb.DataStore("books_table");
        let bookList = await table.limit(100).fetchAll();
        return bookList;
    }
    async getQuiz(quizBookName: string): Promise<IQuiz[]> {
        let table = this.ncmb.DataStore("quiz_table");
        let quizList = await table
            .equalTo("bookName", quizBookName)
            .limit(100)
            .fetchAll();
        return quizList;
    }
    addQuiz(quizBookName:string, quiz: IQuiz): void {
        let QuizItem = this.ncmb.DataStore("quiz_table");
        let item = new QuizItem({
                bookName: quizBookName,
                problem: quiz.problem, 
                answer: quiz.answer, 
                correctCount: quiz.correctCount,
                wrongCount: quiz.wrongCount
            });
        item.save();
    }
    deleteQuiz(quizBookName:string, quiz: IQuiz): void {
        let item: any = quiz;
        item.delete();
    }
}