import React, { useState, useEffect, useContext } from "react";
import { EthContext } from "../contexts/EthContext";
import { Paper, Typography, Box } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await contract.methods.getEnergyRecords(accounts[0]).call();
      const formatted = result.map((r, i) => ({
        name: `#${i + 1}`,
        production: parseInt(r.production),
        consumption: parseInt(r.consumption),
        source: r.source,
        timestamp: new Date(r.timestamp * 1000).toLocaleString()
      }));
      setData(formatted.reverse());
    };

    if (contract && accounts.length > 0) {
      fetchData();
    }
  }, [contract, accounts]);

  return (
    <Paper elevation={4} sx={{ p: 3, mb: 5, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Tableau de Bord de l'Énergie</Typography>
      {data.length > 0 ? (
        <Box sx={{ my: 3 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#82ca9d" />
              <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Typography variant="body1">Aucune donnée disponible.</Typography>
      )}
    </Paper>
  );
};

export default Dashboard;
