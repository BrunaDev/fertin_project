#include <ESP8266WiFi.h> // Para ESP8266
#include <ESP8266WebServer.h> // Biblioteca de servidor web

// Motor DC
int motor1Pin1 = 12; 
int motor1Pin2 = 14; 
int enable1Pin = 13; 

// 0 para porta aberta, 1 para porta fechada
bool porta_status = false; // define o status inicial como aberta

// Configurações de rede Wi-Fi
const char* ssid = "Celular Bruna"; // Substitua pelo nome da sua rede Wi-Fi
const char* password = "saopaulo"; // Substitua pela senha da sua rede Wi-Fi

// Servidor web
ESP8266WebServer server(80);

void setup() {
  // Define os pinos do motor como saídas
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);

  Serial.begin(115200);
  delay(10);

  // Conectar ao Wi-Fi
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Endereço IP: ");
  Serial.println(WiFi.localIP());

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Falha na conexão ao Wi-Fi");
  }

  // Rota para a raiz, apenas para testar a conexão
  server.on("/", []() {
    server.send(200, "text/plain", "Conectado ao ESP8266");
  });

  // Rota para alternar o estado da porta
  server.on("/toggle", [](){
    if (porta_status) {
      destrancarPorta(); // Se a porta estiver trancada, destranca
      server.send(200, "text/plain", "Porta Destrancada");
    } else {
      trancarPorta(); // Se a porta estiver destrancada, tranca
      server.send(200, "text/plain", "Porta Trancada");
    }
  });

  // Rota para obter o estado da porta
  server.on("/status", [](){
    String status = porta_status ? "Porta Trancada" : "Porta Destrancada";
    server.send(200, "text/plain", status);
  });

  // Rota padrão para evitar erro 404
  server.onNotFound([]() {
    server.send(404, "text/plain", "404: Rota não encontrada");
  });

  // Iniciar servidor web
  server.begin();
}

void loop() {
  // Trata as requisições do servidor
  server.handleClient();
}

void trancarPorta() {
  if (!porta_status) { // Se a porta estiver destrancada
    Serial.println("Trancando a porta...");
    digitalWrite(enable1Pin, HIGH); // Liga o motor
    digitalWrite(motor1Pin1, LOW);
    digitalWrite(motor1Pin2, HIGH); // Motor gira no sentido horário
    delay(2000); // Simula o tempo de trancamento
    digitalWrite(motor1Pin1, LOW);
    digitalWrite(motor1Pin2, LOW); // Para o motor
    digitalWrite(enable1Pin, LOW); // Desliga o motor
    porta_status = true; // Atualiza o status para trancada
  }
}

void destrancarPorta() {
  if (porta_status) { // Se a porta estiver trancada
    Serial.println("Destrancando a porta...");
    digitalWrite(enable1Pin, HIGH); // Liga o motor
    digitalWrite(motor1Pin1, HIGH);
    digitalWrite(motor1Pin2, LOW); // Motor gira no sentido anti-horário
    delay(2000); // Simula o tempo de destrancamento
    digitalWrite(motor1Pin1, LOW);
    digitalWrite(motor1Pin2, LOW); // Para o motor
    digitalWrite(enable1Pin, LOW); // Desliga o motor
    porta_status = false; // Atualiza o status para destrancada
  }
}