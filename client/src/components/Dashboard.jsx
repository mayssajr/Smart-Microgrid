import React, { useState, useEffect, useContext } from "react";
import { Typography, Box } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AccessHistory from "./AccessHistory";
import AdminPage from "./AdminPage";
import EnergyAnalytics from "./EnergyAnalytics";
import EnergyStorage from "./EnergyStorage";
import Settings from "./Settings";
import { EthContext } from "../contexts/EthContext";

const Dashboard = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [energyData, setEnergyData] = useState([]);
  const [solarData, setSolarData] = useState([]);
  const [currentSection, setCurrentSection] = useState("dashboard");

  useEffect(() => {
    const fetchEnergyData = async () => {
      if (contract && accounts.length > 0) {
        try {
          const result = await contract.methods.getEnergyRecords(accounts[0]).call();
          const formatted = result.map((r, i) => ({
            name: `#${i + 1}`,
            production: parseInt(r.production),
            consumption: parseInt(r.consumption),
            source: r.source,
            timestamp: new Date(r.timestamp * 1000).toLocaleString(),
          }));
          setEnergyData(formatted.reverse());
        } catch (error) {
          console.error("Erreur lors de la récupération des données énergétiques", error);
        }
      }
    };

    fetchEnergyData();
  }, [contract, accounts]);

  useEffect(() => {
    const fetchSolarData = async () => {
      if (contract && accounts.length > 0) {
        try {
          const result = await contract.methods.getSolarRecords(accounts[0]).call();
          const formatted = result.map((r, i) => ({
            name: `#${i + 1}`,
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

    fetchSolarData();
  }, [contract, accounts]);

  const handleLogAccess = async (uid) => {
    if (!contract || accounts.length === 0) return;

    try {
      await contract.methods.logAccess(uid).send({ from: accounts[0] });
      console.log("Accès enregistré :", uid);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  useEffect(() => {
    const fetchRFIDTag = async () => {
      try {
        const res = await fetch('http://192.168.1.157/rfid');
        const data = await res.json();

        if (data.tagUID) {
          console.log("UID reçu :", data.tagUID);
          await handleLogAccess(data.tagUID);
        }
      } catch (err) {
        console.error("Erreur lecture RFID", err);
      }
    };

    const interval = setInterval(fetchRFIDTag, 1000);
    return () => clearInterval(interval);
  }, [contract, accounts]);

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Energy Production and Consumption
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="production" stroke="#82ca9d" name="Production (W)" />
                <Line type="monotone" dataKey="consumption" stroke="#8884d8" name="Consumption (W)" />
              </LineChart>
            </ResponsiveContainer>

            <Typography variant="h6" gutterBottom mt={3}>
              Solar Data
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={solarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#FFA500" name="Current (A)" />
                <Line type="monotone" dataKey="voltage" stroke="#0000FF" name="Voltage (V)" />
                <Line type="monotone" dataKey="power" stroke="#00FF00" name="Power (W)" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        );

      case "energyStorage":
        return <EnergyStorage contract={contract} accounts={accounts} />;
      
      case "energyAnalytics":
        return <EnergyAnalytics contract={contract} solarData={solarData} />;

      case "settings":
  return (
    <Settings 
      accounts={accounts} 
      solarData={solarData} 
    />
  );

      case "accessHistory":
        return <AccessHistory contract={contract} />;

      case "admin":
        return <AdminPage contract={contract} accounts={accounts} />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Sidebar onSectionChange={setCurrentSection} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>🔋 Smart Microgrid Dashboard</Typography>
        {renderSection()}
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;