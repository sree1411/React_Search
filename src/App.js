import { useEffect, useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      let response = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_page=1&_limit=40"
      );
      let data = await response.json();
      setPhotos(data);
      setFilteredProduct(data);
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    let res = photos.filter((pht) =>
      pht.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProduct(res);
  }, [photos,query]);

  return (
    <div>
      <h1> Search Functionality:{query}</h1>
      <input
        type="text"
        placeholder="Enter the Title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width:"100%", padding:"10px", fontSize:"30px", marginBottom:"10px"}}
      />
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px"}}>
        {filteredProduct.map((photo) => (
          <div key={photo.id} style={{textAlign:"center", padding:"10px", border:"1px solid black", borderRadius:"10px"}}>
            <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl} 
                 style={{ width: "100px", height: "100px", marginBottom: "10px" }}
            />
             <h5 style={{fontFamily:"sans-serif"}}>Title:{photo.title}</h5>
          </div>
         
        ))}
      </div>
    </div>
  );
} 

export default App; 
