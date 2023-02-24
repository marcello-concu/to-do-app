import { RouterProvider, Outlet, createBrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from '../src/components/Footer'
import Home from '../src/pages/Home'
import WriteTask from './pages/WriteTask'

const PageLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter ([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/write', element: <WriteTask /> }
    ]
  }
])

function App() {
  return (
    <div className="app">
      <RouterProvider className='container' router={router} />
    </div>   
  );
}

export default App;
