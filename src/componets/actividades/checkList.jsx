import { ThemeContext } from "../context/themeContext";
import React, { useState, useEffect, useContext } from "react";
import Tarea from "./tarea";
import axios from "axios";

const Checklist = () => {
  // const [response, setResponse] = useState([]);
  const {
    finalValue,
    globalSearch,
    globalOptions,
    showOptions,
    indice,
    setindexProject,
    response,
    doc,
    proyectos,
    setAllProjects,
    finishedHandler,
  } = useContext(ThemeContext);

  useEffect(() => {
    const constulta = async () => {
      if (!proyectos.length) {
        if (localStorage.getItem("email")) {
          const nomproyecto = await axios.get(
            `/proyect/nomProyect?email=${localStorage.getItem("email")}`
          );
          setAllProjects(nomproyecto.data);
        }
      }
    };
    constulta();
  }, []);

  const [numberOfLines, setNumberOfLines] = useState(true);
  const handlePress = () => {
    setNumberOfLines(!numberOfLines);
  };

  const handleSelect = async (e) => {
    await globalSearch(e.target.innerText);
    await finalValue(e.target.innerText);
    setTimeout(() => {
      globalOptions(false);
    }, 2000);
  };

  return (
    <div className="">
      {indice ? (
        <div className="pt-4">
          <p className="py-4 text-center font-bold font-Horatio text-4xl text-darkGrayCreame">
            ÍNDICE DE PROYECTOS
          </p>
          <ol className="list-decimal">
            {proyectos.length > 0 &&
              proyectos.map((proyecto, index) => (
                <li
                  key={index}
                  className="bg-darkGrayCreame my-2 flex flex-row rounded-lg border-turquesaCreame border-2 font-Horatio"
                >
                  <div className="flex items-center justify-center w-20 text-3xl text-turquesaCreame font-bold">
                    {index + 1}
                  </div>
                  <div className="rounded-r-lg pt-4 bg-naranjaCreame w-full">
                    <div
                      onClick={handleSelect}
                      className="cursor-pointer bg-white p-4 rounded-br-lg"
                    >
                      {proyecto}
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      ) : (
        response?.map((pro, index) => (
          <div key={index} className="">
            {pro.componentes.map((compo, index) => (
              <div key={index} className="">
                {compo.actividades.some((item) => item.terminada === false) ? (
                  <div className="mb-5 bg-azulCreame rounded-lg text-white border-turquesaCreame border-2 shadow-lg">
                    <>
                      <div className="flex items-center m-2">
                        <p className="mr-3 text-xs sm:text-base break-normal min-w-fit font-Horatio">
                          {compo.fecha}
                        </p>
                        <p
                          onClick={handlePress}
                          className={`text-white ${
                            numberOfLines ? "truncate" : ""
                          } text-white cursor-pointer text-xs sm:text-base no-underline font-Horatio`}
                        >
                          {compo.componente}
                        </p>
                      </div>
                      {compo.actividades.map((act, ind) =>
                        !act.terminada ? (
                          <div key={ind} className="bg-white m-2 p-1 rounded">
                            <Tarea
                              proyecto={pro.proyecto}
                              skuP={pro.skuP}
                              componente={compo.componente}
                              nitCliente={pro.nitCliente}
                              documentoEmpleado={doc}
                              idNodoProyecto={pro.idNodoP}
                              idNodoActividad={act.idNodoA}
                              Cod_Parte={act.Codi_parteA}
                              actividad={act.actividad}
                              entregable={act.entregable}
                              listaEntregable={act.nombre_entregable}
                              finishedUpdate={finishedHandler}
                            />
                          </div>
                        ) : null
                      )}
                    </>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Checklist;
