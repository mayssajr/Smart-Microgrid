import React, { useState, useContext } from "react";
import { EthContext } from "../contexts/EthContext";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const ConsumptionEnergy = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [consumption, setConsumption] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (isNaN(consumption) || consumption <= 0) {
      alert("Veuillez entrer une consommation valide");
      return;
    }

    setLoading(true);

    try {
      await contract.methods.recordEnergy(0, consumption, "non spécifié").send({ from: accounts[0] });
      alert("✅ Consommation enregistrée !");
    } catch (error) {
      console.error("Erreur d'enregistrement", error);
      alert("❌ Une erreur est survenue");
    }

    setLoading(false);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Module de Consommation d'Énergie</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Consommation (W)"
          variant="outlined"
          type="number"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer la consommation"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ConsumptionEnergy;
