export interface ISurvey{
    name: string
    questions: IQuestion[]
    surveyID: number
}

export interface IQuestion{
    QuestionID: string;
    text: string
    answers: IAnswer[]
    IsMultipleChoice: boolean;
    numberInSurvey: number
}

export interface IAnswer{
    text: string
    AnswerID: string;
}