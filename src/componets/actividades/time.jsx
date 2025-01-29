import React, { useState, useEffect } from "react";
import axios from "axios";

const Time = ({ entrega, postInfo, isTime, setChecked }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [manualDuration, setManualDuration] = useState(false);
  const [newDuration, setNewDuration] = useState("");
  const [editedTime, setEditedTime] = useState(false);

  const handleNewDuration = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    let formattedValue = "";
    if (numericValue.length > 0) {
      formattedValue = numericValue.replace(/(\d{2})(\d{0,2})/, "$1:$2");
    }
    const isValidTime = /^([0-1][0-9]|2[0-3])(?::([0-5][0-9]?){0,2})?$/.test(
      formattedValue
    );
    if (formattedValue.length > 2) {
      setNewDuration(isValidTime ? formattedValue : null);
    } else {
      setNewDuration(formattedValue);
    }
  };

  const getDuration = () => {
    if (startTime.length === 5 && endTime.length === 5) {
      const start = startTime.split(":");
      const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);

      const end = endTime.split(":");
      const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
      let totalMinutes = 0;
      if (endMinutes >= startMinutes) {
        totalMinutes = endMinutes - startMinutes;
      } else {
        totalMinutes = 24 * 60 + (endMinutes - startMinutes);
      }
      const duration = `${
        Math.floor(totalMinutes / 60) < 10
          ? "0" + Math.floor(totalMinutes / 60)
          : Math.floor(totalMinutes / 60)
      }:${
        totalMinutes % 60 < 10 ? "0" + (totalMinutes % 60) : totalMinutes % 60
      }`;
      return duration;
    } else {
      return "";
    }
  };

  const [errorModal, setErrorModal] = useState(false);
  const toggleOverlay = () => {
    setErrorModal(!errorModal);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setFechaSeleccionada(new Date().toISOString().split("T")[0])
    if (startTime.length === 0 && endTime.length === 0) {
      if (editedTime) {
        sendInfoDB();
        setNewDuration("");
        setModalVisible(false);
        setEditedTime(false);
        return;
      } else {
        return setModalVisible(false);
      }
    }
    if (startTime.length === 5 && endTime.length === 5) {
      sendInfoDB();
      setStartTime("");
      setEndTime("");
      setModalVisible(false);
    } else {
      toggleOverlay();
    }
  };

  const cancelModal = () => {
    setFechaSeleccionada(new Date().toISOString().split("T")[0])
    setStartTime("");
    setEndTime("");
    setModalVisible(false);
  };
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0]
    
  );
  const [date, setDate] = useState("");
  const [normalDate, setNormalDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formatDate = currentDate
      .toISOString()
      .split("T")[0]
      .split("-")
      .join("");
    const newDate = currentDate
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
    setNormalDate(newDate);
    setDate(formatDate);
  }, []);

  const [totalTime, setTotalTime] = useState("");

  useEffect(() => {
    const solicitud = async () => {
      try {
        const response = await axios.get(
          `/proyect/hours?idNodoActividad=${postInfo.idNodoActividad}&idNodoProyecto=${postInfo.idNodoProyecto}`
        );
        setTotalTime(response.data);
        isTime(response.data);
        setChecked(false);
      } catch (error) {
        console.error("No se envió la información correctamente", error);
      }
    };
    solicitud();
  }, [postInfo.idNodoActividad, postInfo.idNodoProyecto]);

  const sendInfoDB = async () => {
    try {
      const response = await axios.post("/proyect/hours", {
        ...postInfo,
        FechaRegistro: date,
        FechaInicio: `${fechaSeleccionada} ${startTime ? startTime + ":00" : "00:00:00"}`,
        FechaFinal: `${fechaSeleccionada} ${startTime ? endTime + ":00" : "00:00:00"}`,
        DuracionHoras: editedTime
          ? newDuration.split(":").join(".")
          : getDuration().split(":").join("."),
        finished: false,
      });
      isTime(response.data.horaTotal);
      setTotalTime(response.data.horaTotal);
    } catch (error) {
      console.error("No se envió la información correctamente", error);
    }
  };



  // Función para manejar el cambio en la fecha seleccionada
  const handleChange = (event) => {
    setFechaSeleccionada(event.target.value);
  };

  

//   return (
//   <div className="flex items-center justify-center bg-naranjaCreame rounded p-1 font-Horatio ">
//   <button
//     className={`btn btn-blue text-2xl md:text-2xl ${entrega ? "" : "btn-disabled"}`}
//     onClick={openModal}
//   >
//     {!isNaN(totalTime) ? totalTime : "00:00"}
//   </button>
//   {modalVisible && (
//     <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center top-40">
//       <div className="bg-azulCreame rounded-xl p-4 shadow-turquesaCreame shadow-sm w-9/12 max-w-lg lg:max-w-3xl overflow-auto max-h-screen">
//         <div className="flex justify-center flex-col items-center text-2xl sm:text-3xl md:text-2xl">
//           <div className="text-black w-full text-center mb-2 sm:mb-4">
//             <input
//               type="date"
//               value={fechaSeleccionada}
//               onChange={handleChange}
//               className="input input-bordered w-full sm:w-4/5 p-2 sm:p-4 text-2xl sm:text-3xl rounded"
//             />
//           </div>
//           <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-9/12 my-2 sm:my-4">
//             <label className="text-white w-full sm:w-1/2 text-2xl sm:text-3xl mb-2 sm:mb-0">Hora inicio:</label>
//             <input
//               type="time"
//               className="input input-bordered w-full sm:w-96 p-2 sm:p-4 text-darkGrayCreame font-bold text-2xl sm:text-3xl rounded"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               placeholder="00:00"
//             />
//           </div>
//           <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-9/12 my-2 sm:my-4">
//             <label className="text-white w-full sm:w-1/2 text-2xl sm:text-3xl mb-2 sm:mb-0">Hora final:</label>
//             <input
//               type="time"
//               className="input input-bordered w-full sm:w-96 p-2 sm:p-4 text-darkGrayCreame font-bold text-2xl sm:text-3xl rounded"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//             />
//           </div>
//           {manualDuration ? (
//             <div className="flex flex-col sm:flex-row items-center w-full sm:w-60 my-2 sm:my-4">
//               <label className="text-white w-full sm:w-1/2 text-2xl sm:text-3xl mb-2 sm:mb-0">Duración:</label>
//               <input
//                 type="text"
//                 className="input input-bordered w-full sm:w-24 p-2 sm:p-4 text-2xl sm:text-3xl rounded"
//                 maxLength="5"
//                 placeholder="00:00"
//                 value={newDuration}
//                 onChange={(e) => handleNewDuration(e.target.value)}
//               />
//               <button
//                 className="btn btn-primary btn-sm mx-2 text-2xl sm:text-3xl p-2 sm:p-4"
//                 onClick={() => {
//                   setEditedTime(true);
//                   setManualDuration(false);
//                 }}
//               >
//                 <i className="fas fa-check"></i>
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center my-2 sm:my-4">
//               <label className="text-white w-1/2 text-2xl sm:text-3xl">Duración:</label>
//               {editedTime ? (
//                 <p className="text-white text-2xl sm:text-3xl ml-2">{newDuration}</p>
//               ) : (
//                 <p className="text-white text-2xl sm:text-3xl ml-2">
//                   {getDuration() !== "" ? getDuration() : "00:00"}
//                 </p>
//               )}
//               <button
//                 className="btn btn-primary btn-sm mx-2 text-2xl sm:text-3xl p-2 sm:p-4"
//                 onClick={() => setManualDuration(true)}
//               >
//                 <i className="fas fa-pencil-alt"></i>
//               </button>
//             </div>
//           )}
//           <p className="text-white text-2xl sm:text-3xl">
//             Tiempo Total: {!isNaN(totalTime) ? totalTime : "00:00"}
//           </p>
//           <div className="flex justify-center mt-2 sm:mt-4">
//             <button
//               className={`btn btn-primary bg-naranjaCreame py-1 sm:py-2 px-6 sm:px-12 rounded-lg shadow-lg mx-1 sm:mx-2 text-2xl sm:text-3xl ${
//                 manualDuration ? "btn-disabled" : ""
//               }`}
//               onClick={closeModal}
//             >
//               Aceptar
//             </button>
//             <button
//               className="btn btn-primary bg-naranjaCreame py-1 sm:py-2 px-6 sm:px-12 rounded-lg shadow-lg mx-1 sm:mx-2 text-2xl sm:text-3xl"
//               onClick={cancelModal}
//             >
//               Cancelar
//             </button>
//           </div>
//           <div className={`modal ${errorModal ? "block" : "hidden"}`}>
//             <div className="modal-content">
//               <p className="text-white text-center font-bold text-2xl sm:text-3xl">
//                 Formato no válido
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </div>

  

//   );
// };

// export default Time;

return (
  <div className="flex items-center justify-center bg-naranjaCreame rounded p-1 font-Horatio">
    <button
      className={`btn btn-blue text-2xl md:text-2xl ${entrega ? "" : "btn-disabled"}`}
      onClick={openModal}
    >
      {!isNaN(totalTime) ? totalTime : "00:00"}
    </button>
    {modalVisible && (
      <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-auto">
        <div className="bg-azulCreame rounded-xl p-4 shadow-turquesaCreame shadow-sm w-11/12 max-w-lg lg:max-w-3xl mx-auto overflow-y-auto max-h-[90vh]">
          {/* Modal Header */}
          <div className="flex justify-center flex-col items-center text-2xl sm:text-3xl md:text-2xl">
            {/* Fecha */}
            <div className="text-black w-full text-center mb-2 sm:mb-4">
              <input
                type="date"
                value={fechaSeleccionada}
                onChange={handleChange}
                className="input input-bordered w-full sm:w-4/5 p-2 sm:p-4 text-2xl sm:text-3xl rounded"
              />
            </div>
            {/* Hora Inicio */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-9/12 my-2 sm:my-4">
              <label className="text-white w-full sm:w-1/2 text-2xl sm:text-3xl mb-2 sm:mb-0">Hora inicio:</label>
              <input
                type="time"
                className="input input-bordered w-full sm:w-96 p-2 sm:p-4 text-darkGrayCreame font-bold text-2xl sm:text-3xl rounded"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="00:00"
              />
            </div>
            {/* Hora Final */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-9/12 my-2 sm:my-4">
              <label className="text-white w-full sm:w-1/2 text-2xl sm:text-3xl mb-2 sm:mb-0">Hora final:</label>
              <input
                type="time"
                className="input input-bordered w-full sm:w-96 p-2 sm:p-4 text-darkGrayCreame font-bold text-2xl sm:text-3xl rounded"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            {/* Duración */}
            {manualDuration ? (
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-60 my-2 sm:my-4">
                <label className="text-white w-full sm:w-1/2 text-2xl sm:text-3xl mb-2 sm:mb-0">Duración:</label>
                <input
                  type="text"
                  className="input input-bordered w-full sm:w-24 p-2 sm:p-4 text-2xl sm:text-3xl rounded"
                  maxLength="5"
                  placeholder="00:00"
                  value={newDuration}
                  onChange={(e) => handleNewDuration(e.target.value)}
                />
                <button
                  className="btn btn-primary btn-sm mx-2 text-2xl sm:text-3xl p-2 sm:p-4"
                  onClick={() => {
                    setEditedTime(true);
                    setManualDuration(false);
                  }}
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center my-2 sm:my-4">
                <label className="text-white w-1/2 text-2xl sm:text-3xl">Duración:</label>
                {editedTime ? (
                  <p className="text-white text-2xl sm:text-3xl ml-2">{newDuration}</p>
                ) : (
                  <p className="text-white text-2xl sm:text-3xl ml-2">
                    {getDuration() !== "" ? getDuration() : "00:00"}
                  </p>
                )}
                <button
                  className="btn btn-primary btn-sm mx-2 text-2xl sm:text-3xl p-2 sm:p-4"
                  onClick={() => setManualDuration(true)}
                >
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
            )}
            {/* Tiempo Total */}
            <p className="text-white text-2xl sm:text-3xl">
              Tiempo Total: {!isNaN(totalTime) ? totalTime : "00:00"}
            </p>
            {/* Botones de Acción */}
            <div className="flex justify-center mt-2 sm:mt-4">
              <button
                className={`btn btn-primary bg-naranjaCreame py-1 sm:py-2 px-6 sm:px-12 rounded-lg shadow-lg mx-1 sm:mx-2 text-2xl sm:text-3xl ${
                  manualDuration ? "btn-disabled" : ""
                }`}
                onClick={closeModal}
              >
                Aceptar
              </button>
              <button
                className="btn btn-primary bg-naranjaCreame py-1 sm:py-2 px-6 sm:px-12 rounded-lg shadow-lg mx-1 sm:mx-2 text-2xl sm:text-3xl"
                onClick={cancelModal}
              >
                Cancelar
              </button>
            </div>
            {/* Error Modal */}
            <div className={`modal ${errorModal ? "block" : "hidden"}`}>
              <div className="modal-content">
                <p className="text-white text-center font-bold text-2xl sm:text-3xl">
                  Formato no válido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
export default Time;