import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { EthContext } from "../contexts/EthContext";


const Settings = ({ accounts }) => {
    const { state: { contract } } = useContext(EthContext);

    
    const [accessLogs, setAccessLogs] = useState([]);
    const [solarData, setSolarData] = useState([]);
  const [espData, setEspData] = useState({ current: 0, voltage: 0, power: 0 });
  const theme = useTheme();

  const fetchAccessHistory = async () => {
    if (!contract) return;

    try {
      const logs = await contract.methods.getAccessHistory().call();
      const formatted = logs.map((log, index) => ({
        id: index + 1,
        uid: log.uid,
        userAddress: log.user,
        isAdmin: log.isAdmin,
        timestamp: new Date(parseInt(log.timestamp) * 1000).toLocaleString(),
      }));
      setAccessLogs(formatted);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique", error);
    }
  };

  const fetchSolarRecords = async () => {
    if (!contract || accounts.length === 0) return;

    try {
      const result = await contract.methods.getSolarRecords(accounts[0]).call();
      const formatted = result.map((r) => ({
        current: parseInt(r.current),
        voltage: parseInt(r.voltage),
        power: parseInt(r.power),
        timestamp: new Date(r.timestamp * 1000).toLocaleString(),
      }));
      setSolarData(formatted.reverse());
    } catch (error) {
      console.error("Erreur lors de la récupération des données solaires", error);
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
  useEffect(() => {
    fetchAccessHistory();
    fetchESPData();

    const interval = setInterval(fetchAccessHistory, 30000);
    const espInterval = setInterval(fetchESPData, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(espInterval);
    };
  }, [contract]);

  const exportToCSV = () => {
    const rows = [
      "Measurement,Current (A),Voltage (V),Power (W),Timestamp",
      `Live Data,${espData.current},${espData.voltage},${espData.power},Live Measurement`,
      ...solarData.map((record, i) => `${i + 1},${record.current},${record.voltage},${record.power},"${record.timestamp}"`)
    ].join("\n");

    const blob = new Blob([rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "energy_data_export.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  };


  

  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          👤 Connected Wallet
        </Typography>
        <Typography variant="body1">
          <strong>MetaMask Address : </strong>
          <code style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
            {accounts && accounts[0] ? accounts[0] : "Not connected"}
          </code>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
        🎨 Appearance
        </Typography>
        <Button variant="outlined" >
          Switch  Mode
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🔐 Recent RFID Access History
        </Typography>

        {accessLogs.length > 0 ? (
          <Box component="ul" sx={{ listStyle: "none", pl: 0 }}>
            {accessLogs.slice(0, 5).map((record, index) => (
              <Box key={index} component="li" sx={{ mb: 1 }}>
                <Typography variant="body2">
                  <strong>UID :</strong> {record.uid} -{" "}
                  <em>{record.timestamp}</em>
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No access history yet.
          </Typography>
        )}
      </Paper>


     <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          📥 Export Energy Data
        </Typography>

        <Typography variant="body2">
          <strong> Solar Data:</strong><br />
          Current: {espData.current} A<br />
          Voltage: {espData.voltage} V<br />
          Power: {espData.power} W
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<DownloadIcon />}
          onClick={exportToCSV}
          sx={{ mt: 2 }}
        >
          Export All Data to CSV
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          🌐 Network Settings
        </Typography>
        <Typography variant="body2">
          <strong>ESP8266 IP:</strong>{" "}
          <code style={{ fontFamily: "monospace" }}>http://192.168.1.157</code>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Status:</strong>{" "}
          {useMediaQuery(theme.breakpoints.up("sm")) ? "Connected" : "Offline"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;