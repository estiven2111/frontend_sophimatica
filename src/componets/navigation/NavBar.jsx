import { useState } from "react";
import { NavLink,Link } from "react-router-dom";
import { MdPayment, MdLogin } from "react-icons/md";
import { TbForms } from "react-icons/tb";
import { SlBadge } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { IoMenuSharp } from "react-icons/io5";
import icon from "../../assets/img/icon.png"
import SearchBar from "../searchBar/searchBar";
import WelcomeBar from "./welcomeBar";
import Logout from "./logout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  let activeStyle = {
    color: "white",
    fontWeight: "bold",
    paddingBottom: "2px",
    borderBottom: "2px solid ",
  };
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="z-20 sticky top-0 left-0 w-full">
   
      <div className="">
        <div className="">
          <div className="flex w-full justify-between items-center px-5 bg-white text-black">
            <div className="">
                <Link to="/" >
                  <img
                    className="w-40 md:w-60"
                    src={icon}
                    alt="logo"
                  />
                </Link>
            </div>
            
            <div className="flex flex-row md:w-full text-white md:hidden">
              <div className="flex md:hidden text-right items-center">
                <WelcomeBar/>
                <Logout/>
              </div>

              <div className="hidden gap-5 md:flex md:col-span-2">
                <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  <div className="cursor-pointer  hover:scale-105 duration-200 px-5">
                    Actividades
                  </div>
                </NavLink>
                <NavLink to="/gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  <div className="cursor-pointer  hover:scale-105 duration-200  px-5">
                   Gastos
                  </div>
                </NavLink>
                <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  <div className="cursor-pointer  hover:scale-105 duration-200 px-5">
                  Gráficas
                  </div>
                </NavLink>
              </div>
            </div>
            
            <div className="hidden md:flex lg:flex-row items-center" >
              <WelcomeBar/>
              <Logout/>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 text-gray-500 px-5 py-3 bg-azulCreame">
          <NavLink to="/actividades" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
             <FontAwesomeIcon icon={faListCheck}/>
                Actividades
             </div>
           </NavLink>
           <NavLink to="/gastos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
               <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
               Gastos
             </div>
           </NavLink>
           <NavLink to="/indicadores" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
             <div className="flex flex-col gap-1 items-center mb-2 hover:text-lightblueone cursor-pointer">
               <FontAwesomeIcon icon={faChartLine} />
               Indicadores
             </div>
           </NavLink>
        </div>
      <div className="flex justify-center">
        <SearchBar/>
      </div>
    </div>
  );
}

export default NavBar
