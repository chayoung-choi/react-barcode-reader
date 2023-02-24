import React, {useRef, useState} from 'react';
import {Camera} from 'react-camera-pro';
import {parse} from 'isbn-utils';

const CameraComponent = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [code, setCode] = useState(null);

  const handleBarcodeScan = (data) => {
    // Check if the scanned data is a valid ISBN code
    const parsedCode = parse(data);
    if (parsedCode) {
      setCode(parsedCode.isbn13 || parsedCode.isbn10);
    }
  };

  const handleCameraError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <Camera ref={camera}/>
      <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
      <img src={image} alt='Taken photo'/>
    </div>
  );
};

export default CameraComponent;
