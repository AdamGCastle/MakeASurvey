import { ChangeEvent, FunctionComponent } from "react";
import { useState } from "react";
import AnswerBuilder from "./AnswerBuilder"
import { IQuestion, IAnswer } from "./models";




interface IQuestionUpdatedFunction{
    (updatedQuestion: IQuestion): void
}

interface IRemoveQuestionFunction{
     (questionNum: number): void
}

interface QuestionBuilderProps{
 
    questionNumber: number,
    onQuestionUpdated: IQuestionUpdatedFunction
    removeQuestion : IRemoveQuestionFunction 
    initialQuestionValue: IQuestion
}


//props down (prop drilling)
//events up

const QuestionBuilder: FunctionComponent<QuestionBuilderProps> = ({questionNumber, onQuestionUpdated, removeQuestion, initialQuestionValue}) => {

    const [myQuestion, setQuestion] = useState<IQuestion>(initialQuestionValue);

    const questionTextChanged = (elem: ChangeEvent<HTMLInputElement>) => {
        
        const value = elem.target.value;  
        const copyOfMyQuestion = {...myQuestion}; 
        copyOfMyQuestion.text = value;
        setQuestion(copyOfMyQuestion);
        onQuestionUpdated(copyOfMyQuestion);
    }

    const questionNumAnswersChanged = (e: ChangeEvent<HTMLInputElement>) => {
        
        const copyOfMyQuestion = { ...myQuestion};  
        // console.log(copyOfMyQuestion.text)
        
        copyOfMyQuestion.isMultipleChoice = e.target.checked;
        setQuestion(copyOfMyQuestion);
        
        onQuestionUpdated(copyOfMyQuestion);  
    }
   
   
    const addAnswer = () => {
        
        const copyOfMyQuestion = {...myQuestion};
        const ansNumber = copyOfMyQuestion.answers.length+1
        copyOfMyQuestion.answers.push({text: '', answerID: Math.random(), answerNumber: ansNumber});
        
        setQuestion(copyOfMyQuestion);
    }

    const removeAnswer = (answerID: number) => {
                
        console.log(`Hi! I'm the removeAnswer() function. The Answer ID I've been told to take out of the survey.questions.answers array is ${answerID}. Let's get on that now.`)
        const copyOfMyQuestion = {...myQuestion};
        const indexOfAnswer = copyOfMyQuestion.answers.findIndex(a => a.answerID === answerID);
        copyOfMyQuestion.answers.splice(indexOfAnswer,1);
        console.log(copyOfMyQuestion);
        
        setQuestion(copyOfMyQuestion);  
        onQuestionUpdated(copyOfMyQuestion); 

    }

    const onAnswerUpdated = (answer: IAnswer, index: number) => {

        const copyOfNewQuestion = {...myQuestion};        
        copyOfNewQuestion.answers[index] = answer;

        setQuestion(copyOfNewQuestion);
        onQuestionUpdated(copyOfNewQuestion);
        
    }    

    return (
        <div className="indent">
            <strong>Question {questionNumber}: </strong>
            <input type="text" placeholder="Enter question" className="bigtextbox" id={'q' + questionNumber} onChange={questionTextChanged} value={myQuestion.text}/>
            <br></br>
            
            
            <p></p>
            {
                myQuestion.answers.map((a, index) => (
                    
                    <AnswerBuilder
                     key={a.answerID} 
                     answerNumber={index+1} 
                     onAnswerUpdated={(answer: IAnswer) => onAnswerUpdated(answer, index)}
                     removeAnswer={(answerNumber: number) => removeAnswer(a.answerID)}
                     initialAnswerValue={a}                      
                     />         
                ))
            }
            <br></br>
            
            <div><button id="addButton" className="button" onClick={() => addAnswer()}>Add Answer</button></div>
            <br></br>
            <label>Let users select multiple answers: </label>
            <input type="checkbox" className="button" defaultChecked={myQuestion.isMultipleChoice} onChange={e => questionNumAnswersChanged(e)}></input>
            <br></br>
            <br></br>
            <button id="removeButton" className="button" onClick={() => removeQuestion(questionNumber)}>Remove Question</button>
            <br/>
            <br/>
        </div>
    )
}

export default QuestionBuilder;