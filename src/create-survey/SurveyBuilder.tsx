import { useState, FunctionComponent } from "react";
import QuestionBuilder from "./QuestionBuilder";
import { ChangeEvent } from "react";
import { IQuestion, ISurvey } from "./models";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



interface SurveyBuilderProps{       
    initialSurveyValue: ISurvey
}

const SurveyBuilder: FunctionComponent<SurveyBuilderProps> = ({initialSurveyValue}) => {

    const [mySurvey, setSurvey] = useState<ISurvey>(initialSurveyValue);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    
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
        copyOfMySurvey.questions.push({questionID: Math.random(), text: '', answers: [], isMultipleChoice: false});
        
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

               
        mySurvey.questions.forEach(q => {
            q.questionID = q.questionID < 1 ? 0 : q.questionID;
            q.answers.forEach(a => {                
                a.answerID = a.answerID < 1 ? 0 : a.answerID;                              
            });            
        });

        if(mySurvey.surveyID === 0){
            
            try{
                setIsLoading(true);
            console.log('New Survey to Create. Send to api: ' + JSON.stringify(mySurvey));
            const response = await fetch('https://acsurvey.azurewebsites.net/api/Surveys', { 
            method: 'POST',
            body: JSON.stringify(mySurvey),
            
            headers: {'Content-Type': 'application/json'}
            })
            console.log(response);
            if(!response.ok) {
                throw new Error("Couldn't connect to the database.")
            }
            setIsLoading(false);
  
        } catch(error: any) {
            setError(error.message);
  
        }
        setIsLoading(false);


            //Nor does this one
            //headers: {'Access-Control-Allow-Origin': '*'}    
        
        // const data = await response.json();
        
        } else {
            console.log(`This isn't a new survey, it's one that's in the process of being updated, so I'm sending a put request not a post request. Send to API ${JSON.stringify(mySurvey)}`);
            const response = await fetch('https://acsurvey.azurewebsites.net/api/Surveys/' + mySurvey.surveyID, { 
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
        
        <div>
            {!isLoading && <div>
                <div className="indent">                
                    <strong> Name of Survey:  </strong>
                    <input placeholder="Enter the name of your survey" className="medtextbox" type="text" onChange={surveyNameChanged} value={mySurvey.name}></input>
                    
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

                    <br/>
                    <Button variant="success" size="sm" className="addRemoveButton" onClick={() => addQuestion()}>Add Question</Button>
                    <br/>
                    <br/> 
                </div>  
                <div className="alignCentre">
                    <Button variant="primary" onClick={() => submitSurvey()}>Submit Survey</Button> 
                </div>   
                <div>{error}</div>         
                        
            </div>}
            {isLoading &&<div>
                <p>Loading...this may take a few seconds...</p>

            </div>}
        </div>
        
    )
}

export default SurveyBuilder;