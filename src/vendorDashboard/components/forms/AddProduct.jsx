import React, { useState } from "react";
import API_URL from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageUpload = (event)=>{
const selectedImage = event.target.files[0];
setImage(selectedImage);
}

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

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        console.error("User not Authenticated");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);

      category.forEach((value) => {
        formData.append("category", value);
      });

      formData.append("bestseller", bestseller);
      formData.append("image", image);

      

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        headers:{
      token:loginToken
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product ADDED success✅");
        setBestSeller(false);
        setProductName("");
        setDescription("");
        setImage(null);
        setPrice("");
        setCategory([]);
        
      }
    } catch (error) {
      alert("Failed to Add product");
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name </label>
        <input
          type="text"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <label>Price </label>
        <input
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <div className="checkInp">
          <label>Category</label>

          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                onChange={handleCategoryChange}
                checked={category.includes('veg')}
                value="veg"
              />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                onChange={handleCategoryChange}
                checked={category.includes('non-veg')}
                value="non-veg"
              />
            </div>
          </div>
        </div>
        <div className="checkInp">
          <label>BestSeller</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input type="radio" 
              checked={bestseller === true}
              onChange={handleBestSeller} value="true" />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input type="radio" 
              checked={bestseller===false}
              onChange={handleBestSeller} value="false" />
            </div>
          </div>
        </div>
        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <label>Firm Image </label>
        <input type="file" 
        onChange={handleImageUpload}
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
