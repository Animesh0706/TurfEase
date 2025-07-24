// components/TurfMap.jsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TurfMap = () => {
  useEffect(() => {
    const key = '0tdCrs1eH09wD4vHL08C';

    // Initialize map
    const map = L.map('leaflet-map').setView([19.0606, 72.8364], 14);

    // Add MapTiler basemap
    L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${key}`, {
      tileSize: 512,
      zoomOffset: -1,
      attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
    }).addTo(map);

    // Turf locations
    const cities = [
      [19.061995, 72.835025, 'Bayside Sports India Pvt Ltd'],
      [19.058419, 72.837618, 'Surekha Exports'],
      [19.068409, 72.837447, 'Sonic Sports Construction'],
      [19.057385, 72.83061, 'St.Josephs Turf'],
      [19.056101, 72.8264, 'Sportsfield Turf Academy'],
      [19.057074, 72.829903, 'Goalster-Sports Arena']
    ];

    // Add markers
    cities.forEach(([lat, lng, name]) => {
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<strong>${name}</strong>`);
    });

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="leaflet-map" style={{ height: '400px', width: '100%', borderRadius: '12px', marginTop: '2rem' }} />;
};

export default TurfMap;
