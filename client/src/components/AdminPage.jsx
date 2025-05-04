import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";

const AdminPage = ({ contract, accounts }) => {
  const [uid, setUid] = useState("");
  const [wallet, setWallet] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    try {
      await contract.methods.registerRFID(uid, wallet, isAdmin).send({ from: accounts[0] });
      alert("UID registered successfully!");
    } catch (err) {
      console.error("Error registering UID", err);
      alert("Registration failed");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">🔒 RFID Tag Registration</Typography>
      <TextField label="RFID UID" fullWidth value={uid} onChange={(e) => setUid(e.target.value)} sx={{ mt: 2 }} />
      <TextField label="Ethereum Address" fullWidth value={wallet} onChange={(e) => setWallet(e.target.value)} sx={{ mt: 2 }} />
      <Box sx={{ mt: 2 }}>
        <label>
          <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
          {" "}Admin
        </label>
      </Box>
      <Button variant="contained" onClick={handleRegister} sx={{ mt: 2 }}>Register</Button>
    </Box>
  );
};

export default AdminPage;