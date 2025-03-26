import React, { useEffect, useState } from "react";
import AppLayout from "../../components/BottomNavigation";
import { IonContent, IonPage } from "@ionic/react";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../../components/productCard/productCard";
import { Box, Grid, Typography, TextField } from "@mui/material";
import { products } from "../../components/product";
import { getData } from "../../Utils/service";
import { collections } from "../../firebaseConfig";
import brandImage from '../../Assests/home/Ess Logo.jpg';

const Home = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showSearch, setShowSearch] = useState(false); // Toggle search bar
  const [data,setData] = useState<any>([]);
  const [user, setUser] = useState();

  const handleAddToCart = (id: number) => {
    setCart([...cart, id]);
  };

  // Filter products based on search term
  const filteredProducts = () =>
    products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
    filteredProducts()
  },[searchTerm]);

  useEffect(()=>{
    getData(collections.PRODUCTS,"").then((res)=>{
      let response : any = res
      let tempArray = response.map((item:any,index:number)=>{
        return {
          id : item?.info?.id,
          name : item?.name,
          notes : item?.notes,
          description: item?.description,
          price : item?.price,
          image : item?.image
        }
      })
      setData(tempArray)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  const userID = localStorage.getItem("userId");

  const fetchUser = async () =>{
    await getData(collections.USERS, "").then((res: any) => {
      const userData = res.find((user: any) => user.uid === userID);
      if (userData) {
        const userName = userData?.name;
        setUser(userName);
      }
    })
  }

 useEffect(()=>{
    fetchUser();
  },[userID]);
  
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
                  src={brandImage}
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
                {user}
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
          {data.length > 0 ? (
            data.map((product:any) => (
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
