import React, { useState, useEffect } from "react";
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AccessHistory = ({ contract }) => {
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    const fetchAccessHistory = async () => {
      if (!contract) return;

      try {
        const logs = await contract.methods.getAccessHistory().call();

        const formattedLogs = logs.map((log, index) => ({
          id: index + 1,
          uid: log.uid,
          userAddress: log.user,
          isAdmin: log.isAdmin,
          timestamp: new Date(parseInt(log.timestamp) * 1000).toLocaleString(),
        }));

        setAccessLogs(formattedLogs);
      } catch (error) {
        console.error("Error fetching access history", error);
      }
    };

    fetchAccessHistory();

    const interval = setInterval(fetchAccessHistory, 30000);
    return () => clearInterval(interval);
  }, [contract]);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        📜 RFID Access History
      </Typography>

      {accessLogs.length === 0 ? (
        <Typography color="textSecondary">No access history available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="access history table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>RFID UID</TableCell>
                <TableCell>Wallet Address</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessLogs.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.uid}</TableCell>
                  <TableCell>
                    <span style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                      {record.userAddress}
                    </span>
                  </TableCell>
                  <TableCell>{record.isAdmin ? "Admin" : "User"}</TableCell>
                  <TableCell>{record.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AccessHistory;