import { ChangeEvent, FunctionComponent } from "react";
import { useState } from "react";
import AnswerBuilder from "./AnswerBuilder"
import { IQuestion } from "./models";

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
        
        copyOfMyQuestion.IsMultipleChoice = e.target.checked;
        setQuestion(copyOfMyQuestion);
        
        onQuestionUpdated(copyOfMyQuestion);  
    }
   
   
    const addAnswer = () => {
        
        const copyOfMyQuestion = {...myQuestion};
        copyOfMyQuestion.answers.push({text: ''});
        
        setQuestion(copyOfMyQuestion);
    }

    const onAnswerUpdated = (answerText: string, index: number) => {

        const copyOfNewQuestion = {...myQuestion};
        copyOfNewQuestion.answers[index].text = answerText;

        setQuestion(copyOfNewQuestion);
        onQuestionUpdated(copyOfNewQuestion);
        
    }
    

    return (
        <div>
            Enter question {questionNumber}:
            <input type="text" id={'q' + questionNumber} onChange={questionTextChanged} value={myQuestion.text}/>
            <br></br>
            <br></br>
            <label>Enable users to select multiple answers: </label>
            <input type="checkbox" onChange={e => questionNumAnswersChanged(e)}></input>
            {
                myQuestion.answers.map((a, index) => (
                    <AnswerBuilder
                     key={index} 
                     answerNumber={index+1} 
                     onAnswerUpdated={(answerText: string) => onAnswerUpdated(answerText, index)}
                     initialAnswerValue={initialQuestionValue.answers[index]} 
                     />         
                ))
            }
            <br></br>
            
            <div><button onClick={() => addAnswer()}>Add Answer</button></div>
            <div> <button onClick={() => removeQuestion(questionNumber)}>Remove Question</button></div>
            <br/>
            <br/>
        </div>
    )
}

export default QuestionBuilder;