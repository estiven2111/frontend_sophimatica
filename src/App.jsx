/* eslint-disable no-unused-vars */
// import { ThemeProvider } from "./componets/context/themeContext";

import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./componets/navigation/NavBar";
import Login from "./componets/authentication/Login";
import Gastos from "./componets/gastos/gastos";
import Actividades from "./componets/actividades/actividades";
import Indicadores from "./componets/indicadores/indicadores";

import Footer from "../src/componets/navigation/footer"
import { ThemeContext } from './componets/context/themeContext';
import { useContext } from "react";

function App() {
  const location = useLocation()
  const { isAuthenticated } = useContext(ThemeContext);

  return (
      <div className='w-full min-h-screen'  >
        {location.pathname === "/" ? <Login /> :<NavBar/>}
          <Routes>
            <Route path="/gastos" element={isAuthenticated 
              ? (<Gastos />) : (<Navigate to="/" replace={true} />)} 
            />
            <Route path='/actividades' element= {isAuthenticated 
              ? (<Actividades />) : (<Navigate to="/" replace={true} />)} 
             />
            <Route path='/indicadores' element= {isAuthenticated 
              ? (<Indicadores />) : (<Navigate to="/" replace={true} />)} 
            />
          </Routes>
          <Footer/>
      </div>
  )
}

export default App
