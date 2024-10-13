import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/header'

function App() {

  return (
    <>
      <div className="container">
        <Header/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
