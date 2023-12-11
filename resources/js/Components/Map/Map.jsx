// import React, { useEffect } from 'react';
// import 'ol/ol.css'; // Import OpenLayers styles
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';

// import { fromLonLat } from 'ol/proj';
// import { Point } from 'ol/geom';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import { Icon, Style } from 'ol/style';

import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';


export default function OpenLayersMap() {
  let lat = 43.21113002499926;
  let lon = 27.86237642826041;

  useEffect(() => {
    // Initialize the map
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([lon, lat]),
        zoom: 18,
      }),
    });

    // Create a vector source and add a feature with an ID
    const vectorSource = new VectorSource({
      features: [new Feature(new Point(fromLonLat([lon, lat])))],
    });

    // Add a vector layer with the created source
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: './img/marker.png',
          scale: 1,
        }),
      }),
    });

    // Add the vector layer to the map
    map.addLayer(vectorLayer);

    return () => {
      map.dispose();
    };
  }, [lat, lon]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

