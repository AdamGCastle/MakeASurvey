import { IViewSurvey, IViewQuestion, IViewAnswer } from "./view-survey-models";
import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import NotFound from "../home/NotFound";

const ViewSurvey: FunctionComponent = () => {

    const { id } = useParams();
    const [surveyToView, setSurveyToView] = useState<IViewSurvey>()
    const [isLoading, setIsLoading] = useState(false);  
    const [error, setError] = useState(null);    
    const navigate = useNavigate();


    const getSurvey = useCallback(async () => {        

        if(id === null) {
            console.log(`no id parameter`)
            return < NotFound/>
        }
        try{
          setIsLoading(true);
          const baseUrl = process.env.REACT_APP_API_BASE_URL;
          const response = await fetch(`${baseUrl}/Surveys/${id}`);
  
          if(!response.ok) {
              throw new Error("Couldn't connect to the database.");
          }
          const data = await response.json(); 
          console.log(data) 
  
        //   const transformedData = data.map( (item: { name: string, surveyID: number }) => { return { name: item.name, surveyID: item.surveyID }});
            
            setSurveyToView(data)
            setIsLoading(false);
  
        } catch(error: any) {
            setError(error.message);
  
        }
        setIsLoading(false);
      
        
    }, [id]);

    useEffect(() => {
        getSurvey()
    }, [getSurvey]);

    return (
        <div>
            <h1>View</h1>
            <h2>{surveyToView?.name}</h2>
            <p>Total responses: {surveyToView?.totalResponses}</p>
            <br></br>
            {isLoading && <p>Loading...</p>}
            {surveyToView != null && 
                <div>
                    {surveyToView.questions.map((q, index) => (
                        <div>
                        <h5>{q.text}</h5>
                        <p>Total Responses: {q.totalResponses}</p>                        
                        </div>
                    )                    

                    )}

                </div>
                }
            {!isLoading && error && <p>{'Something went wrong trying to get the survey you wanted to view.'}</p>}

        </div>
    )
}

export default ViewSurvey;