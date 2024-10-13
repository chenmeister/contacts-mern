import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import ErrorPage from './error-page.jsx';
import AddEditContact from './pages/addEditContact'
import ContactsList from './pages/contactsList'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [{
      path: "/",
      element: <ContactsList/>
    }]
  },
  {
    path: "/addContact",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [{
      path: "/addContact",
      element: <AddEditContact/>
    }]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
