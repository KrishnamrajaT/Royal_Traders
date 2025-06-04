import React, { useState } from 'react';
import axios from 'axios';

const LocationComponent = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');

  // 1. Get coordinates first
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await getCityState(latitude, longitude); // Convert to city/state
      },
      (err) => setError("Location access denied: " + err.message)
    );
  };

  // 2. Reverse geocode to get city/state
  const getCityState = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const { address } = response.data;
      setCity(address.city || address.town || address.village);
      setState(address.state);
    //   sendToBackend(address.city, address.state); // Send to backend
    } catch (err) {
      setError("Failed to fetch city/state: " + err.message);
    }
  };

  // 3. Send to backend
  const sendToBackend = async (city, state) => {
    await axios.post('YOUR_BACKEND_ENDPOINT', { city, state });
    console.log("Sent city/state to backend!");
  };

  return (
    <div>
      <button onClick={getLocation}>Get My City/State</button>
      {city && <p>Detected: {city}, {state}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LocationComponent;