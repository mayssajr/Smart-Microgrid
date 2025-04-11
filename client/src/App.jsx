import React from "react";
import { Container, Typography, CssBaseline, Box } from "@mui/material";
import { EthProvider } from "./contexts/EthContext";
import ProductionEnergy from "./components/ProductionEnergy";
import ConsumptionEnergy from "./components/ConsumptionEnergy";
import EnergyStorage from "./components/EnergyStorage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <EthProvider>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h3" gutterBottom sx={{ color: "#6A5ACD", fontWeight: 'bold' }}>
            Microgrid Éco-Sécurisé ⚡
          </Typography>
        </Box>
        <ProductionEnergy />
        <ConsumptionEnergy />
        <EnergyStorage />
        <Dashboard />
      </Container>
    </EthProvider>
  );
}

export default App;
