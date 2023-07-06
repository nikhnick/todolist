import './App.css';
import ToDoList from './component/home';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.svg';
import Footer from './component/footer';

function App() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Task Master
          </Navbar.Brand>
        </Container>
      </Navbar>
    <ToDoList />
    <Footer />
    </>
  );
}

export default App;
