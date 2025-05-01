import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FiPlus } from "react-icons/fi";

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
            /> SATU AKADEMIK

          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-4" >
            <Nav.Link href="/Home" className="fw-bold " >Home</Nav.Link>
            <Nav.Link href="#program" className="fw-bold"> Program</Nav.Link>
            <Nav.Link href="/About" className="fw-bold" >About</Nav.Link>
            <NavDropdown title="Profil Lainnya" id="basic-nav-dropdown" className='fw-bold'> 
              <NavDropdown.Item className='fw-semibold' href="/Kemahasiswaan">Kemahasiswaan</NavDropdown.Item>
              <NavDropdown.Item className='fw-semibold' href="/TenagaPengajar">Tenaga Pengajar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
