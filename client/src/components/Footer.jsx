import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Mayssa Jarray . All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
