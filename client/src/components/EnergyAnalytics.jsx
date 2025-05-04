// EnergyAnalytics.js
import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { EthContext } from "../contexts/EthContext"; 

const EnergyAnalytics = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [energyData, setEnergyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!contract || accounts.length === 0) return;

      try {
        const result = await contract.methods.getEnergyRecords(accounts[0]).call();
        const formatted = result.map((r, i) => ({
          name: `#${i + 1}`,
          production: parseInt(r.production),
          consumption: parseInt(r.consumption),
          source: r.source,
          timestamp: new Date(parseInt(r.timestamp) * 1000).toLocaleString(),
        }));
        setEnergyData(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [contract, accounts]);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        🔍 Energy Analytics 
      </Typography>

      {energyData.length === 0 ? (
        <Typography color="textSecondary">No data available yet.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={energyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label="Measurement" />
            <YAxis label="Watts (W)" />
            <Tooltip />
            <Legend />
            <Bar dataKey="production" fill="#ff6600" name="Production (W)" />
            <Bar dataKey="consumption" fill="#00a7e1" name="Consumption (W)" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default EnergyAnalytics;