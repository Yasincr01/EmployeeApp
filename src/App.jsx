import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Add from './components/Add'; 
import Edit from './components/Edit';

function App() {
  return (
   
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} /> 
        <Route path="/" element={<Home />} /> 
      </Routes>
  
    
  );
}

export default App;