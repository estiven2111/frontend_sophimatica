import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "react-fontawesome"; // Asegúrate de tener esta biblioteca de iconos instalada
import jwtDecode from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from "../context/themeContext";

const Logout = () => {
  const { resetInputValue, globalSearch, setindexProject, setAllProjects } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    resetInputValue();
    globalSearch("");
    try {
      localStorage.removeItem("token");
      const email = localStorage.getItem("email");
      await axios.get(`/proyect/logout?email=${email}`);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("doc_empleado");
      setindexProject(true)
      setAllProjects([])
      navigate("/"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Date.now();
        if (decodedToken.exp && currentTimestamp >= Number(decodedToken.exp * 1000)) {
          handleLogout();
        }
      }
    };

    checkTokenExpiration();
  }, []);

  return (
    <button onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} className="h-8 text-black"/>
    </button>
  );
};

export default Logout;