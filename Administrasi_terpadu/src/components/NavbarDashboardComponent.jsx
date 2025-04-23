import { Navbar, Container, Nav } from "react-bootstrap";

function NavbarDashboardComponent() {
    return (
        <Navbar expand="lg" className="bg-dark py-1 " >
            <Container >
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#logout" className="text-danger">Logout </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarDashboardComponent;