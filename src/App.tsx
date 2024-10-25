import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <RouterConfig />
      <ToastContainer autoClose={1500} style={{ fontSize: "17px" }} />
    </>

  )
}

export default App
