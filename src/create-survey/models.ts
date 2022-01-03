export interface ISurvey{
    name: string
    questions: IQuestion[]
    surveyID: number
}

export interface IQuestion{
    text: string
    answers: IAnswer[]
    IsMultipleChoice: boolean;
    numberInSurvey: number
}

export interface IAnswer{
    text: string
}