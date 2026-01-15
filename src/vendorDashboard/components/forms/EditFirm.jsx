import React, { useState, useEffect } from "react";
import API_URL from "../../data/apiPath";

const EditFirm = ({ firmId, onClose, onUpdate }) => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firmData, setFirmData] = useState(null);

  useEffect(() => {
    fetchFirmData();
  }, [firmId]);

  const fetchFirmData = async () => {
    try {
      // Get firm details from localStorage or from firm ID
      const firmIdStored = localStorage.getItem("firmId");
      if (firmIdStored) {
        // Get firm from product fetch (we can make a direct call)
        const vendorId = localStorage.getItem("vendorId");
        const loginToken = localStorage.getItem("loginToken");
        
        // For now, pre-populate with basic info
        setFirmName(localStorage.getItem("firmName") || "");
      }
    } catch (error) {
      console.error("Error fetching firm data:", error);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleUpdateFirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmIdToUpdate = localStorage.getItem("firmId");

      if (!loginToken || !firmIdToUpdate) {
        alert("User not authenticated");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      category.forEach((value) => {
        formData.append("category", value);
      });

      region.forEach((value) => {
        formData.append("region", value);
      });

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/firm/update-firm/${firmIdToUpdate}`, {
        method: "PUT",
        headers: {
          token: loginToken,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Update localStorage
        if (firmName) {
          localStorage.setItem("firmName", firmName);
        }
        alert("Firm updated successfully ✅");
        onUpdate();
        onClose();
      } else {
        alert("Failed to update firm ❌");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update firm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editFirmModal">
      <div className="editFirmOverlay" onClick={onClose}></div>
      <div className="editFirmContainer">
        <div className="editFirmHeader">
          <h2>Edit Firm</h2>
          <button className="closeButton" onClick={onClose}>✕</button>
        </div>

        <form className="editFirmForm" onSubmit={handleUpdateFirm}>
          <div className="formGroup">
            <label>Firm Name</label>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="Enter firm name"
              required
            />
          </div>

          <div className="formGroup">
            <label>Area/Location</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area/location"
            />
          </div>

          <div className="formGroup">
            <label>Category</label>
            <div className="checkboxGroup">
              <label>
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes("veg")}
                  onChange={handleCategoryChange}
                />
                Veg
              </label>
              <label>
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes("non-veg")}
                  onChange={handleCategoryChange}
                />
                Non-Veg
              </label>
            </div>
          </div>

          <div className="formGroup">
            <label>Region/Cuisine</label>
            <div className="checkboxGroup">
              <label>
                <input
                  type="checkbox"
                  value="south-indian"
                  checked={region.includes("south-indian")}
                  onChange={handleRegionChange}
                />
                South Indian
              </label>
              <label>
                <input
                  type="checkbox"
                  value="north-indian"
                  checked={region.includes("north-indian")}
                  onChange={handleRegionChange}
                />
                North Indian
              </label>
              <label>
                <input
                  type="checkbox"
                  value="chinese"
                  checked={region.includes("chinese")}
                  onChange={handleRegionChange}
                />
                Chinese
              </label>
              <label>
                <input
                  type="checkbox"
                  value="bakery"
                  checked={region.includes("bakery")}
                  onChange={handleRegionChange}
                />
                Bakery
              </label>
            </div>
          </div>

          <div className="formGroup">
            <label>Offer</label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Enter special offer"
            />
          </div>

          <div className="formGroup">
            <label>Firm Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="formActions">
            <button type="submit" className="submitBtn" disabled={loading}>
              {loading ? "Updating..." : "Update Firm"}
            </button>
            <button type="button" className="cancelBtn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFirm;
