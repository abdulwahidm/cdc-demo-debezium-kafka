# 🌀 Change Data Capture Demo: PostgreSQL + Debezium + Kafka

## Setup

\`\`\`bash
docker-compose up -d
```

Layanan berikut akan aktif:
- PostgreSQL di port `5432`
- Kafka di port `9092`
- Debezium REST API di port `8083`

---

### 2. Register Debezium Connector

Setelah container aktif, daftarkan connector:

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

### 3. Coba Tambah Data ke PostgreSQL

Masuk ke container PostgreSQL:
```bash
docker exec -it $(docker ps -qf name=postgres) psql -U postgres -d inventory
```

Lalu:
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

### 2. Jalankan
```bash
node kafka-consumer.js
\`\`\`
