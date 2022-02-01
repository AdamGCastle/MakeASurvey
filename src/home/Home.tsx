
// import { useState, useEffect, useCallback } from "react";
import {Link } from 'react-router-dom';
import EditSelect from "./EditSelect";

const Home = () => { 
  
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