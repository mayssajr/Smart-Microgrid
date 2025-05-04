import React, { useContext, useState } from "react";
import { EthContext } from "../contexts/EthContext";
import { Button, Box, Typography, Alert } from "@mui/material";

const FetchAndRecord = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [solarData, setSolarData] = useState(null); 
  const [error, setError] = useState(null); 

  const fetchSolarDataAndRecord = async () => {
    try {
      setError(null); 
      const response = await fetch("http://192.168.1.157/data"); 
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const text = await response.text(); 
      console.log("Raw response:", text);

      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        throw new Error("Response is not in valid JSON format.");
      }

      if (!json.current || !json.voltage || !json.power) {
        throw new Error("The response does not contain valid data for current, voltage, or power.");
      }

      const current = parseFloat(json.current); 
      const voltage = parseFloat(json.voltage); 
      const power = parseFloat(json.power); 
      console.log("Fetched solar data - Current:", current, "A, Voltage:", voltage, "V, Power:", power, "W");

      setSolarData({ current, voltage, power });

      if (contract && accounts && accounts[0]) {
        await contract.methods.recordSolarData(current, voltage, power).send({ from: accounts[0] });
        alert("✅ Solar data recorded on the blockchain!");
      } else {
        alert("⚠️ Blockchain connection unavailable");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); 
    }
  };

  return (
    <Box textAlign="center" mt={3}>
      <Button variant="contained" color="primary" onClick={fetchSolarDataAndRecord}>
        Fetch & Record Solar Data
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {solarData && (
        <Box mt={3}>
          <Typography variant="h6">
            Current produced: {solarData.current.toFixed(2)} A
          </Typography>
          <Typography variant="h6">
            Voltage produced: {solarData.voltage.toFixed(2)} V
          </Typography>
          <Typography variant="h6">
            Estimated power: {solarData.power.toFixed(2)} W
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FetchAndRecord;
