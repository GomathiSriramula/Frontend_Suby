import React, { useState, useEffect } from "react";
import API_URL from "../data/apiPath";
import EditFirm from "./forms/EditFirm";

const UserDetails = () => {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showEditFirm, setShowEditFirm] = useState(false);

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

  const handleDeleteFirm = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your firm? All products will be deleted.");
    if (!isConfirmed) return;

    try {
      const firmId = localStorage.getItem("firmId");
      const loginToken = localStorage.getItem("loginToken");

      if (!firmId || !loginToken) {
        alert("Firm information not found");
        return;
      }

      const response = await fetch(`${API_URL}/firm/${firmId}`, {
        method: "DELETE",
        headers: {
          token: loginToken,
        },
      });

      if (response.ok) {
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName");
        setVendorData({
          ...vendorData,
          firmName: "No Firm Added",
          firmId: "N/A",
        });
        alert("Firm deleted successfully ✅");
        fetchUserDetails();
      } else {
        alert("Failed to delete firm ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting firm");
    }
  };

  const handleCloseEditModal = () => {
    setShowEditFirm(false);
  };

  const handleFirmUpdated = () => {
    fetchUserDetails();
  };

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
      </div>

      {vendorData?.firmId && vendorData?.firmId !== "N/A" ? (
        <div className="firmSection">
          <h3>Firm Management</h3>
          <div className="detailsCard">
            <div className="detailItem">
              <label>Firm Name:</label>
              <p>{vendorData?.firmName}</p>
            </div>
            <div className="detailItem">
              <label>Firm ID:</label>
              <p>{vendorData?.firmId}</p>
            </div>
          </div>
          <div className="firmActions">
            <button 
              className="editFirmBtn"
              onClick={() => setShowEditFirm(true)}
            >
              ✏️ Edit Firm
            </button>
            <button 
              className="deleteFirmBtn"
              onClick={handleDeleteFirm}
            >
              🗑️ Delete Firm
            </button>
          </div>
        </div>
      ) : (
        <div className="noFirmCard">
          <p>No firm added yet. Add a firm to get started!</p>
        </div>
      )}

      <button onClick={fetchUserDetails} className="refreshBtn">
        Refresh Details
      </button>

      {showEditFirm && (
        <EditFirm 
          firmId={vendorData?.firmId}
          onClose={handleCloseEditModal}
          onUpdate={handleFirmUpdated}
        />
      )}
    </div>
  );
};

export default UserDetails;
