import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Time from './time';
import swal from 'sweetalert';
import Entregables from './entregables';


const Tarea = (props) => {
  const [checked, setChecked] = useState(false);
  const [isTotalTime, setIsTotalTime] = useState('');
  const [finished, setFinished] = useState(false);
  const spinValue = useRef(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFinished(false);
  }, [props.proyecto]);

  const [readyTocheck, setReadyTocheck] = useState(false);
  const isAllReady = (value) => {
    setReadyTocheck(value);
  };

  const handleCheckboxToggle = (isTotalTime) => {
      // setConfirmModal(true);
      try {

        swal({
          title: `CONFIRMAR FINALIZACIÓN DE ACTIVIDAD`,
          text: `Despúes de confirmar, la actividad ya no estara disponible en su usuario. ¿Está seguro de haber enviado todos los elementos requeridos y horas realizadas? 
          EL TIEMPO TOTAL TRABAJADO EN LA ACTIVIDAD ES DE ${isTotalTime} HORAS `,
          icon: "warning",
          buttons: ["SI", "NO"],
        }).then(async (res) => {
          if (!res) {
            setIsLoading(true)
            const email = localStorage.getItem('email'); // Obtener el email del almacenamiento local
            await axios.put('/proyect/update', {
              idNodoProyecto: props.idNodoActividad,
              SKU_Proyecto: props.skuP,
              finished: 1,
            });
            const response = await axios.put('/proyect/updateProyect', {
              email: email,
              doc_id: props.documentoEmpleado,
            });
            setChecked(true);
            setFinished(true);
            props.finishedUpdate(true);
            setIsTotalTime('');
            setReadyTocheck(false);
            setIsLoading(false)
          }
        });
       
      } catch (error) {
        console.error(error);
      }
  
  };

  const postInfo = {
    proyect: props.proyecto,
    component: props.componente,
    activity: props.actividad,
    SKU_Proyecto: props.skuP,
    NitCliente: props.nitCliente,
    DocumentoEmpleado: props.documentoEmpleado,
    idNodoProyecto: props.idNodoProyecto,
    idNodoActividad: props.idNodoActividad,
    Cod_Parte: props.Cod_Parte,
  };


  const [uri, setUri] = useState('');
  const [numberOfLines, setNumberOfLines] = useState(true);

  const handlePress = () => {
    setNumberOfLines(!numberOfLines);
  };

  return (
    <div className="flex items-center justify-between ">
      {isLoading 
      ?
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <div className="loader"></div>
        </div>
      : null}
      <div className="w-3/5 pr-4 ">
        <p onClick={handlePress} className={`text-black ${numberOfLines ? 'truncate' : ''} cursor-pointer text-xs sm:text-base`}>
          {props.actividad}
        </p>
      </div>
      <div className="w-2/5 flex items-center justify-between">
      
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            if (!isNaN(isTotalTime)) {
              handleCheckboxToggle(isTotalTime);
            }
          }}
        />
       
        <Time entrega={props.entregable} postInfo={postInfo} isTime={setIsTotalTime} setChecked={setChecked} />
        <Entregables
          entrega={props.entregable}
          lista={props.listaEntregable}
          uri={uri}
          setUri={setUri}
          SKU_Proyecto={props.skuP}
          nitCliente={props.nitCliente}
          idNodoProyecto={props.idNodoProyecto}
          DocumentoEmpleado={props.documentoEmpleado}
          Codi_parteA={props.Cod_Parte}
          finishedUpdate={props.finishedUpdate}
          isAllReady={isAllReady}
        />
        {/* //! todavia no se usa
        <Camera entrega={props.entregable} setUri={setUri} /> */}
      </div>
    </div>
  );
};

export default Tarea;
