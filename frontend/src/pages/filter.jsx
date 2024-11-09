import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function Filter() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation to get the query parameters from URL
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Use location.search to retrieve query parameters directly from the URL
        const queryParams = location.search; // e.g., "?year=2023&dept=CS&skills=React&status=active"
        const response = await get(`/user/filter${queryParams}`);
        // Adjust to response.data.users (note lowercase 'users')
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
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
        <div className="text-center text-white">Loading...</div>
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
