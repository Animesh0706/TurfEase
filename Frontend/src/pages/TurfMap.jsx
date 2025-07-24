// components/TurfMap.jsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TurfMap.css'; 
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const TurfMap = () => {
  useEffect(() => {
    const key = '0tdCrs1eH09wD4vHL08C';
    const map = L.map('leaflet-map').setView([19.0606, 72.8364], 14);

    L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${key}`, {
      tileSize: 512,
      zoomOffset: -1,
      attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
    }).addTo(map);

    const cities = [
      [19.061995, 72.835025, 'Bayside Sports India Pvt Ltd'],
      [19.058419, 72.837618, 'Surekha Exports'],
      [19.068409, 72.837447, 'Sonic Sports Construction'],
      [19.057385, 72.83061, 'St.Josephs Turf'],
      [19.056101, 72.8264, 'Sportsfield Turf Academy'],
      [19.057074, 72.829903, 'Goalster-Sports Arena']
    ];

    cities.forEach(([lat, lng, name]) => {
      const popupHTML = `
        <div class="custom-popup">
          <img src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&size=200x150&markers=color:red%7C${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY" alt="${name}" />
          <h4>${name}</h4>
        </div>
      `;
      L.marker([lat, lng]).addTo(map).bindPopup(popupHTML);
    });

  }, []);

  return <div id="leaflet-map" style={{ height: '400px', width: '100%', borderRadius: '12px', marginTop: '2rem' }} />;
};

export default TurfMap;
