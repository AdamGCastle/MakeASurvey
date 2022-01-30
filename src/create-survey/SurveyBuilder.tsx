import { useState, FunctionComponent } from "react";
import QuestionBuilder from "./QuestionBuilder";
import { ChangeEvent } from "react";
import { IQuestion, ISurvey } from "./models";
import { useNavigate } from "react-router-dom";
import '../App.css';



interface SurveyBuilderProps{       
    initialSurveyValue: ISurvey
}

const SurveyBuilder: FunctionComponent<SurveyBuilderProps> = ({initialSurveyValue}) => {

    const [mySurvey, setSurvey] = useState<ISurvey>(initialSurveyValue);
    const navigate = useNavigate();
    
    const surveyNameChanged = (elem: ChangeEvent<HTMLInputElement>) => {
        
        const value = elem.target.value;
        const copyOfMySurvey = {...mySurvey};
        copyOfMySurvey.name = value;
        setSurvey(copyOfMySurvey);
        
        // console.log(mySurvey);
    }

    const addQuestion = () => {
                            // console.log(mySurvey);
        const copyOfMySurvey = {...mySurvey};
        const numberInSurvey = copyOfMySurvey.questions.length +1;
        copyOfMySurvey.questions.push({questionID: Math.random(), text: '', answers: [], isMultipleChoice: false, numberInSurvey: numberInSurvey});
        
        setSurvey(copyOfMySurvey);
    }

    const removeQuestion = (questionNum: number) => {
        console.log("Question number to splice is " + questionNum)
        const indexOfQuestion = questionNum;
        const copyOfMySurvey = {...mySurvey};
        copyOfMySurvey.questions.splice(indexOfQuestion,1);   
        
        setSurvey(copyOfMySurvey);           

    }

    
    const onQuestionUpdated = (question: IQuestion, index: number) => {    
        
        const copyOfMySurvey = {...mySurvey};        
        copyOfMySurvey.questions[index] = question;
        
        setSurvey(copyOfMySurvey);        
        // console.log(copyOfMySurvey)
    }
   

    

    const submitSurvey = async () => {
        
        if(mySurvey.surveyID === 0){
            console.log('New Survey to Create. Send to api: ' + JSON.stringify(mySurvey));
            const response = await fetch('https://acsurvey.azurewebsites.net/api/surveys', { 
            method: 'POST',
            body: JSON.stringify(mySurvey),
            
            headers: {'Content-Type': 'application/json'}
            })

            //Nor does this one
            //headers: {'Access-Control-Allow-Origin': '*'}    
        
        // const data = await response.json();
        
        } else {
            console.log(`This isn't a new survey, it's one that's in the process of being updated, so I'm sending a put request not a post request. Send to API ${JSON.stringify(mySurvey)}`);
            const response = await fetch('https://acsurvey.azurewebsites.net/api/surveys/' + mySurvey.surveyID, { 
            method: 'PUT',
            body: JSON.stringify(mySurvey),            
            headers: {'Content-Type': 'application/json'}
            })
            console.log(response);
            // const data = await response.json();           

        }
        navigate("/");        

    }

    return (
        
        <div className="indent">
            
            <label><strong>Name of Survey:  </strong></label>
            <input placeholder="Name"  type="text" onChange={surveyNameChanged} value={mySurvey.name}></input>
            <br></br>
            {/* <p>{surveyJson}</p> */}
            <br/>
            {
                mySurvey.questions.map((q, index) => (
                    <QuestionBuilder 
                    key={q.questionID} 
                    questionNumber={index+1}
                    onQuestionUpdated={(question: IQuestion) => onQuestionUpdated(question, index)}
                    removeQuestion={(questionNum: number) => removeQuestion(index)}
                    initialQuestionValue={q}
                    />     
                    
                ))
            }

            <button id="addButton" onClick={() => addQuestion()}>Add Question</button>
           <br></br>
           <br></br>
            <button id="blueButton" onClick={() => submitSurvey()}>Submit Survey</button>
        </div>
    )
}

export default SurveyBuilder;