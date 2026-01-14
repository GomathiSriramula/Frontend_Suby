import React, { useState, useEffect } from "react";
import API_URL from "../../data/apiPath";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setPrice(product.price || "");
      setCategory(product.category || []);
      setBestSeller(product.bestseller || false);
      setDescription(product.description || "");
    }
  }, [product]);

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

  const handleBestSeller = (e) => {
    const value = e.target.value === "true";
    setBestSeller(value);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem("loginToken");

      if (!loginToken) {
        alert("User not authenticated");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);

      category.forEach((value) => {
        formData.append("category", value);
      });

      formData.append("bestseller", bestseller);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/product/update-product/${product._id}`, {
        method: "PUT",
        headers: {
          token: loginToken,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product updated successfully ✅");
        onUpdate();
        onClose();
      } else {
        alert("Failed to update product ❌");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editProductModal">
      <div className="editProductOverlay" onClick={onClose}></div>
      <div className="editProductContainer">
        <div className="editProductHeader">
          <h2>Edit Product</h2>
          <button className="closeButton" onClick={onClose}>✕</button>
        </div>

        <form className="editProductForm" onSubmit={handleUpdateProduct}>
          <div className="formGroup">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="formGroup">
            <label>Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="formGroup">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows="3"
            ></textarea>
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
            <label>Bestseller</label>
            <div className="radioGroup">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={bestseller === true}
                  onChange={handleBestSeller}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={bestseller === false}
                  onChange={handleBestSeller}
                />
                No
              </label>
            </div>
          </div>

          <div className="formGroup">
            <label>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {product?.image && !image && (
              <p className="imageInfo">Current: {product.image}</p>
            )}
          </div>

          <div className="formActions">
            <button type="submit" className="submitBtn" disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
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

export default EditProduct;
