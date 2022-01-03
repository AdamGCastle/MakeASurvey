import React, { FunctionComponent } from "react";



interface Props {
    show: boolean
    title: string
    message: string
    confirm: any
    cancel: any
}


const DeleteSurvey : FunctionComponent<Props> = ({show, title, message, confirm, cancel}) => {

    if(! show){
        return <></>;
    }

    else {
        return(
            <div className="overlay">
                <div className="dialog">
                    <div className="dialog__content">
                        <h2 className="dialog__title">{title}</h2>
                        <p className="dialog__description">{message}</p>
                    </div>
                    <hr/>
                    <div className="dialog__footer">
                        <button onClick={cancel} className="dialog__cancel">Cancel</button>
                        <button onClick={confirm} className="dialog__confirm">Delete</button>
                        {/* <button>Cancel</button>
                        <button>Delete</button> */}
                    </div>
                </div>
            </div>
        )
    }

};

export default DeleteSurvey;