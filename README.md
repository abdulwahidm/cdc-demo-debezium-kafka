# CDC Demo: PostgreSQL + Debezium + Kafka

## Setup

\`\`\`bash
docker-compose up -d
\`\`\`

## Register Debezium Connector

\`\`\`bash
curl -X POST http://localhost:8083/connectors \\
-H "Content-Type: application/json" \\
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
\`\`\`

## Kafka Consumer (Node.js)

\`\`\`bash
npm init -y
npm install kafkajs
node kafka-consumer.js
\`\`\`
