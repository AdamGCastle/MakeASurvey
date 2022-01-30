
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Home from './home/Home';
import CreateSurvey from './create-survey/CreateSurvey';
import EditSurvey from './edit-survey/EditSurvey';
import NotFound from './home/NotFound';
import EditSelect from './home/EditSelect';


export default function App() {
  return (    
    
    <main>
      <div className="main">       
          <Navbar />
         
         <div className="card">

         
          <Routes>
            <Route path="/" element={Home()} />
            <Route path="/createsurvey" element={CreateSurvey()} />
            <Route path="/editsurvey/:id" element={<EditSurvey />}/>
            <Route path="/editsurveys" element={<EditSelect />}/>
            <Route path="*" element = {NotFound()} />
          </Routes>

         </div>

        
        
      </div>      
    </main>    
   
  );
}

function Navbar() {
  return (
  <nav className='nav'>
    <NavLink to="/"> Home | </NavLink>
    <NavLink to="/createsurvey"> Create a Survey | </NavLink>
    <NavLink to ="/editsurveys"> Edit a Survey </NavLink>
  </nav>
  )
}



