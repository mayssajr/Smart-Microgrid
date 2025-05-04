import React from "react";
import { Typography, Box, Button } from "@mui/material";
import Footer from "./Footer";

const WelcomePage = ({ onStart }) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50px", 
          left: "50%",
          transform: "translateX(-50%)", 
          zIndex: 10, 
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: "#6A5ACD", fontWeight: "bold" }}>
          Eco-Secure Microgrid ⚡
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100vh",
          margin: 0, 
          padding: 0, 
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(/images/background.png)`, 
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "80vh", 
            minWidth: "250px", 
          }}
        />

        <Box
          sx={{
            flex: 1,
            maxWidth: "60%", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
            textAlign: "left",
            p: 4,
          }}
        >
          <Typography variant="h5" paragraph sx={{ color: "#555", mb: 3 }}>
            A React-based Blockchain for securing energy transactions for a smart microgrid with solar panels
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onStart}
            sx={{
              px: 5, 
              py: 2, 
              fontSize: "1.2rem", 
              fontWeight: "bold", 
            }}
          >
            Access Dashboard
          </Button>
        </Box>
         
      </Box>
      <Footer />
    </>
  );
};

export default WelcomePage;