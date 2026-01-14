import React, { useState, useEffect } from "react";
import API_URL from "../data/apiPath";
import EditProduct from "./forms/EditProduct";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");

    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert("Failed to fetch products 👎");
      setLoading(false);
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById = async (productId) => {
    const isConfirmed = confirm("Are you sure you want to delete this product?");

    if (!isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(prev =>
          prev.filter(product => product._id !== productId)
        );
        alert("Product deleted successfully ✅");
      } else {
        alert("Failed to delete product ❌");
      }
    } catch (error) {
      console.error("Delete failed", error);
      alert("Server error while deleting");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleProductUpdate = () => {
    productsHandler(); // Refresh products list
  };

  if (loading) {
    return (
      <div className="productsSection">
        <div className="loadingContainer">
          <div className="loadingSpinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productsSection">
      <div className="productsContainer">
        <div className="productsHeader">
          <h1 className="productsTitle">✨ Your Products</h1>
          <p className="productsSubtitle">Manage and showcase your premium offerings</p>
        </div>

        {products?.length === 0 ? (
          <div className="noProductsContainer">
            <div className="noProductsIcon">📦</div>
            <p className="noProductsText">No products added yet</p>
            <p className="noProductsHint">Add your first product to get started!</p>
          </div>
        ) : (
          <div className="productsGrid">
            {products?.map(item => (
              <div key={item._id} className="productCard">
                <div className="productImageContainer">
                  {item.image ? (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      className="productImage"
                    />
                  ) : (
                    <div className="productImagePlaceholder">
                      <span>📸</span>
                    </div>
                  )}
                  <div className="productImageOverlay">
                    <button 
                      className="editButton"
                      onClick={() => handleEditClick(item)}
                      title="Edit product"
                    >
                      ✏️
                    </button>
                    <button 
                      className="deleteButton"
                      onClick={() => deleteProductById(item._id)}
                      title="Delete product"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="productInfo">
                  <h3 className="productName">{item.productName}</h3>
                  
                  <div className="productDetails">
                    <div className="priceTag">
                      <span className="priceLabel">Price</span>
                      <span className="priceValue">₹{item.price}</span>
                    </div>
                    
                    {item.category && (
                      <div className={`categoryBadge categoryBadge-${item.category}`}>
                        {item.category}
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className="productDescription">{item.description.substring(0, 80)}...</p>
                  )}

                  <div className="productMeta">
                    {item.bestseller && (
                      <span className="bestseller">⭐ Bestseller</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEditModal && editingProduct && (
        <EditProduct 
          product={editingProduct}
          onClose={handleCloseModal}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default AllProducts;
