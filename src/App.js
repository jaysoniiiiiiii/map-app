import { useState, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    const opencageApiKey = "6f366fb184f142439b9451b44c863132"; // Replace with your API key
    const opencageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=${opencageApiKey}`;

    axios
      .get(opencageUrl)
      .then((response) => {
        const { lat, lng } = response.data.results[0].geometry;
        setCenter(fromLonLat([lng, lat]));
        setZoom(5);
      })
      .catch((error) => console.error(error));
  }, [searchQuery]);

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: center,
        zoom: zoom,
      }),
    });

    return () => map.dispose();
  }, [center, zoom]);

  return (
    <div className="App">
      <div>
        <input
          style={{ width: "100%", height: "30px" }}
          type="text"
          placeholder="Enter a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div id="map" style={{ width: "100%", height: "650px" }} />
      </div>
    </div>
  );
}

export default App;
