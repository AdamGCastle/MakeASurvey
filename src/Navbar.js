import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Navbar = () => {
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
}