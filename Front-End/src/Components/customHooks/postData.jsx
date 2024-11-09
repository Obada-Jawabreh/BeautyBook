import { useState } from "react";
import axios from "axios";

const AddData = (type, action) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addData = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/${type}/${action}`,
        data,
        { withCredentials: true }
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add data"); 
    } finally {
      setLoading(false);
    }
  };

  return { addData, loading, error, success }; 
};

export default AddData;
