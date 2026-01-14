import React,{useState} from 'react';
import API_URL from '../../data/apiPath';

const AddFirm = ({ handleFirmAdded }) => {

  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState([]);
  const [region,setRegion] = useState([]);
  const [offer,setOffer] = useState([]);
  const [file,setFile]= useState(null);



const handleImageUpload = (event)=>{
const selectedImage = event.target.files[0];
setFile(selectedImage);
}

const handleCategoryChange = (event) => {
  const value = event.target.value;

  if (category.includes(value)) {
    setCategory(category.filter(item => item !== value));
  } else {
    setCategory([...category, value]);
  }
};


const handleRegionChange = (event) => {
  const value = event.target.value;

  if (region.includes(value)) {
    setRegion(region.filter(item => item !== value));
  } else {
    setRegion([...region, value]);
  }
};

{/*
const handleFirmSubmit = async(e)=>{
e.preventDefault();

try{

  const loginToken = localStorage.getItem('loginToken');

  if(!loginToken)
  {
    console.error("User not authenticated 👎");
  }
 
const formData = new FormData();
formData.append('firmName',firmName);
formData.append('area',area);
formData.append('offer',offer);

category.forEach((value)=>{
 formData.append('category',value);
});

region.forEach((value)=>{
  formData.append('region',value);
})

formData.append('image',file);

const response = await fetch(`${API_URL}/firm/add-firm`,{
  method:'POST',
  headers:{
    "token":`${loginToken}`
  },
  body:formData
});

const data = await response.json();

if(response.ok)
{
  console.log(data);
  setArea("")
  setCategory([])
  setFirmName("")
  setOffer("")
  setRegion([])
  setFile(null)
  alert("Firm Added Successfully ✅");
}

else if(data.message==="Only one firm allowed per vendor"){
alert("Only one firm allowed per vendor ❌")
}

else{
  alert("Failed to add Firm ❌");
}
const firmId = data.firmId;
localStorage.setItem('firmId',firmId);


}catch(error){
console.error("Failed to add Firm");
}

  } */}

  const handleFirmSubmit = async (e) => {
  e.preventDefault();

  try {
    const loginToken = localStorage.getItem("loginToken");

    if (!loginToken) {
      alert("Please login first ❌");
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

    formData.append("image", file);

    const response = await fetch(`${API_URL}/firm/add-firm`, {
      method: "POST",
      headers: {
        token: loginToken,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ ONLY here we store firm
      localStorage.setItem("firmId", data.firmId);
      localStorage.setItem("firmName", data.firmName || firmName);

      alert("Firm Added Successfully ✅");

      setArea("");
      setCategory([]);
      setFirmName("");
      setOffer("");
      setRegion([]);
      setFile(null);

      // Call parent handler to disable Add Firm in sidebar
      if (handleFirmAdded) {
        handleFirmAdded();
      }

      return;
    }

    if (data.message === "Only one firm allowed per vendor") {
      alert("Only one firm allowed per vendor ❌");
      return;
    }

    alert("Failed to add Firm ❌");

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
};


  return (
  <div className="firmSection">
   <form className="tableForm" onSubmit={handleFirmSubmit}>
    <h3>Add Firm</h3>
    <label>Firm Name </label>
    <input type="text" name="firmName"
    onChange={(e)=>{
      setFirmName(e.target.value)
    }} value={firmName}
    />
     <label>Area </label>
    <input type="text"
    name="area"  onChange={(e)=>{
      setArea(e.target.value)
    }} value={area}
    />
   
    <div className="checkInp">
      <label>Category</label>
      <div className="inputsContainer">
        <div className="checkboxContainer">
          <label>Veg</label>
          <input type="checkbox"
          checked={category.includes('veg')}
          onChange={handleCategoryChange}
          value="veg"/>
        </div>
        <div className="checkboxContainer">
          <label>Non-Veg</label>
          <input type="checkbox" 
          checked={category.includes('non-veg')}
          onChange={handleCategoryChange}
          value="non-veg"/>
        </div>
      </div>
        
    </div>
   <div className="checkInp">
      <label>Region</label>

      <div className="inputsContainer">
        <div className="checkboxContainer">
          <label>South Indian</label>
          <input type="checkbox" 
          checked={region.includes('south-indian')}
          onChange={handleRegionChange}
          value="south-indian" />
        </div>
        <div className="checkboxContainer">
          <label>North Indian</label>
          <input type="checkbox"
          checked={region.includes('north-indian')}
          onChange={handleRegionChange}
          value="north-indian"/>
        </div>
         <div className="checkboxContainer">
          <label>Chinese</label>
          <input type="checkbox"
          checked={region.includes('chinese')}
          onChange={handleRegionChange}
          value="chinese" />
        </div>
         <div className="checkboxContainer">
          <label>Bakery</label>
          <input type="checkbox"
          name="firmName"
          checked={region.includes('bakery')}
          onChange={handleRegionChange}
          value="bakery" />
        </div>
      </div>
        
    </div>
     <label>Offer </label>
    <input type="text" name="offer" 
     onChange={(e)=>{
    setOffer(e.target.value)
    }} value={offer}
    />
     <label>Firm Image </label>
    <input type="file" 
    onChange={handleImageUpload}
    />
    <br/>
    <div className="btnSubmit">
      <button type="submit">Submit</button>
    </div>
   </form>
  </div>

  )
}

export default AddFirm


