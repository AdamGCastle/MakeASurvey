import { ChangeEvent, FunctionComponent } from "react";
import { IAnswer } from "./models";


interface IAnswerUpdatedFunction{
    (updatedAnswerText: string, 
        ): void
}


interface AnswerBuilderProps{
    answerNumber: number,
    onAnswerUpdated: IAnswerUpdatedFunction
    initialAnswerValue: IAnswer
    
}

const AnswerBuilder: FunctionComponent<AnswerBuilderProps> = ({ answerNumber, onAnswerUpdated, initialAnswerValue}) => {

    const answerTextChanged = (elem: ChangeEvent<HTMLInputElement>) => {
        const value = elem.target.value;        
        onAnswerUpdated(value);
        
    }


    return (
        
        <div>
            Enter answer {answerNumber}:
            <input type="text" id={'a' + answerNumber} value = {initialAnswerValue.text} onChange={answerTextChanged} />
        </div>
    )

}

export default AnswerBuilder;