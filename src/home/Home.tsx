
// import { useState, useEffect, useCallback } from "react";
import {Link } from 'react-router-dom';
import EditSelect from "./EditSelect";

const Home = () => { 
  
  return (
    <div>

      <div className="alignCentre">    
        <h1>Welcome to MakeASurvey</h1>

        <p>Create your very own survey and see which answers everyone picks!</p>    
          
          <Link to="/createsurvey">
            <button btn-large id="createButton" className="button">Make a New Survey!</button>
          </Link>  
        </div>
         
            
      <EditSelect />   

    </div>   
  )

};

export default Home;