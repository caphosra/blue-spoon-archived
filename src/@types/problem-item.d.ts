interface IProblemItem extends INCMBDataItem{
    problem: string;
    answer: string;

    correct: number;
    incorrect: number;
}