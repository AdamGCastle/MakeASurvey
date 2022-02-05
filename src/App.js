import './App.css';
import { Routes, Route, Outlet} from "react-router-dom";
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
      <Layout />
      <div className="card">                        
          <Routes>
            {/* <Route path="/" element={<Layout/>}> */}
              <Route path="/" element={<Home/>}/>
              <Route path="/createsurvey/" element={CreateSurvey()} />
              <Route path="/editsurvey/:id" element={<EditSurvey />}/>
              <Route path="/editsurveys" element={<EditSelect />}/>
              <Route path="*" element = {NotFound()} />
            {/* </Route> */}
          </Routes>               
      </div>      
    </main>    
   
  );
}

function Layout() {
  return (
    <div>
      <Navbar bg="light" className='justify-content-center'>
        <Navbar.Brand>
          {/* <Nav.Link href="https://adamcastleprojects.azurewebsites.net/">Adam Castle CV</Nav.Link> */}
        </Navbar.Brand>    
        <Nav>
          <NavDropdown title="Projects">
            <NavDropdown.Item href="https://adamcastleprojects.azurewebsites.net/">All projects</NavDropdown.Item>
            <NavDropdown.Item href="https://takeasurvey.azurewebsites.net/">TakeASurvey</NavDropdown.Item>
            <NavDropdown.Item href="https://castlelibrary.azurewebsites.net/">CastleLibrary</NavDropdown.Item>
            <NavDropdown.Item href="https://teacheradmin.azurewebsites.net/">TeacherAdmin</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/createsurvey">New survey</Nav.Link>  
        </Nav>
      </Navbar>
      {/* <hr/> */}
      {/* <Outlet/>      */}

    </div>
  
  
  )
}


// <nav className='nav justify-content-center'>
    // <NavLink to="/">Home</NavLink>
    // <NavLink to="/createsurvey">Make a survey</NavLink>
    // <NavLink to ="/editsurveys">Edit a survey</NavLink>
    //</nav>


