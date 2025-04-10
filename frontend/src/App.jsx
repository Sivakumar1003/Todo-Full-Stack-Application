import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Provider } from 'react-redux'
import { store } from './config/store';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App