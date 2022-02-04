import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from './home/Home';
import CreateSurvey from './create-survey/CreateSurvey';
import EditSurvey from './edit-survey/EditSurvey';
import NotFound from './home/NotFound';
import EditSelect from './home/EditSelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function App() {
  return (      
    
    <main className='main'>          
      <NavigationBar />    
      <div className="card">                        
          <Routes>
            <Route path="/" element={Home()} />
            <Route path="/createsurvey" element={CreateSurvey()} />
            <Route path="/editsurvey/:id" element={<EditSurvey />}/>
            <Route path="/editsurveys" element={<EditSelect />}/>
            <Route path="*" element = {NotFound()} />
          </Routes>          
        
      </div>      
    </main>    
   
  );
}

function NavigationBar() {
  return (
    <div>
      <Navbar bg="light" className='justify-content-center'>
        <Navbar.Brand>
         
        </Navbar.Brand>    
        <Nav>
          <NavDropdown title="Prjoects">
            <NavDropdown.Item href="https://takeasurvey.azurewebsites.net/">TakeASurvey</NavDropdown.Item>
            <NavDropdown.Item href="https://castlelibrary.azurewebsites.net/">CastleLibrary</NavDropdown.Item>
            <NavDropdown.Item href="https://castlelibrary.azurewebsites.net/">TeacherAdmin</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/createsurvey">New survey</Nav.Link>  
        </Nav>
      </Navbar>
      

    </div>
  
  
  )
}


// <nav className='nav justify-content-center'>
    // <NavLink to="/">Home</NavLink>
    // <NavLink to="/createsurvey">Make a survey</NavLink>
    // <NavLink to ="/editsurveys">Edit a survey</NavLink>
    //</nav>


