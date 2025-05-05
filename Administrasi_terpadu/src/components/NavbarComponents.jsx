import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../Dist/Home.css"

function NavbarComponents() {
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && !event.target.closest('.navbar')) {
        setExpanded(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expanded]);
  
  return (
    <Navbar 
      expand="lg" 
      className="shadow py-2 sticky-top" 
      bg="white"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container fluid className="px-3 px-md-5">
        <Navbar.Brand href="/Home" className="d-flex align-items-center fw-bold text-success">
          <img
            alt="Logo"
            src="src/assets/unimal.png"
            width="45"
            height="45"
            className="d-inline-block align-middle me-2"
          /> 
          <span className="brand-text">SATU AKADEMIK</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="navbarScroll" 
          className="border-0 shadow-none" 
        />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link 
              href="/Home" 
              className="fw-semibold px-3 py-2 text-dark" 
              active={window.location.pathname === '/Home'}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#program" 
              className="fw-semibold px-3 py-2 text-dark"
            >
              Program
            </Nav.Link>
            <Nav.Link 
              href="/About" 
              className="fw-semibold px-3 py-2 text-dark" 
              active={window.location.pathname === '/About'}
            >
              About
            </Nav.Link>
            
            <NavDropdown 
              title={<span className="dropdown-title">Profil Lainnya</span>} 
              id="basic-nav-dropdown" 
              className="fw-semibold custom-dropdown"
              align={{ lg: 'end' }}
            >
              <NavDropdown.Item 
                className="dropdown-item-custom" 
                href="/Kemahasiswaan"
              >
                Kemahasiswaan
              </NavDropdown.Item>
              <NavDropdown.Item 
                className="dropdown-item-custom" 
                href="/TenagaPengajar"
              >
                Tenaga Pengajar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
