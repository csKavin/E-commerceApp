import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, Grid } from "@mui/material";
import { useHistory, useLocation } from "react-router";
import { products as products } from "../product";

const OrderPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Order placed:", formData);
  };

  const history = useHistory();

  const location = useLocation();
  const { productId } = location.state as LocationState;

  interface LocationState {
    productId?: number; // Define the expected state type
  }

  const selectedProduct = products.find((product)=> product.id === productId);
  return (

    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
        Delivery
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="First name" name="firstName" value={formData.firstName} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField fullWidth label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" variant="outlined" multiline rows={3} />
        <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField fullWidth label="PIN code" name="pinCode" value={formData.pinCode} onChange={handleChange} margin="normal" variant="outlined" />
        <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" variant="outlined" />

        <Typography variant="h6" gutterBottom style={{ fontWeight: "bold", marginTop: "20px" }}>Summary</Typography>

        <Box display="flex" justifyContent="space-between" style={{ marginTop: "10px", fontWeight: "bold" }}>
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1">Rs. {selectedProduct?.price}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" marginTop="20px">
          {/* Pay Now Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #0070f3, #0045a2)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(135deg, #005bb5, #003580)",
              },
            }}
          >
            Pay Now
          </Button>


          {products.length > 0 && (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                marginLeft: "15px",
                padding: "12px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "12px",
                color: "#0045a2",
                border: "2px solid #0045a2",
                transition: "0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#0045a2",
                  color: "#fff",
                },
              }}
              onClick={() => history.push(`/viewProduct/${productId}`)} // Pass the first product ID
            >
              Back
            </Button>
          )}


        </Box>


      </form>

    </Container>
  );
};

export { OrderPage };
