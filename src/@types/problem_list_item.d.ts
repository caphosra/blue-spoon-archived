interface IProblemItem extends IDataTable{
    problem: string;
    answer: string;

    correct: number;
    incorrect: number;
}