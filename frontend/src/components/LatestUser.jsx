import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function LatestUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/dashboard/users");
        setUsers(response.data.Users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

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
        <h2 className="fw-bold fs-1 text-white">Recent Users</h2>
      </div>
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
    </div>
  );
}
