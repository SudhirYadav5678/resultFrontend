import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
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
