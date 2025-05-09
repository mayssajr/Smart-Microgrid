🌞 Smart Microgrid Project
Ce projet implémente un microgrid hybride autonome combinant des sources d'énergie solaire et une gestion sécurisée via une blockchain. Le système est contrôlé par une carte STM32F769I-DISCO, communique avec un module ESP8266 pour l'interface web, et utilise React.js pour la visualisation en temps réel.


.Description du Projet
Le projet vise à développer un microgrid autonome capable de :

*Gérer la production et la consommation d'énergie solaire.
*Enregistrer les transactions énergétiques sur une blockchain pour garantir traçabilité et sécurité.
*Fournir une interface web locale pour visualiser les données en temps réel.
*Utiliser des tags RFID pour authentifier les utilisateurs et gérer les accès.

.Exécution du Projet
    1-Démarrage du STM32 :
        Assurez-vous que le STM32 est connecté aux capteurs (courant, tension)
        Vérifiez que les données sont transmises correctement à l'ESP8266 via UART.
    2-Démarrage de l'ESP8266 :
        Connectez l'ESP8266 à votre réseau Wi-Fi.
        Vérifiez que le serveur web local fonctionne et que les endpoints (/data, /rfid) sont accessibles.
    3-Déploiement de la Blockchain :
        Assurez-vous que Ganache est en cours d'exécution.
        Déployez le smart contract .
    4-Lancement du Frontend :
        Ouvrez l'interface React dans votre navigateur.
        Connectez-vous à MetaMask pour interagir avec la blockchain.
    5-Tests et Validation :
        Lecture des données solaires énergétiques.
        Authentification RFID.
        Transactions énergétiques sur la blockchain.

