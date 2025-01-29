/* eslint-disable react/prop-types */

import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineCamera } from "react-icons/ai";
import { FiRepeat } from "react-icons/fi";
import { BiSolidSave } from "react-icons/bi";
import { MdFlipCameraIos } from "react-icons/md";

function CameraGastos({ closeCam, imageData }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [movil, setMovil] = useState(false);
  let camera = false;
  useEffect(() => {
    camera = camera || executeCamera();
  }, []);
  //   const executeCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       videoRef.current.srcObject = stream;
  //     } catch (error) {
  //       console.error("Error al acceder a la cámara:", error);
  //     }
  //   };

//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         cameraFeed.srcObject = stream;
//       })
//       .catch((error) => {
//         console.error('Error al acceder a la cámara:', error);
//       });
  const executeCamera = async (facingMode = "user") => {
    try {
        var userAgent = navigator.userAgent;

if (userAgent.match(/Android/i)) {
  // El dispositivo está ejecutando Android
  console.log("El dispositivo está ejecutando Android");
} else if (userAgent.match(/iPhone|iPad|iPod/i)) {
  // El dispositivo está ejecutando iOS
  console.log("El dispositivo está ejecutando iOS");
} else if (userAgent.match(/Win/i) || userAgent.match(/Windows/i)) {
  // El dispositivo está ejecutando Windows
  console.log("El dispositivo está ejecutando Windows");
} else {
  // No se pudo determinar el sistema operativo
  console.log("No se pudo determinar el sistema operativo");
}
      if (window.innerWidth <= 768) {
        setMovil(true);
      } else {
        setMovil(false);
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }, // Especifica la cámara frontal o trasera
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const handleRepeat = () => {
    setImageSrc(null);
    executeCamera("user");
  };
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !canvas.getContext) {
      console.error("Canvas no está disponible");
      return;
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/jpeg");
    setImageSrc(imageUrl);
    stopcamera();
  };

  // Función para cambiar entre la cámara frontal y trasera
  const toggleCamera = () => {
    const currentFacingMode = videoRef.current.srcObject
      .getVideoTracks()[0]
      .getSettings().facingMode;
    const newFacingMode = currentFacingMode === "user" ? "environment" : "user";
    stopcamera();
    executeCamera(newFacingMode);
  };

  const handlecamara = () => {
    stopcamera();
    closeCam();
  };
  const stopcamera = () => {
    const videoStream = videoRef.current.srcObject;
    if (videoStream instanceof MediaStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    videoRef.current.srcObject = null;
  };

  const handleSave = () => {
    imageData(imageSrc);
    closeCam();
    stopcamera();
    setImageSrc(null);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center mt-56 m-6 z-50">
      <div className="bg-gray-800 bg-opacity-70  p-5 rounded-lg border-solid border-8 border-gray-50 flex flex-col justify-center items-center gap-5">
        <div className={`${imageSrc ? "hidden" : "w-full max-w-md"}`}>
          <video ref={videoRef} autoPlay className="w-full" />
        </div>
        <div className="w-full">
          {imageSrc && (
            <div className="w-full flex justify-center">
              <img
                className="w-full max-w-md"
                src={imageSrc}
                alt="Imagen capturada"
              />
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        {imageSrc ? (
          <>
            {/* PARA VOLVER A REPETIR LA FOTO O GUARDARLA */}
            <div className="flex items-center justify-around w-full">
              <div className="mr-5 lg:mr-10 md:mr-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer   bg-green-500 hover:bg-green-700 active:bg-green-900">
                <button type="button" onClick={handleSave}>
                  <BiSolidSave size={60} />
                </button>
              </div>

              <div className="ml-5 lg:ml-10 md:ml-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer  bg-gray-500 hover:bg-gray-400  active:bg-slate-800">
                <button type="button" onClick={handleRepeat}>
                  <FiRepeat size={60} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* PARA TOMAR LA FOTO VOLTEAR SI ES CELULAR O CANCELAR */}
            <div className="flex items-center  justify-around w-full">
              <div className=" lg:mr-10 md:mr-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer   bg-red-500 hover:bg-red-700 active:bg-red-900">
                <button type="button" onClick={captureImage}>
                  <AiOutlineCamera size={60} />
                </button>
              </div>
              <div className=" lg:ml-10 md:ml-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer  bg-gray-500 hover:bg-gray-400  active:bg-slate-800">
                <button type="button" onClick={handlecamara}>
                  <AiFillCloseCircle size={60} />
                </button>
              </div>
              {movil && (
                <div className=" lg:ml-10 md:ml-1 w-20 h-20 lg:w-38 lg:h-38 md:w-26 md:h-26 flex flex-col items-center justify-center border-2 rounded-full border-gray-300 border-dashed  cursor-pointer  bg-gray-500 hover:bg-gray-400  active:bg-slate-800">
                  <button type="button" onClick={toggleCamera}>
                    <MdFlipCameraIos size={60} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CameraGastos;
