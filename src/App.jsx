import { useEffect, useState } from "react";
import "./App.css";
import PrincipalCard from "./components/PrincipalCard";

function App() {
  const [latLon, setLatLon] = useState();

  useEffect(() => {
    function success(pos) {
      const coords = pos.coords;
      setLatLon(coords);
    }
    function error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div className="App">
      {<PrincipalCard lat={latLon?.latitude} lon={latLon?.longitude} />}
    </div>
  );
}

export default App;
