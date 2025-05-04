import React, {useState} from "react";
import { Container, Typography, CssBaseline, Box } from "@mui/material";
import { EthProvider } from "./contexts/EthContext";
import ProductionEnergy from "./components/ProductionEnergy";
import ConsumptionEnergy from "./components/ConsumptionEnergy";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (!showDashboard) {
    return (
      <EthProvider>
        <CssBaseline />
        <Container maxWidth="md">
          <WelcomePage onStart={() => setShowDashboard(true)} />
        </Container>
      </EthProvider>
    );
  }
  return (
    <EthProvider>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h3" gutterBottom sx={{ color: "#6A5ACD", fontWeight: 'bold' }}>
          Eco-Secure Microgrid ⚡
          </Typography>
        </Box>
        <ProductionEnergy />
        <ConsumptionEnergy />
        <Dashboard />
      </Container>
    </EthProvider>
  );
}


export default App;
