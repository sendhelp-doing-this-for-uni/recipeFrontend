import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="pozadina">
      <Navbar className="navigacija">
        <NavbarBrand href="/">Recepti</NavbarBrand>{' '}
      </Navbar>
      <div className="App">
        <div className="App-header">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
