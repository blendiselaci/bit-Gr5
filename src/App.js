import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Contact from './pages/Contact';
import Navbar from './components/NavBar/Navbar';
import AddStudent from './components/StudentsContent/AddStudent';
import Products from "./Context/Products";
import Footer from "./components/Footer/Footer";
import Authors from './pages/Authors';
import Basket from './components/Basket/Basket';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AddUser from './components/AddUser/AddUser';

function App() {
  return (
    <BrowserRouter>
      <Products>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/update/:idja" element={<AddStudent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/authors" element={<Authors />} />
          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path='/dashboard/add' element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }/> 
        </Routes>
        <Footer />
        <Basket />
      </Products>
    </BrowserRouter>
  );
}

export default App;
