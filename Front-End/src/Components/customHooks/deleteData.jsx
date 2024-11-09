import { useState } from "react";

const useDeleteData = (type, action, id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${type}/${action}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      setLoading(false);
      return response.json();
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Error deleting data:", err);
    }
  };

  return { handleDelete, loading, error };
};

export default useDeleteData;
