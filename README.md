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
        ![1](https://github.com/user-attachments/assets/4f61a66f-ff36-47f9-b167-fd6747e0bb24)
        ![dashboard](https://github.com/user-attachments/assets/7f0198e0-7f30-4d47-a2e8-f4b306312822)
        ![energycharts](https://github.com/user-attachments/assets/51ce5836-b38c-4f84-b726-24d814b266c0)
        ![solarDataAdded](https://github.com/user-attachments/assets/dba0652d-fd98-489a-937c-938c041c395e)
        ![solarDataChart](https://github.com/user-attachments/assets/c27dc0ba-89a8-4333-a14b-6a79e6141a7a)
        ![energyBarchart](https://github.com/user-attachments/assets/9c9bb795-1335-4a98-8dec-d9dcdab3221b)
        ![AdminAccess](https://github.com/user-attachments/assets/b6caef15-34c9-4ea4-8460-e36ad527e6fe)
        ![notAdminRegistrationByAdmin](https://github.com/user-attachments/assets/1d8a1866-d5f6-413e-9699-72c1ae82f879)
        ![notAdminConfirmed](https://github.com/user-attachments/assets/bc65042e-6c35-412a-b930-3b20020539e1)
        ![connectedWallet](https://github.com/user-attachments/assets/e3a188a7-e016-4180-94b0-716898eaaa63)



