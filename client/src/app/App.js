import React from 'react';
import Mainpage from '../pages/mainPage';
import Addpage from '../pages/addPage';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
     <Router>
      <Routes> 
       <Route path='/' element={<Mainpage/>}></Route>
       <Route path='/addpage' element={<Addpage/>}></Route>
      </Routes>
    </Router> 
  );
}

export default App;
