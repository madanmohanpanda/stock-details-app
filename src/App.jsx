import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home'
import Quotes from './pages/Quotes';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/quotes/:symbol'  element={<Quotes />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
