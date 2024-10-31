export interface IViewSurvey{
    name: string
    questions: IViewQuestion[]
    surveyID: number
    totalResponses: number;
}

export interface IViewQuestion{
    questionID: number;
    text: string;
    answers: IViewAnswer[]
    isMultipleChoice: boolean;
    numberInSurvey: number;
    totalResponses: number;
}

export interface IViewAnswer{
    text: string
    answerID: number;
    answerNumber: number;
    countResponses: number;
    percentage: number;

}