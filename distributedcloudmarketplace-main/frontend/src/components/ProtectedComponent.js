import React, { useEffect, useState } from 'react';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProtectedData = async () => {
    const token = localStorage.getItem('token'); // Récupérez le token du stockage local
    if (!token) {
      console.error('No token found');
      setError('No token found');
      return;
    }

    try {
      const response = await fetch('/api/protected-route', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token, // Ajoutez le token au header Authorization
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setData(data);
      } else {
        console.error('Failed to fetch protected data:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching protected data:', error);
      setError('Error fetching protected data');
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Data</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedComponent;