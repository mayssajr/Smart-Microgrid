import React, { useState, useEffect, useContext } from "react";
import { EthContext } from "../contexts/EthContext";
import { Box, TextField, MenuItem, Button, Typography, Paper } from "@mui/material";

const Formulaire = () => {
  const { state: { contract, accounts } } = useContext(EthContext);
  const [production, setProduction] = useState("");
  const [consumption, setConsumption] = useState("");
  const [source, setSource] = useState("solaire");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const requestAccounts = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          console.log("Account connected:", accounts[0]);
        }
      } catch (err) {
        console.error("MetaMask authorization error:", err);
      }
    };

    if (window.ethereum) {
      requestAccounts();
    } else {
      console.log("MetaMask not installed");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des entrées
    if (isNaN(production) || isNaN(consumption) || production === "" || consumption === "") {
      setError("Veuillez entrer des valeurs valides pour la production et la consommation.");
      return;
    }

    // Réinitialiser l'erreur si tout est valide
    setError("");
    setLoading(true);

    // Vérifier si le contrat et les comptes sont valides
    if (contract && accounts && accounts.length > 0) {
      try {
        await contract.methods.recordEnergy(production, consumption, source)
          .send({ from: accounts[0] });

        alert("✅ Enregistrement réussi !");
        setProduction("");
        setConsumption("");
      } catch (err) {
        console.error("Erreur lors de l'enregistrement:", err);
        alert("❌ Une erreur est survenue lors de l'enregistrement.");
      }
    } else {
      setError("Le contrat ou les comptes ne sont pas valides.");
    }

    setLoading(false);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, my: 4, borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>Enregistrement de données</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Production (W)"
          variant="outlined"
          type="number"
          value={production}
          onChange={(e) => setProduction(e.target.value)}
          required
        />
        <TextField
          label="Consommation (W)"
          variant="outlined"
          type="number"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          required
        />
        <TextField
          select
          label="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <MenuItem value="solaire">Solaire</MenuItem>
          <MenuItem value="éolienne">Éolienne</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </Box>
    </Paper>
  );
};

export default Formulaire;
