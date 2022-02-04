import { ChangeEvent, FunctionComponent, useState } from "react";
import { IAnswer } from "./models";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        
        <div className="indent answerBox">
            Answer {answerNumber}  :<span>   </span>
            <input type="text" placeholder="Enter answer" className="bigtextbox" id={'a' + answerNumber} value = {myAnswer.text} onChange={answerTextChanged} />
            <Button className="addRemoveButton" variant="danger" size="sm" onClick={() => removeAnswer(myAnswer.answerID)}>Remove Answer</Button>
            <br></br>
            <br></br>
            
        </div>
    )

}

export default AnswerBuilder;