import './App.css';
import Users from './Users';
import UserCreate from './UserCreate'
import UserUpdate from './UserUpdate'
import axios from 'axios';
import { getUser } from './redux/userSlice';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4004/');
        dispatch(getUser(response.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Users/>}></Route>
      <Route path='/create' element={<UserCreate/>}></Route>
      <Route path='/edit/:id' element={<UserUpdate/>}></Route>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
