
// import { useState, useEffect, useCallback } from "react";
import {Link } from 'react-router-dom';
import EditSelect from "./EditSelect";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


const Home = () => { 
  
  return (
    <div>

      <div className="alignCentre">    
        <h1>Welcome to MakeASurvey</h1>
        <br></br>        
        <p>Create your very own survey and see which answers everyone picks!</p>    
        <br></br>
        <Link to="/createsurvey">
          <Button variant="primary" size="lg">Make a New Survey</Button>
        </Link> 
        <br></br>
        <br></br> 
        <br></br>
        <EditSelect />  
      </div> 

    </div>   
  )

};

export default Home;