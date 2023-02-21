import './style.css';
import {useEffect, useState} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";

function App() {
  const [data, setData] = useState('No result');

  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", {fps: 10, qrbox: 250}, false);
    html5QrcodeScanner.render(onScanSuccess);
  }, [])

  return (
    <div className="app">
      <header>
        <h2>
          React Barcode Reader
        </h2>
      </header>
      <div style={{display: "flex"}}>
        <div id="reader" style={{width: "500px"}}></div>
      </div>
    </div>
  );
}

export default App;
