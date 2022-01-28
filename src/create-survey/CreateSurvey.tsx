import SurveyBuilder from "./SurveyBuilder";
import { ISurvey } from "./models";
import { FunctionComponent } from "react";
import {v4} from 'uuid'



const CreateSurvey: FunctionComponent = () => {

    const emptySurvey: ISurvey = { name : '', surveyID: 0, questions: [{questionID: parseInt(v4()), text: '', answers: [], isMultipleChoice: false, numberInSurvey: 1}] }
    // console.log(emptySurvey)
    return (
        <div>
            <h1> Welcome to Make a Survey!</h1>
            <br></br>
            <p>Enter the name of your survey and then get started!</p>
            < SurveyBuilder initialSurveyValue={emptySurvey}/>
        </div>
    )
}
export default CreateSurvey;
