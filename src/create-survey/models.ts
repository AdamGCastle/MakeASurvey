export interface ISurvey{
    name: string
    questions: IQuestion[]
    surveyID: number
}

export interface IQuestion{
    questionID: number;
    text: string
    answers: IAnswer[]
    isMultipleChoice: boolean;
    numberInSurvey: number
}

export interface IAnswer{
    text: string
    answerID: number;
    answerNumber: number;

}