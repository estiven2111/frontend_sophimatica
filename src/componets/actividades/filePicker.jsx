import React, { useState, useEffect } from 'react';

const FilePickerButton = ({ ent, upLoaded, setUri, handlerInfo, deleteInfo, justUploaded, numero }) => {
  const [fileCharged, setFileCharged] = useState(false)
  const [adicionalName, setAdicionalName] = useState("")
  useEffect(() => {
    if (upLoaded) {
      setFileCharged(true);
      handlerInfo({[adicionalName.toUpperCase()]:{uri:upLoaded, Numero:numero}})
    }
  }, [upLoaded, adicionalName]);

  const handleFilePick = (event) => {
    try {
      const uri = event.target.files[0];
      if (uri) {
        setFileCharged(true)
        handlerInfo({[ent]:{uri:uri, Numero:numero}})
        
      }
    } catch (error) {
      console.error('Selección de archivo cancelada', error);
    }
  };

  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
     handleFilePick2(files)
  }
  const handleFilePick2 = (event) => {
    try {
      const uri = event[0];
      if (uri) {
        setFileCharged(true)
        handlerInfo({[ent]:{uri:uri, Numero:numero}})
        
      }
    } catch (error) {
      console.error('Selección de archivo cancelada', error);
    }
  };

  const handlerCancel = () => {
    setFileCharged(false)
    deleteInfo(ent);
  };

  const handlerOnChange = (value) => {
    deleteInfo(adicionalName.toUpperCase())
    setAdicionalName(value)
  }

  return (
    <div className="flex items-center justify-center p-2 w-full">
      {upLoaded ? (
        <input className={`h-10 px-2 rounded text-center flex items-center justify-center w-9/10 ${fileCharged ? 'bg-lightblue bg-lightBlueCreame' : 'bg-red-500'
        }`} placeholder={ent} onChangeText={handlerOnChange}>{adicionalName.toUpperCase()}
        </input>
        // <div className="h-10 px-2 rounded text-center bg-lightblue flex items-center justify-center bg-indigo-300 w-9/10">
        //   {file.name}
        // </div>
      ) : (
        <div className={`${fileCharged || justUploaded ? 'bg-gray-400' : 'bg-white'}  w-9/10 h-10 px-2 rounded text-center flex items-center justify-center text-black text-sm`}>
          {ent}
        </div>
      )}
      {fileCharged || justUploaded ? (
        <button
          className="w-10 h-10 bg-lightgrey rounded flex items-center justify-center ml-2 bg-red-400"
          onClick={() => {upLoaded?setUri(""):null; handlerCancel()}}
        >
          X
        </button>
      ) : (
        <div
        className="w-1/10 h-10  flex items-center justify-center "
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e)}
                >
        <label className={`${justUploaded ? 'bg-gray-400' : 'bg-lightBlueCreame'} w-full h-10 bg-lightgrey rounded flex items-center justify-center ml-2 cursor-pointer text-black`}>
          ...
          <input type="file" className="hidden" onChange={handleFilePick} disabled={justUploaded?true:false}/>
        </label>
        </div>
      )}
    </div>
  );
};

export default FilePickerButton;