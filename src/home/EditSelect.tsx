import { useState, useEffect, useCallback, FunctionComponent } from "react";
import {Link } from 'react-router-dom';


const EditSelect: FunctionComponent = () => {

    const [surveys, setSurveys] = useState([{name: '', surveyID: null }])
    const [isLoading, setIsLoading] = useState(false);  
    const [error, setError] = useState(null);

    const getSurveys = useCallback(async () => {
        try{
        setIsLoading(true);
        const response = await fetch('https://localhost:44322/api/Surveys')

        if(!response.ok) {
            throw new Error("Couldnt connect to the database.")
        }
        const data = await response.json();  

        const transformedData = data.map( (item: { name: string, surveyID: number }) => { return { name: item.name, surveyID: item.surveyID }});
            
            setSurveys(transformedData)
            setIsLoading(false);

        } catch(error: any) {
            setError(error.message);

        }
        setIsLoading(false);
  
    
    }, []);

    useEffect(() => {
        getSurveys()
    }, [getSurveys]);

    return (
        <div>
            <h4> Edit a Survey</h4>      

        <div>
        {!isLoading && surveys.length > 0 && surveys.map(s => 
        <div>
            <h4></h4>
            <span key={s.surveyID}>{s.name} </span>
            <Link to={`/editsurvey/${s.surveyID}`}>
            <button>Edit</button>
            </Link>
        </div>        
            
        )}
        {!isLoading && surveys.length === 0 && <p>There aren't any surveys yet.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{'Something went wrong trying to get a list of surveys.'}</p>}
        </div>

        </div>   

    )

}

export default EditSelect;

