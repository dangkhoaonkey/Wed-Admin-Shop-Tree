import { useEffect, useState } from 'react';
import '../App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [User, setUser] = useState([]);

  const fetchUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" >Text</Navbar.Toggle>
        <Navbar.Brand href="">E-Plant</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname} as="ul">

            <Nav.Item as="li">
              <Nav.Link href="/">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/products">Sản phẩm</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="">Người dùng</Nav.Link>
            </Nav.Item>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <NavDropdown title={User.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Thay đổi thông tin</NavDropdown.Item>
              <NavDropdown.Item href="">Về chúng tôi</NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
