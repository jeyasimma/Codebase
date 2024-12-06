import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function Filter() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation to get the query parameters from URL
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error state to handle any errors from the API

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(""); // Reset the error state when the API is being called
      try {
        const queryParams = location.search; // e.g., "?year=2023&dept=CS&skills=React&status=active"
        const response = await get(`/user/filter${queryParams}`);
    
        // Handle the response based on success
        if (response.data.success && response.data.users) {
          setUsers(response.data.users || []);
        } else {
          setUsers([]); // Reset users to an empty array if no data is found
        }
      } catch (error) {
        console.error("Error fetching users:", error);
    
        // Check for a 404 response and handle it gracefully
        if (error.response?.status === 404) {
          setUsers([]); // Treat 404 as "no users found"
        } else {
          // Handle other errors as generic server errors
          setError("An error occurred while fetching users. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };    

    fetchUsers();
  }, [location.search]); // Re-fetch whenever the query parameters change

  // Helper function to truncate text to a specific number of words
  const truncateText = (text, wordLimit) => {
    const words = text ? text.split(" ") : [];
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="container">
      <div className="mb-5 text-center">
        <h2 className="fw-bold fs-1 text-white">Filtered Users</h2>
      </div>

      {loading ? (
        <div className="text-center text-white">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-white">No users found with the applied filters.</div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 mb-4" key={user._id}>
              <div
                className="card border-success"
                style={{
                  borderWidth: "2px",
                  backgroundColor: "#2b2b2b",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`${BaseUrl}/images/${user.profile}`}
                  className="card-img-top img-fluid"
                  alt={`${user.email}'s Profile`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body bg-dark text-white">
                  <h5 className="card-title">{user.email}</h5>
                  <p className="card-text">
                    {truncateText(user.resume_link, 20) || "No Resume Available"}
                  </p>
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => handleUserClick(user._id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
