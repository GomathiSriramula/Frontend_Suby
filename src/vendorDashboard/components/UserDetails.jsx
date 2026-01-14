import React, { useState, useEffect } from "react";
import API_URL from "../data/apiPath";

const UserDetails = () => {
  const [vendorData, setVendorData] = useState(null);
  const [firmData, setFirmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loginToken = localStorage.getItem("loginToken");
    const vendorId = localStorage.getItem("vendorId");

    if (!loginToken || !vendorId) {
      setError("Please login to view user details");
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const loginToken = localStorage.getItem("loginToken");
      const vendorId = localStorage.getItem("vendorId");

      if (!vendorId || !loginToken) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`,
        {
          method: "GET",
          headers: {
            token: loginToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setVendorData({
          vendorId: vendorId,
          username: data.username || "N/A",
          email: data.email || "N/A",
          firmName: data.vendorFirmName || "No Firm Added",
          firmId: data.vendorFirmId || "N/A",
        });
        setError(null);
      } else {
        setError(data.error || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Server error while fetching details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="userDetailsSection"><p>Loading...</p></div>;
  }

  if (!isAuthenticated || error) {
    return (
      <div className="userDetailsSection">
        <div className="authErrorCard">
          <span className="errorIcon">🔒</span>
          <p className="errorMessage">{error || "Please login to view details"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="userDetailsSection">
      <div className="profileHeader">
        <div className="profileIconContainer">
          <span className="profileIcon">👤</span>
        </div>
        <div className="profileInfo">
          <h2 className="username">{vendorData?.username}</h2>
          <p className="firmNameBadge">{vendorData?.firmName}</p>
        </div>
      </div>

      <h3>Account Details</h3>
      <div className="detailsCard">
        <div className="detailItem">
          <label>Vendor ID:</label>
          <p>{vendorData?.vendorId}</p>
        </div>
        <div className="detailItem">
          <label>Email:</label>
          <p>{vendorData?.email}</p>
        </div>
        {vendorData?.firmId && vendorData?.firmId !== "N/A" && (
          <div className="detailItem">
            <label>Firm ID:</label>
            <p>{vendorData?.firmId}</p>
          </div>
        )}
      </div>
      <button onClick={fetchUserDetails} className="refreshBtn">
        Refresh Details
      </button>
    </div>
  );
};

export default UserDetails;
