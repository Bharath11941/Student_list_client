import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import Navbar from "../components/navbar/Navbar";

const SuccessPage = () => {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 16,
            padding: 4,
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" gutterBottom sx={{ color: "#333333" }}>
            Registration Successful
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#666666" }}>
            Thank you for registering.
          </Typography>
          {/* Optional: Add a button to navigate back to the registration form */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              component={Link}
              to="/registration"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 9999, padding: "12px 32px" }}
            >
              Go Back to Registration
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SuccessPage;
