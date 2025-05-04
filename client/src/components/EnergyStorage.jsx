import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { EthContext } from "../contexts/EthContext";

const EnergyStorage = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [batteryLevel, setBatteryLevel] = useState(50); 
  const [solarData, setSolarData] = useState([]);
  const [espData, setEspData] = useState({ current: 0, voltage: 0, power: 0 });
  const maxBatteryCapacity = 1000; 

  const fetchSolarRecords = async () => {
    if (contract && accounts && accounts.length > 0) {
      try {
        const result = await contract.methods.getSolarRecords(accounts[0]).call();
        const formatted = result.map((r, i) => ({
          current: parseInt(r.current),
          voltage: parseInt(r.voltage),
          power: parseInt(r.power),
          timestamp: new Date(r.timestamp * 1000).toLocaleString(),
        }));
        setSolarData(formatted.reverse());
      } catch (error) {
        console.error("Erreur lors de la récupération des données solaires", error);
      }
    }
  };

  const fetchESPData = async () => {
    try {
      const res = await fetch("http://192.168.1.157/data"); 
      const data = await res.json();

      if (data.current && data.voltage) {
        const power = data.current * data.voltage;
        setEspData({
          current: data.current,
          voltage: data.voltage,
          power: power,
        });
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données ESP", err);
    }
  };

  const handleRecordSolarData = async () => {
    if (!contract || accounts.length === 0) return;

    try {
      await contract.methods.recordSolarData(
        espData.current,
        espData.voltage,
        espData.power
      ).send({ from: accounts[0] });

      alert("Données solaires enregistrées !");
      fetchSolarRecords();
    } catch (error) {
      console.error("Échec de l'enregistrement", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleStorage = () => {
    let totalPower = solarData.reduce((sum, record) => sum + record.power, 0);
    let newBatteryLevel = Math.min((totalPower / maxBatteryCapacity) * 100, 100);
    setBatteryLevel(newBatteryLevel);
  };

  useEffect(() => {
    fetchESPData();
    const interval = setInterval(fetchESPData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchSolarRecords();
  }, [contract, accounts]);

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>
        🔋 Energy Storage Module
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="body1">
          Battery Level: <strong>{batteryLevel.toFixed(2)}%</strong>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleStorage}>
          Update Battery
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">☀️ Solar Data (Live)</Typography>
        <Typography variant="body2">
          Current: {espData.current} A<br />
          Voltage: {espData.voltage} V<br />
          Power: {espData.power} W
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleRecordSolarData}
          sx={{ mt: 1 }}
        >
          Record Solar Data on Blockchain
        </Button>
      </Box>

      {solarData.length > 0 && (
        <Box>
          <Typography variant="h6">📊 Solar Records</Typography>
          {solarData.slice(0, 5).map((record, index) => (
            <Typography key={index} variant="body2" sx={{ display: "block" }}>
              <strong>{record.power}</strong> W - {record.timestamp}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default EnergyStorage;