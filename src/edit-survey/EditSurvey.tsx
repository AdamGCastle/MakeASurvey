import SurveyBuilder from "../create-survey/SurveyBuilder";
import { ISurvey } from "../create-survey/models";
import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import NotFound from "../home/NotFound";
import DeleteSurvey from "./DeleteSurvey";



const EditSurvey: FunctionComponent = () => {

    const { id } = useParams();
    const [surveyToEdit, setSurveyToEdit] = useState<ISurvey>()
    const [isLoading, setIsLoading] = useState(false);  
    const [error, setError] = useState(null);
    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
    const navigate = useNavigate();


    const getSurvey = useCallback(async () => {        

        if(id === null) {
            console.log(`no id parameter`)
            return < NotFound/>
        }
        try{
          setIsLoading(true);
          const response = await fetch('https://acsurvey.azurewebsites.net/api/Surveys/' + id)
  
          if(!response.ok) {
              throw new Error("Couldn't connect to the database.")
          }
          const data = await response.json(); 
          console.log(data) 
  
        //   const transformedData = data.map( (item: { name: string, surveyID: number }) => { return { name: item.name, surveyID: item.surveyID }});
            
            setSurveyToEdit(data)
            setIsLoading(false);
  
        } catch(error: any) {
            setError(error.message);
  
        }
        setIsLoading(false);
      
        
    }, [id]);

    useEffect(() => {
        getSurvey()
    }, [getSurvey]);

    const confirm = async () => {
        //send delete request to api
        //return to home page

        try{
            const response = await fetch('https://acsurvey.azurewebsites.net/api/Surveys/' + id, {
                method: 'DELETE'
            })
  
          if(!response.ok) {
              throw new Error("Couldnt connect to the database. Delete unsuccessful.")
            } else {
            setShowDeleteDialogue(false);     
            navigate("/");          
            }

        } catch(error: any) {
            setError(error.message);    
        
        }
    }
    const cancel = () => {        
        setShowDeleteDialogue(false);
    }
    


    return (
        <div>
            <h1>Edit</h1>
            <h2>{surveyToEdit?.name}</h2>
            <br></br>
            {isLoading && <p>Loading...</p>}
            {surveyToEdit != null && < SurveyBuilder initialSurveyValue={surveyToEdit}/>}
            {!isLoading && error && <p>{'Something went wrong trying to get the survey you wanted to edit.'}</p>}
            <br></br>
            <button onClick={()=> { setShowDeleteDialogue(true)}}>Delete Survey</button>            

            <DeleteSurvey
             show={showDeleteDialogue}
             title="Delete Survey"
             confirm={confirm}
             cancel={cancel}
             message="Are you sure you want to delete this survey?" />
        </div>
    )

    

}
export default EditSurvey;