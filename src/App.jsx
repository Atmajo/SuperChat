import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './component/Home';
import Picker from './picker';
import Signin from './component/Signin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<Signin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App