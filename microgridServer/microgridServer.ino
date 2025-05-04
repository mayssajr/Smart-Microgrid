#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h> 


const char* ssid = "Orange-25D3";      
const char* password = "B2Y7Y4DT0R6"; 

SoftwareSerial stm32Serial(D2, D3);

#define RST_PIN D0 
#define SS_PIN D1  

MFRC522 rfid(SS_PIN, RST_PIN);

int latestCurrent = 0;
int latestVoltage = 0;
int latestPower = 0;

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  Serial.println("Démarrage...");

  stm32Serial.begin(9600);

  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Module RFID initialisé.");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnecté au Wi-Fi !");
  Serial.print("Adresse IP: ");
  Serial.println(WiFi.localIP());

  server.on("/data", HTTP_GET, []() {
    if (latestCurrent > 0 && latestVoltage > 0) { 
      String json = "{\"current\":" + String(latestCurrent) + ", \"voltage\":" + String(latestVoltage) + ", \"power\":" + String(latestPower) + "}";
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Content-Type", "application/json");
      server.send(200, "application/json", json);
    } else {
      server.send(404, "application/json", "{\"error\":\"Aucune donnée disponible\"}");
    }
  });

server.on("/rfid", HTTP_GET, []() {
  String tagUID = "";
  if (rfid.PICC_IsNewCardPresent()) {
    if (rfid.PICC_ReadCardSerial()) {
      for (byte i = 0; i < rfid.uid.size; i++) {
        tagUID += String(rfid.uid.uidByte[i], HEX);
      }
      tagUID.toUpperCase(); 
      Serial.println("Tag RFID détecté: " + tagUID);

      String json = "{\"tagUID\":\"" + tagUID + "\"}";
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Content-Type", "application/json");
      server.send(200, "application/json", json);

      rfid.PICC_HaltA();
    } else {
      server.send(404, "application/json", "{\"error\":\"Aucun tag RFID détecté\"}");
    }
  } else {
    server.send(404, "application/json", "{\"error\":\"Aucun tag RFID détecté\"}");
  }
});

  server.begin();
  Serial.println("Serveur démarré");
}

void loop() {
  server.handleClient();



  if (stm32Serial.available()) {
    String data = stm32Serial.readStringUntil('\n'); 
    Serial.println("Données reçues du STM32: " + data);

    int currentStart = data.indexOf(":") + 1;
    int currentEnd = data.indexOf(",");
    int voltageStart = data.indexOf(":", currentEnd) + 1;
    int voltageEnd = data.indexOf("}", voltageStart);

    if (currentStart > 0 && currentEnd > currentStart && voltageStart > 0 && voltageEnd > voltageStart) {
      String currentStr = data.substring(currentStart, currentEnd);
      String voltageStr = data.substring(voltageStart, voltageEnd);

      int currentValue = currentStr.toInt();
      int voltageValue = voltageStr.toInt();

      if (currentValue > 0 && voltageValue > 0) {
        latestCurrent = currentValue;
        latestVoltage = voltageValue;
        latestPower = latestCurrent * latestVoltage;
      }
    }
  }
}