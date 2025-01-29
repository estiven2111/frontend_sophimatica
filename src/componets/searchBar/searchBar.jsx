import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import axios from 'axios';
// import api from '../../api/api';

const SearchBar = () => {
  const { indice, setindexProject, finishedHandler, finishedUpdate, inputValue, finalValue, searchText, globalSearch, showOptions, globalOptions, todosAnticipos, todasLasFechas, setProjectData, response, setNewResponse, doc, setDocument } = useContext(ThemeContext);
  const [options, setOptions] = useState([]);
  // const [doc, setDoc] = useState('');


  useEffect(() => {
    finalValue('');
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const user_name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const response = await axios.get(`/proyect?search=${searchText}&email=${email}`);
        const data = await response.data;
        setOptions(data.map(pro => pro.proyecto));
        globalOptions(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchText === '') {
      globalOptions(false);
    } else if (!options.includes(searchText)) {
      fetchOptions();
    }
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputValue !== '') {
          const user_name = localStorage.getItem('name');
          const docEmpleado = localStorage.getItem('doc_empleado');
          setDocument(docEmpleado.toString());
          const email = localStorage.getItem('email');
          const response = await axios.get(`/proyect?search=${inputValue}&email=${email}`);
          const anticipo = await axios.post(`/proyect/anticipo`, { sku: response?.data[0]?.skuP, doc: docEmpleado });
          const indicadores = await axios.get(`/indicadores/fechas?docId=${docEmpleado}`);
          setindexProject(false)
          todosAnticipos(anticipo.data);
          todasLasFechas(indicadores.data);
          setProjectData({
            //! aquí se agregarían más datos
            SKU_Proyecto: response?.data[0]?.skuP || '',
            NitCliente: response?.data[0]?.nitCliente || '',
            idNodoProyecto: response?.data[0]?.idNodoP || '',
            idProceso: parseInt(response?.data[0]?.Codi_parteP) || 0,
          });
          setNewResponse(response?.data);
          finishedHandler(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [inputValue, finishedUpdate]);

  const handleSearch = (text) => {
    if (text !== searchText) {
      globalSearch(text);
      globalOptions(true);
    } else {
      globalOptions(false);
    }
  };

  const handleSelectOption = (option) => {
    globalSearch(option);
    finalValue(option);
    globalOptions(false);
  };

  return (
    <div className="mx-auto md:px-24 p-2 xl:px-40 w-full bg-white">
      <input
        className=" mx-auto bg-lightGrayCreame   w-full px-2"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Busca el Proyecto o sin Proyecto"
      />
      {showOptions && (
        <div className="modalContainer absolute bg-gray-50 p-1 m-1 border-2 border-lightGrayCreame rounded">
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleSelectOption(option)}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
