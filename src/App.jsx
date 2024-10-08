import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Signup from './pages/school/Signup.jsx'
import AddResult from './pages/school/AddResult.jsx'
import Result from './pages/school/Result.jsx'
import ListResult from './pages/school/ListResult.jsx'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/schoolSignup' element={<Signup />} />
        <Route path='/addResult' element={<AddResult />} />
        <Route path='/result' element={<Result />} />
        <Route path='/listResult/:id' element={<ListResult />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
