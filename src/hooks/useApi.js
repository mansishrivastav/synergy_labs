import { useEffect, useState } from "react";
import axios from 'axios';

//Function to fetch api
export default function useApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function apiCall() {
    try {
      setLoading(true);
      const result = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    apiCall();
  }, []);

  return { data, setData, loading };
}