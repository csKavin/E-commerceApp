import React, { useState } from "react";
import AppLayout from "../../components/BottomNavigation";
import { IonContent, IonPage } from "@ionic/react";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../../components/productCard/productCard";
import { Box, Grid, Typography, TextField } from "@mui/material";
import { products } from "../../components/product";
import { user } from "../../components/user";

const Home = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showSearch, setShowSearch] = useState(false); // Toggle search bar

  const handleAddToCart = (id: number) => {
    setCart([...cart, id]);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <IonPage>
      <IonContent>
        <div>
          <AppLayout />

          <div className="Page-Container content-wrapper">
            {/* Header Part */}
            <main
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              {/* Profile Image */}
              <div>
                <img
                  src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png"
                  className="rounded-5 header-image-round"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </div>

              {/* Name Centered */}
              <div
                className="bold"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {user.name}
              </div>

              {/* Search Icon - Toggle Search Input */}
              <div onClick={() => setShowSearch(!showSearch)} style={{ cursor: "pointer" }}>
                <SearchIcon style={{ fontSize: "24px" }} />
              </div>
            </main>

            {/* Search Input Field - Show When Clicked */}
            {showSearch && (
              <div style={{ padding: "10px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="container">
          <Box sx={{ textAlign: "center", marginTop:"-40px"}}>
            <Typography variant="h5" fontWeight="bold">
              Welcome to Our Store!
            </Typography>
            <Typography variant="body1" color="gray">
              Find the best products at unbeatable prices!
            </Typography>
          </Box>
        </div>

        {/* Product Listing - Shows Only Filtered Products */}
        <Grid container spacing={2} style={{ paddingBottom: "80px" }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} key={product.id}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="error" style={{ textAlign: "center", width: "100%", paddingTop:"20px" }}>
              No products found
            </Typography>
          )}
        </Grid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
