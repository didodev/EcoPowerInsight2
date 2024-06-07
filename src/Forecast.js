import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const Forecast = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://api.nationalgrideso.com/dataset/2b90a483-f59d-455b-be6d-3cb4c13a85d0/resource/6f7408b4-47fd-4ae7-b1e5-f095a3a5a2dc/download/archive7dayahead.csv';
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data); // Log the data to check if it's being fetched
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            console.log(results.data); // Log parsed data
            setData(results.data);
          },
        });
      } catch (err) {
        console.error(err); // Log the error to understand what went wrong
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>7-Day Ahead National Forecast</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
