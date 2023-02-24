import React, {useEffect, useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import {Camera} from "react-bootstrap-icons";
import * as zxing from "@zxing/library";
import {BarcodeFormat, DecodeHintType} from "@zxing/library";

const IsbnReader = () => {

  const videoRef = useRef();
  const canvasRef = useRef();

  const [data, setData] = useState("no data...")
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameraList, setCameraList] = useState([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setCameraList(cameras)
        if (cameras.length > 0) {
          setSelectedCamera(cameras[0].deviceId);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedCamera) {
      navigator.mediaDevices.getUserMedia({video: {deviceId: selectedCamera}})
        .then(stream => {
          const video = videoRef.current;
          video.srcObject = stream;
          return video.play();
        });
    }
  }, [selectedCamera]);
  const scanISBN = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    console.log("* imageData", imageData.data)

    const luminanceSource = new zxing.RGBLuminanceSource(
      imageData.data,
      imageData.width,
      imageData.height
    );

    console.log("* luminanceSource", luminanceSource)

    const binaryBitmap = new zxing.BinaryBitmap(new zxing.HybridBinarizer(luminanceSource));
    const reader = new zxing.MultiFormatReader();
    const hints = new Map();
    const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_39, BarcodeFormat.EAN_13];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    const result = reader.decode(binaryBitmap, hints);
    console.log("* result", result)
    if (result && result.text.startsWith('ISBN')) {
      const isbn = result.text.substr(5);
      console.log(isbn);
      setData(isbn)
    }

    // const code = jsQR(imageData.data, width, height, {
    //   inversionAttempts: 'dontInvert',
    //   possibleFormats: ['CODE_39'],
    // });
    // console.log("* code", code)
    // if (code && code.data.startsWith('ISBN')) {
    //   const isbn = code.data.substr(5);
    //   console.log(isbn);
    //   setData(isbn)
    // }
  };

  return (
    <div className="container-fluid">
      <div className="d-grid justify-content-center align-items-center align-content-center">
        <video width="400px" ref={videoRef}/>
        <canvas ref={canvasRef} style={{display: 'none'}}/>
        <p className="mt-3">
          <select className="form-select" value={selectedCamera || ""}
                  onChange={event => setSelectedCamera(event.target.value)}>
            {cameraList.map(camera => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </option>
            ))}
          </select>
        </p>
        <Button onClick={scanISBN} className="fw-bold">
          <Camera size="18" className="me-2"/>
          Scan ISBN
        </Button>
        <p className="fs-6 bg-secondary mt-3 border rounded text-white">
          {data}
        </p>
      </div>
    </div>
  );
}
export default IsbnReader
