// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyRecords {
    struct EnergyRecord {
        uint256 production;  // Production d'énergie en Watt
        uint256 consumption; // Consommation d'énergie en Watt
        string source;       // Source d'énergie (ex: solaire, éolienne)
        uint256 timestamp;   // Timestamp de l'enregistrement
    }

    mapping(address => EnergyRecord[]) public energyRecords;  // Stocke les enregistrements par adresse

    // Événement déclenché lors de l'enregistrement d'un nouveau record
    event EnergyRecorded(
        address indexed account,
        uint256 production,
        uint256 consumption,
        string source,
        uint256 timestamp
    );

    // Fonction pour enregistrer un nouvel enregistrement d'énergie
    function recordEnergy(
        uint256 production,
        uint256 consumption,
        string memory source
    ) public {
        EnergyRecord memory newRecord = EnergyRecord({
            production: production,
            consumption: consumption,
            source: source,
            timestamp: block.timestamp
        });

        energyRecords[msg.sender].push(newRecord);

        emit EnergyRecorded(msg.sender, production, consumption, source, block.timestamp);
    }

    // Fonction pour récupérer les enregistrements d'énergie d'une adresse
    function getEnergyRecords(address account) public view returns (EnergyRecord[] memory) {
        return energyRecords[account];
    }
}
