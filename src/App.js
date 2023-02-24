import {useRef, useState} from "react";
import IsbnReader from "./isbnReader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  return (
    <div className="app">
      <header>
        <h2>
          React Barcode Reader
        </h2>
      </header>
      <section className="section-isbn-reader">
        <IsbnReader/>
      </section>

    </div>
  );
}

export default App;
