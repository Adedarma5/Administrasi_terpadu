import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponents() {
  return (
    <Navbar expand="lg" className='shadow'>
      <Container fluid className='px-5' >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Navbar.Brand href="/Home" className="d-flex align-items-center gap-2 fw-bold text-success   ">
            <img 
              alt=""
              src="src/assets/unimal.png"
              width="50"
              height="50"
              className="d-inline-block align-center "
            /> SIATSI
            
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-4" >
            <Nav.Link href="/Home" className="fw-bold " >Home</Nav.Link>
            <Nav.Link href="#program" className="fw-bold" >Program</Nav.Link>
            <Nav.Link href="/About" className="fw-bold" >About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
