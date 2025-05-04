import React, { useState, useContext } from "react";
import { EthContext } from "../contexts/EthContext";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const ConsumptionEnergy = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [consumption, setConsumption] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (isNaN(consumption) || consumption <= 0) {
      alert("Please enter a valid consumption value");
      return;
    }

    setLoading(true);

    try {
      await contract.methods.recordEnergy(0, consumption, "unspecified").send({ from: accounts[0] });
      alert("✅ Consumption successfully recorded!");
    } catch (error) {
      console.error("Error while recording", error);
      alert("❌ An error occurred");
    }

    setLoading(false);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Energy Consumption Module</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Consumption (W)"
          variant="outlined"
          type="number"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Recording..." : "Record Consumption"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ConsumptionEnergy;
