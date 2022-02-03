import SurveyBuilder from "./SurveyBuilder";
import { ISurvey } from "./models";
import { FunctionComponent } from "react";
import {v4} from 'uuid'



const CreateSurvey: FunctionComponent = () => {

    const emptySurvey: ISurvey = { name : '', surveyID: 0, questions: [{questionID: parseInt(v4()), text: '', answers: [], isMultipleChoice: false}] }
    // console.log(emptySurvey)
    return (
        <div>
            <div className="alignCentre">
                <h1 > Welcome to Make a Survey!</h1>            
                <p>Enter the name of your survey, fill in the questions and answers, then hit submit!</p>
            </div>
            <br></br>
            < SurveyBuilder initialSurveyValue={emptySurvey}/>
        </div>
    )
}
export default CreateSurvey;
