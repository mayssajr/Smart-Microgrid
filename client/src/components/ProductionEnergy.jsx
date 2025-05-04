import React, { useState, useContext } from "react";
import { EthContext } from "../contexts/EthContext";
import { TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material";

const ProductionEnergy = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [production, setProduction] = useState(0);
  const [source, setSource] = useState("solar");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (isNaN(production) || production <= 0) {
      alert("Please enter a valid production value.");
      return;
    }

    setLoading(true);

    try {
      await contract.methods.recordEnergy(production, 0, source).send({ from: accounts[0] });
      alert("✅ Production successfully recorded!");
    } catch (error) {
      console.error("Error recording production", error);
      alert("❌ An error occurred.");
    }

    setLoading(false);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>
        Energy Production Module
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Production (W)"
          variant="outlined"
          type="number"
          value={production}
          onChange={(e) => setProduction(e.target.value)}
          required
        />

        <TextField
          select
          label="Energy Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <MenuItem value="solar">Solar</MenuItem>
          <MenuItem value="wind">Wind</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Recording..." : "Record Production"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductionEnergy;
