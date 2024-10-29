#include <SPI.h>
#include <Ethernet.h>

// Defina o endereço MAC e IP conforme necessário para a sua rede
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 100, 253);

// Pino do LED
const int ledPin2 = 2;

const int ledPin3 = 3;
const int ledPin4 = 4;
const int ledPin5 = 5;
const int ledPin6 = 6;
const int ledPin7 = 7;
const int ledPin8 = 8;
const int ledPin9 = 9;

// Inicializa o servidor na porta 80
EthernetServer server(80);

void setup() {
  // Inicializa o pino do LED como saída
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(ledPin4, OUTPUT);
  pinMode(ledPin5, OUTPUT);
  pinMode(ledPin6, OUTPUT);
  pinMode(ledPin7, OUTPUT);
  pinMode(ledPin8, OUTPUT);
  pinMode(ledPin9, OUTPUT);


  // Inicializa a comunicação Ethernet
  Ethernet.begin(mac, ip);

  // Inicia o servidor
  server.begin();

  Serial.begin(9600);
}


// Recebe do site o estado do led e controla o arduíno
void handleAPIRequest(EthernetClient client, String endpoint) {
  if (endpoint.equals("/api/led/on1")) {
    digitalWrite(ledPin2, HIGH);
    Serial.println("Led pino2 on");
  } else if (endpoint.equals("/api/led/off1")) {
    digitalWrite(ledPin2, LOW);
    Serial.println("Led pino2 off");
  } else if (endpoint.equals("/api/led/on2")) {
    digitalWrite(ledPin3, HIGH);
    Serial.println("Led pino3 on");
  } else if (endpoint.equals("/api/led/off2")) {
    digitalWrite(ledPin3, LOW);
    Serial.println("Led pino3 off");
  } else if (endpoint.equals("/api/led/on3")) {
    digitalWrite(ledPin4, HIGH);
    Serial.println("Led pino4 on");
  } else if (endpoint.equals("/api/led/off3")) {
    digitalWrite(ledPin4, LOW);
    Serial.println("Led pino4 off");
  } else if (endpoint.equals("/api/led/on4")) {
    digitalWrite(ledPin5, HIGH);
    Serial.println("Led pino5 on");
  } else if (endpoint.equals("/api/led/off4")) {
    digitalWrite(ledPin5, LOW);
    Serial.println("Led pino5 off");
  }else if (endpoint.equals("/api/led/on5")) {
    digitalWrite(ledPin6, HIGH);
    Serial.println("Led pino6 on");
  } else if (endpoint.equals("/api/led/off5")) {
    digitalWrite(ledPin6, LOW);
    Serial.println("Led pino6 off");
  }else if (endpoint.equals("/api/led/on6")) {
    digitalWrite(ledPin7, HIGH);
    Serial.println("Led pino7 on");
  } else if (endpoint.equals("/api/led/off6")) {
    digitalWrite(ledPin7, LOW);
    Serial.println("Led pino7 off");
  }else if (endpoint.equals("/api/led/on7")) {
    digitalWrite(ledPin8, HIGH);
    Serial.println("Led pino8 on");
  } else if (endpoint.equals("/api/led/off7")) {
    digitalWrite(ledPin8, LOW);
    Serial.println("Led pino8 off");
  }else if (endpoint.equals("/api/led/on8")) {
    digitalWrite(ledPin9, HIGH);
    Serial.println("Led pino9 on");
  } else if (endpoint.equals("/api/led/off8")) {
    digitalWrite(ledPin9, LOW);
    Serial.println("Led pino9 off");
  }

  // Retorna a resposta HTTP com o status
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: application/json");
  client.println("");
  client.println("{\"status\":\"success\"}");
}

void loop() {
  EthernetClient client = server.available();

  if (client) {
    while (client.connected()) {
      if (client.available()) {
        String request = client.readStringUntil('\r');

        if (request.indexOf("GET /api/led/on1") != -1) {
          handleAPIRequest(client, "/api/led/on1");
        } else if (request.indexOf("GET /api/led/off1") != -1) {
          handleAPIRequest(client, "/api/led/off1");
        } else if (request.indexOf("GET /api/led/on2") != -1) {
          handleAPIRequest(client, "/api/led/on2");
        } else if (request.indexOf("GET /api/led/off2") != -1) {
          handleAPIRequest(client, "/api/led/off2");
        } else if (request.indexOf("GET /api/led/on3") != -1) {
          handleAPIRequest(client, "/api/led/on3");
        } else if (request.indexOf("GET /api/led/off3") != -1) {
          handleAPIRequest(client, "/api/led/off3");
        } else if (request.indexOf("GET /api/led/on4") != -1) {
          handleAPIRequest(client, "/api/led/on4");
        } else if (request.indexOf("GET /api/led/off4") != -1) {
          handleAPIRequest(client, "/api/led/off4");
        } else if (request.indexOf("GET /api/led/on5") != -1) {
          handleAPIRequest(client, "/api/led/on5");
        } else if (request.indexOf("GET /api/led/off5") != -1) {
          handleAPIRequest(client, "/api/led/off5");
        } else if (request.indexOf("GET /api/led/on6") != -1) {
          handleAPIRequest(client, "/api/led/on6");
        } else if (request.indexOf("GET /api/led/off6") != -1) {
          handleAPIRequest(client, "/api/led/off6");
        } else if (request.indexOf("GET /api/led/on7") != -1) {
          handleAPIRequest(client, "/api/led/on7");
        } else if (request.indexOf("GET /api/led/off7") != -1) {
          handleAPIRequest(client, "/api/led/off7");
        } else if (request.indexOf("GET /api/led/on8") != -1) {
          handleAPIRequest(client, "/api/led/on8");
        } else if (request.indexOf("GET /api/led/off8") != -1) {
          handleAPIRequest(client, "/api/led/off8");
        } else {
          // Retorna a resposta padrão
          client.println("HTTP/1.1 404 Not Found");
          client.println("Content-Type: text/plain");
          client.println("");
          client.println("Endpoint not found");
        }

        break;
      }
    }

    // Fecha a conexão
    client.stop();
  }
}