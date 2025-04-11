import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const EnergyStorage = () => {
  const [batteryLevel, setBatteryLevel] = useState(50); // Exemple : capacité actuelle de la batterie

  const handleStorage = () => {
    // Logique de stockage d'énergie excédentaire
    setBatteryLevel(batteryLevel + 10);  // Exemple simple d'augmentation du niveau
  };

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Module de Stockage d'Énergie</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1">Niveau de la batterie : {batteryLevel}%</Typography>
        <Button variant="contained" color="secondary" onClick={handleStorage}>Stocker de l'énergie</Button>
      </Box>
    </Paper>
  );
};

export default EnergyStorage;
