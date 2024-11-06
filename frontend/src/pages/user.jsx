import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function User() {
  const { userId } = useParams();
  const [singleUser, setSingleUser] = useState(null);

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        console.log(userId);
        const response = await get(`/public/Singleuser/${userId}`);
        console.log(response.data.user);
        setSingleUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchSingleUser();
  }, [userId]);

  return (
    <div className="container text-white mt-5 mb-5">
      {singleUser ? (
        <div className="row">
          {/* Profile Image and Basic Info */}
          <div className="col-md-4 text-center">
            <img
              src={`${BaseUrl}/images/${singleUser.profile}`}
              alt={`${singleUser.FullName}'s Profile`}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <h2 className="text-white">{singleUser.FullName}</h2>
            <p className="text-muted">{singleUser.role.toUpperCase()}</p>
          </div>

          {/* Detailed User Information */}
          <div className="col-md-8">
            <h4 className="text-white">User Details</h4>
            <table className="table table-dark table-striped">
              <tbody>
                <tr>
                  <th>Email</th>
                  <td>{singleUser.email}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{singleUser.dept}</td>
                </tr>
                <tr>
                  <th>Year</th>
                  <td>{singleUser.year}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{singleUser.gender}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{singleUser.status}</td>
                </tr>
                <tr>
                  <th>CGPA</th>
                  <td>{singleUser.CGPA}</td>
                </tr>
                <tr>
                  <th>Primary Language</th>
                  <td>{singleUser.primary_lang}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{singleUser.phone}</td>
                </tr>
                <tr>
                  <th>WhatsApp</th>
                  <td>{singleUser.whatsapp}</td>
                </tr>
                <tr>
                  <th>Resume Link</th>
                  <td>
                    {singleUser.resume_link ? (
                      <a
                        href={singleUser.resume_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        View Resume
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Skills</th>
                  <td>{singleUser.skills.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">Loading user details...</p>
      )}
    </div>
  );
}
