import {useEffect} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";

const Html5Qrcode = () => {
  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", {fps: 10, qrbox: 250}, false);
    html5QrcodeScanner.render(onScanSuccess);
  }, [])

  return <>
    <div style={{display: "flex"}}>
      <div id="reader" style={{width: "500px"}}></div>
    </div>
  </>
}
export default Html5Qrcode
