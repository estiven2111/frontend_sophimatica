import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import icon from "../../assets/img/icon.png"
import swal from "sweetalert";
import { useDispatch,useSelector } from "react-redux";
import { loginredux } from "../redux/reducer/login.slice";
import "../../index.css";
import { ThemeContext } from '../context/themeContext';
const Login = () => {
  const { setAuthenticated, setindexProject} = useContext(ThemeContext);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(false);
    const navigation = useNavigate();
    const {date_login} = useSelector((state) => state.loginSlice)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setTimeout(() => {
      handleGetToken(localStorage.getItem("ruta"));
      setindexProject(true)
    }, 0);
  }, []);

  const handleGetToken = (ruta) => {
    const datatoken = localStorage.getItem("token");
    if (!datatoken) {
        navigation("/");
    } else {
        setAuthenticated(true)
        navigation(ruta);
        // navigation("/actividades");
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
    setIsLoading(true)
    const response = await dispatch(loginredux(user, password ))
   localStorage.setItem("name", response.userName)
   localStorage.setItem("token", response.token)
   localStorage.setItem("email", response.userEmail)
   localStorage.setItem("doc_empleado", response.doc_empleado)
    setPassword("");
    setIsLoading(false)
    setAuthenticated(true)
    navigation("/actividades");
    } catch (error) {
      setIsLoading(false)
    }
    
  };

  return (
    <div className="w-full">
      {isLoading 
      ?
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <div className="loader"></div>
        </div>
      : null}
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen h-full md:pb-10">
        <a href="" className="flex items-center mb-6 text-2xl font-semibold text-white max-w-[550px]">
          <img className="" src={icon} alt="" />
        </a>
        <div className="w-full bg-azulCreame rounded-lg shadow md:mt-0 max-w-md xl:p-0">
          <div className="p-6 space-y-4 max-width-[448px] md:space-y-6 sm:p-8">
            <h1 className="text-xl leading-tight text-white md:text-4xl text-center font-Horatio">
                Bienvenido
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                  <label htmlFor="email" className="block mb-2 text-lg text-white font-Horatio">Usuario</label>
                  <input type="email" name="email" value={user} onChange={(event)=>setUser(event.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-lg text-white font-Horatio">Contraseña</label>
                  <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}  id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
              </div>
              <div className="flex items-center justify-between">
              </div>
              <div className="flex justify-center">
                <button onClick={handleLogin} className="w-4/5 text-white bg-naranjaCreame focus:outline-none focus:scale-95 transition font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:shadow-inner-lg-red-500 ">Iniciar</button>
              </div>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;