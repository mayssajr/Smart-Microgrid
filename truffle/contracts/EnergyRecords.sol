// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyRecords {

    struct AccessLog {
        string uid;
        address user;
        bool isAdmin;
        uint256 timestamp;
    }
    struct EnergyRecord {
        uint256 production;  
        uint256 consumption; 
        string source;       
        uint256 timestamp;   
    }

    struct SolarRecord {
        uint256 current;      
        uint256 voltage;      
        uint256 power;        
        uint256 timestamp;    
    }

    struct User {
        address wallet;
        bool isAdmin;
        bool exists;
    }

    // Mapping pour stocker les enregistrements énergétiques par adresse
    mapping(address => EnergyRecord[]) public energyRecords;

    // Mapping pour stocker les enregistrements solaires par adresse
    mapping(address => SolarRecord[]) public solarRecords;

        // Mapping UID -> info utilisateur
    mapping(string => User) public registeredUsers;
     // Liste des logs d'accès
    AccessLog[] public accessHistory;

    // Pour vérifier si une adresse peut agir
    mapping(address => bool) public isAdminAddress;

    event EnergyRecorded(
        address indexed account,
        uint256 production,
        uint256 consumption,
        string source,
        uint256 timestamp
    );

        event SolarDataRecorded(
        address indexed account,
        uint256 current,
        uint256 voltage,
        uint256 power,
        uint256 timestamp
    );
    
    event AccessRegistered(string indexed uid, address indexed user, bool isAdmin, uint256 timestamp);
    event RegisteredRFID(string indexed uid, address indexed user, bool isAdmin);

    modifier onlyAdmin() {
        require(isAdminAddress[msg.sender], "Access refused: you are not admin !");
        _;
    }

 // Constructeur : on définit un admin via UID B65F677
    constructor(address initialWallet) {
        // Enregistrer l'UID "B65F677" comme admin
        registeredUsers["B65F677"] = User({
            wallet: initialWallet,
            isAdmin: true,
            exists: true
        });

        // Autoriser cette adresse à effectuer des transactions
        isAdminAddress[initialWallet] = true;

        emit RegisteredRFID("B65F677", initialWallet, true);
    }

    function registerRFID(string memory _uid, address _wallet, bool _isAdmin) public onlyAdmin {
        require(!registeredUsers[_uid].exists, "UID already used");

        registeredUsers[_uid] = User({
            wallet: _wallet,
            isAdmin: _isAdmin,
            exists: true
        });

        if (_isAdmin) {
            isAdminAddress[_wallet] = true;
        }

        emit RegisteredRFID(_uid, _wallet, _isAdmin);
    }
    function logAccess(string memory _uid) public {
        User memory user = registeredUsers[_uid];
        require(user.exists, "UID not autorised");

        accessHistory.push(AccessLog({
            uid: _uid,
            user: user.wallet,
            isAdmin: user.isAdmin,
            timestamp: block.timestamp
        }));

        emit AccessRegistered(_uid, user.wallet, user.isAdmin, block.timestamp);
    }
    function getAccessHistory() public view returns (AccessLog[] memory) {
        return accessHistory;
    }

    function recordEnergy (
        uint256 production,
        uint256 consumption,
        string memory source
    ) public onlyAdmin {
        EnergyRecord memory newRecord = EnergyRecord({
            production: production,
            consumption: consumption,
            source: source,
            timestamp: block.timestamp
        });

        energyRecords[msg.sender].push(newRecord);

        emit EnergyRecorded(msg.sender, production, consumption, source, block.timestamp);
    }

    // Fonction pour récupérer les enregistrements énergétiques d'une adresse
    function getEnergyRecords(address account) public view returns (EnergyRecord[] memory) {
        return energyRecords[account];
    }

    function recordSolarData(
        uint256 current,
        uint256 voltage,
        uint256 power
    ) public {
        SolarRecord memory newRecord = SolarRecord({
            current: current,
            voltage: voltage,
            power: power,
            timestamp: block.timestamp
        });

        solarRecords[msg.sender].push(newRecord);

        emit SolarDataRecorded(msg.sender, current, voltage, power, block.timestamp);
    }

    
    // recuperer sensors data
    function getSolarRecords(address account) public view returns (SolarRecord[] memory) {
        return solarRecords[account];
    }
}