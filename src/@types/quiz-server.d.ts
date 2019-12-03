interface IBook{
    name: string;
}

interface IQuiz extends INCMBDataItem{
    problem: string;
    answer: string;

    correctCount: number;
    wrongCount: number;
}

interface IQuizServer{
    getQuizBookNameList(): string[];
    getQuiz(quizBookName: string): IQuiz[];
    addQuiz(quizBookName:string, quiz: IQuiz): void;
    deleteQuiz(quizBookName:string, quiz: IQuiz): void;
}
