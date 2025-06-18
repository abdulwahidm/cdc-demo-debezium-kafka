# 🌀 Change Data Capture Demo: PostgreSQL + Debezium + Kafka

## 📌 Project Purpose
This repository is a simple demonstration of how to implement **Change Data Capture (CDC)** using:

- **PostgreSQL** as the source database
- **Debezium** as the CDC engine that reads changes from PostgreSQL
- **Kafka** as the message broker to distribute change events
- **Node.js** consumer that listens to changes from Kafka and processes them

🎯 **Main goal**: Understand how *insert/update/delete* operations in the database can generate real-time events and how these events can be consumed by other applications (event-driven architecture).

---

## 🏗️ Architecture

```
+---------------+           +---------------------+          +-----------------+
| PostgreSQL DB | ───────▶  |  Debezium Connector | ───────▶ | Kafka Topic     |
|  (inventory)  |           |   (Connect REST API)|          | pgserver1.*     |
+---------------+           +---------------------+          +-----------------+
                                                                      │
                                                                      ▼
                                                            +---------------------+
                                                            | Kafka Consumer App  |
                                                            |  (Node.js + kafkajs)|
                                                            +---------------------+
```

---

## 🚀 Local Setup

### 1. Start All Services
```bash
docker-compose up -d
```

The following services will be running:
- PostgreSQL on port `5432`
- Kafka on port `9092`
- Debezium REST API on port `8083`

---

### 2. Register Debezium Connector

After the containers are running, register the connector:

```bash
curl -X POST http://localhost:8083/connectors \
-H "Content-Type: application/json" \
-d '{
  "name": "postgres-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "postgres",
    "database.dbname": "inventory",
    "database.server.name": "pgserver1",
    "table.include.list": "public.products",
    "plugin.name": "pgoutput",
    "slot.name": "cdc_slot"
  }
}'
```

---

### 3. Try Adding Data to PostgreSQL

Enter the PostgreSQL container:
```bash
docker exec -it $(docker ps -qf name=postgres) psql -U postgres -d inventory
```

Then:
```sql
INSERT INTO products (name, price) VALUES ('Orange', 30);
UPDATE products SET price = 15 WHERE name = 'Banana';
DELETE FROM products WHERE name = 'Apple';
```

---

## 🖥️ Kafka Consumer (Node.js)

### 1. Setup
```bash
npm init -y
npm install kafkajs
```

### 2. Run
```bash
node kafka-consumer.js
```

You will see event logs like this:
```bash
📥 CDC Event: {
  before: { id: 1, name: 'Apple', price: 10 },
  after: null,
  op: 'd' // delete
}
```

---

## 📦 Folder Structure
```
.
├── docker-compose.yml
├── init
│   └── init.sql
├── kafka-consumer.js
└── README.md
```

---

## 📚 References
- https://debezium.io/
- https://kafka.apache.org/
- https://www.confluent.io/

---

## 🧠 Benefits of This Demo
- Understand CDC process with Debezium
- Learn real-time data streaming architecture
- Simulate event-based integration between services

---

