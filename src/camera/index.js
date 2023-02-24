import {useState} from "react";

const CameraPage = () => {
  const [code, setCode] = useState(null);

  const handleScan = (data) => {
    console.log(data)
    setCode(data);
  };

  return <>
    <div>
      {/*<button onClick={() => setCode(null)}>Scan ISBN code</button>*/}
      {/*{code ? (*/}
      {/*  <IsbnComponent code={code}/>*/}
      {/*) : (*/}
      {/*  <CameraComponent/>*/}
      {/*)}*/}
    </div>
  </>
}
export default CameraPage
