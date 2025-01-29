// import { useDispatch } from "react-redux";
// import { loginMicrosoft } from "../redux/reducer/login.slice";
import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

// const LoginMicrosoft = () => {
//   // const { getTopSecret } = useContext(ThemeContext);

//   const URLS =
//     "https://syncronizabackup-production.up.railway.app/user/api/validation";

//   const popup = window.open(
//     `${URLS}`,
//     "_blank",
//     `location=none width=620 height=700 toolbar=no status=no menubar=no scrollbars=yes resizable=yes`
//   );

//   window.addEventListener("message", async (event) => {
//     if (event.origin === `https://syncronizabackup-production.up.railway.app`) {
//       if (event.data) {
//         console.log(event.data, "datos dentro de loginmicrosoft");
//         localStorage.setItem("tokenMicrosoft", event.data.accessToken)
//         // getTopSecret(event.data);
//         popup.close();
//       }
//     }
//   });
// };

// export default LoginMicrosoft;


const LoginMicrosoft = () => {
  return new Promise((resolve, reject) => {
    const URLS =
      // "https://incentivos.creame.com.co:5000/user/api/validation";
      "https://appincentivos.creame.com.co/user/api/validation";
      // "https://syncronizabackup-production.up.railway.app/user/api/validation";

    const popup = window.open(
      `${URLS}`,
      "_blank",
      `location=none width=620 height=700 toolbar=no status=no menubar=no scrollbars=yes resizable=yes`
    );

    const messageHandler = async (event) => {
      if (event.origin === `https://appincentivos.creame.com.co`) {
        // if (event.origin === `https://syncronizabackup-production.up.railway.app`) {
        if (event.data) {
          popup.close();
          resolve(event.data); // Resuelve la promesa con los datos que recibiste
        }
      }
    };

    // Agrega el manejador de eventos
    window.addEventListener("message", messageHandler);

    // Si se produce un error, puedes rechazar la promesa
    // reject(error);
  });
};

export default LoginMicrosoft;



