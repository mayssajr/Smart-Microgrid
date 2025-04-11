import React, { useState, useContext } from "react";
import { EthContext } from "../contexts/EthContext";
import { TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material";

const ProductionEnergy = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [production, setProduction] = useState(0);
  const [source, setSource] = useState("solaire");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (isNaN(production) || production <= 0) {
      alert("Veuillez entrer une production valide");
      return;
    }

    setLoading(true);

    try {
      await contract.methods.recordEnergy(production, 0, source).send({ from: accounts[0] });
      alert("✅ Production enregistrée !");
    } catch (error) {
      console.error("Erreur d'enregistrement", error);
      alert("❌ Une erreur est survenue");
    }

    setLoading(false);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Module de Production d'Énergie</Typography>
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
          label="Source d'Énergie"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <MenuItem value="solaire">Solaire</MenuItem>
          <MenuItem value="éolienne">Éolienne</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer la production"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductionEnergy;
