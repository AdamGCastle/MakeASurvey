
import { useState, useEffect, useCallback } from "react";
import {Link } from 'react-router-dom';
import EditSurvey from "../edit-survey/EditSurvey";
import EditSelect from "./EditSelect";

const Home = () => {

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
    
      <h1>Welcome to the Home Page!</h1>

      <p>You can either edit an existing survey, or create a new one!</p>

      <Link to="/createsurvey">
        <button >Create a New Survey!</button>
      </Link>    

      <EditSelect />

      

    </div> 
  
  )

};

export default Home;