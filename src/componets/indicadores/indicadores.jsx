import React, { useEffect, useState, useContext } from 'react';
// import PieComp from './pie';
// import RangeDatePicker from './datePicker';
import LogoSync from "../../assets/img/icon.png";
import { ThemeContext} from "../context/themeContext"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
let grafica = {
  dis:35,
  pro:35,
  cump:30
}
const Indicadores = () => {
  const [justSelected, SetJustSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [totalFechas, setTotlaFechas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [infoFecha, setInfoFecha] = useState({});
  const [horasDisp, setHorasDisp] = useState({});

  const location = useLocation()
  localStorage.setItem("ruta", location.pathname)

  ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
    responsive : true,
    maintainAspectRatio: false,
};

var datas = {
    labels: ['A tiempo', 'Con retraso', 'Por frecuencia'],
    datasets: [
        {
            label: 'Nivel Actividad',
            data: [grafica.dis,grafica.cump , grafica.pro],
            backgroundColor: [
                '#1148D6',
                '#9755CF',
                '#7A3E03',
            ],
            borderColor: [
                '#86A5F7',
                '#D7AEFA',
                '#F2B274',
            ],
            borderWidth: 1,
        },
    ],
};



  const [name, setName] = useState("");
  const { fechasIndicadores, inputValue, todasLasFechas } = useContext(ThemeContext);
  const docId =  localStorage.getItem("doc_empleado")
  useEffect(() => {
    const getName = async () => {
      const fullname = localStorage.getItem("name")
      setName(fullname)
    };
    getName();
  },[])
  const [showGraph, setShowGraph,] = useState(false);

  const showGraphHandler = ()=> {
    setShowGraph(true)
  }

  const [data, setData] = useState({
    hDisp : "",
    hProg : "",
    hCump : "",
    hFrec : "",
  })

  const handleOnChange = (text, name) => {
    setData({
    ...data,
    [name]: text
    });
    if (name === "hDisp") {
         grafica.dis   = text
    }
    if (name === "hCump") {
      grafica.cump = text
    }
    if (name === "hProg") {
      grafica.pro = text
    }
  };
  


  const aTiempo = ((infoFecha.CumplidasPeriodo/infoFecha.HoraProgramada)*100).toFixed(1)
  const cRetraso = ((infoFecha.atrazo/infoFecha.HoraProgramada)*100).toFixed(1)
  const pFrec = ((infoFecha.HorasFrecuencia/infoFecha.HoraProgramada)*100).toFixed(1)

  const calculoActividad = () => {

    ((parseInt(data.hCump) + parseInt(data.hFrec)) / parseInt(data.hProg) * 100).toFixed(1)
  }
  
  useEffect(() => {
    const fechasSinProyectos = async() => {
      const indicadores = await axios.get(`/indicadores/fechas?docId=${docId}`);
      todasLasFechas(indicadores.data)
    }
    fechasSinProyectos()
  }, [])
  // useEffect(() => {
  //   setIsOpen(false);
  //   SetJustSelected(false)
  //   setInfoFecha({})
  //   setHorasDisp({})
  // },[inputValue])

  useEffect(() => {
    const ActulizarOptions = () => {
      if (fechasIndicadores){
      setTotlaFechas(fechasIndicadores.fechas)
      setHorasDisp(fechasIndicadores.HDisponibles)
      }
    }
    ActulizarOptions()
    },[fechasIndicadores])

  const toggleDropdown = () => {
    SetJustSelected(false)
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = async(option) => {
    const infoFechas = await axios.get(`/indicadores/horas?docId=${docId}&id=${option[0].id}`)
    if (!selectedOptions.includes(option)) {
      setSelectedOptions(option);
      setInfoFecha(infoFechas.data)
      if (!isNaN(infoFecha.hdisp)) {
        grafica.dis = infoFecha.hdisp
      }
      if (!isNaN(infoFecha.hdisp)) {
        grafica.dis = infoFecha.hdisp
      }
      if (!isNaN(infoFecha.hdisp)) {
        grafica.dis = infoFecha.hdisp
      }

      setData({
        hDisp : infoFechas.data,
        hProg : infoFechas.data,
        hCump : infoFechas.data,
        hFrec : infoFechas.data,
      })
      }
    setIsOpen(false);
    SetJustSelected(true)
  };

  const renderOptions = () => {
    if (totalFechas) {
      return totalFechas.map((option, index) => (
        <div
          className="mb-2 cursor-pointer"
          // style={{ backgroundColor: "blue" }}
          key={index}
          onClick={() => {
            handleOptionSelect([option]);
            // setCurrentID(option.id)
          }}
        >
          <p className={`truncate ${numberOfLines ? 'truncate-1' : 'truncate-2'}`}>{option.Fecha}</p>
        </div>
      ));
    }
  };
  

  const renderSelectedOptions = () => {
    return selectedOptions.map((option, index) => (
      <p key={index} className="text-blue-500 font-semibold">
        {option.Fecha}
      </p>
    ));
  };
  
  const [numberOfLines, setNumberOfLines] = useState(true);
    const handlePress = () => {
        setNumberOfLines(!numberOfLines);
    };

    return (
      <div className="md:container mx-auto md:px-10">
        <div className="scroll mb-10 text-center m-10">
          {/* <RangeDatePicker/> */}
          
          <div className="singleInput  m-10 flex items-center justify-center">
            <div className="inputContOptions">
              <div className="inputIntLeftDrop">
                {justSelected ? (
                  <div className="block">
                    <button onClick={toggleDropdown}>{renderSelectedOptions()}</button>
                  </div>
                ) : (
                  <div className="blockNoSelected">
                    <button onClick={toggleDropdown}>Seleccionar opciones</button>
                  </div>
                )}
              </div>
              {isOpen && <div className="options absolute bg-slate-500 ">{renderOptions()}</div>}
            </div>
          </div>
         
          <div className="inputCont  m-5">
            {console.log(infoFecha)}
            <label className="label">Horas Disp :</label>
            <input className="input border-2 solid rounded-lg bg-blue-300/50 m-2" value={!isNaN(infoFecha.hdisp) ? infoFecha.hdisp: data.hDisp} onChange={(e) => handleOnChange(e.target.value, "hDisp")} placeholder="Horas" type="number"/>
            <label className="label">Horas Cumplidas :</label>
            <input className="input border-2 solid rounded-lg bg-blue-300/50 m-2" value={!isNaN(infoFecha.CumplidasPeriodo) && !isNaN(infoFecha.atrazo) ? (infoFecha.CumplidasPeriodo + infoFecha.atrazo).toString() : data.hCump} onChange={(e) => handleOnChange(e.target.value, "hCump")} placeholder="Horas" type="number"/>
          </div>
          <div className="inputCont  m-5">
            <label className="label">Horas Prog :</label>
            <input className="input border-2 solid rounded-lg bg-blue-300/50 m-2" value={!isNaN(infoFecha.HoraProgramada) ? infoFecha.HoraProgramada.toString() : data.hProg} onChange={(e) => handleOnChange(e.target.value, "hProg")} placeholder="Horas" type="number"/>
            <label className="label">Horas Frecuencia :</label>
            <input className="input border-2 solid rounded-lg bg-blue-300/50 m-2" value={!isNaN(infoFecha.HorasFrecuencia) ? infoFecha.HorasFrecuencia.toString() : data.hFrec} onChange={(e) => handleOnChange(e.target.value, "hFrec")} placeholder="Horas" type="number"/>
          </div>
          <div className="inputCont  m-5">
            <label className="label2">NIVEL DE ACTIVIDAD(%):</label>
            <input className="input border-2 solid rounded-lg bg-blue-300/50 m-2" value={infoFecha.nivActividad ? infoFecha.nivActividad.toString() : ""} onChange={(e) => handleOnChange(e.target.value, "activity")} placeholder="%" type="number"/>
          </div>


          {/* <div className="grafico">
            <div>
              {!isNaN(aTiempo) && !isNaN(cRetraso) && !isNaN(pFrec)
              ? (<>
              <div>
                <span className="name">{name}</span>
              </div>
              <PieComp aTiempo={parseFloat(aTiempo)} cRetraso={parseFloat(cRetraso)} pFrec={parseFloat(pFrec)}/></>) 
              : null}
            </div>
          </div> */}
        </div>
        <div className='lg:h-96 md:h-80 h-64'><Pie data={datas} options={options}  /></div>
      </div>
    );
    
};

export default Indicadores;
