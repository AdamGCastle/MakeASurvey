import { ChangeEvent, FunctionComponent, useState } from "react";
import { IAnswer } from "./models";


interface IAnswerUpdatedFunction{
    (updatedAnswer: IAnswer, 
        ): void
}

interface IRemoveAnswerFunction{
    (answerNum: number): void;
}


interface AnswerBuilderProps{
    answerNumber: number,
    onAnswerUpdated: IAnswerUpdatedFunction,
    removeAnswer: IRemoveAnswerFunction,   
    initialAnswerValue: IAnswer
    
}

const AnswerBuilder: FunctionComponent<AnswerBuilderProps> = ({ answerNumber, onAnswerUpdated, removeAnswer, initialAnswerValue}) => {

    const [myAnswer, setAnswer] = useState<IAnswer>(initialAnswerValue);

    const answerTextChanged = (elem: ChangeEvent<HTMLInputElement>) => {

        const value = elem.target.value;        
        const copyOfMyAnswer = {...myAnswer};
        copyOfMyAnswer.text = value;         
        setAnswer(copyOfMyAnswer);
        onAnswerUpdated(copyOfMyAnswer);        
    }

    return (
        
        <div className="indent">
            Answer {answerNumber}  :<span>   </span>
            <input type="text" className="textbox" id={'a' + answerNumber} value = {myAnswer.text} onChange={answerTextChanged} />
            
            <div><button id="removeButton" onClick={() => removeAnswer(myAnswer.answerID)}>Remove Answer</button></div>
            <br></br>
        </div>
    )

}

export default AnswerBuilder;