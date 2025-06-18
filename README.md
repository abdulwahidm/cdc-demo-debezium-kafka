# 🌀 Change Data Capture Demo: PostgreSQL + Debezium + Kafka

<<<<<<< HEAD
## 📌 Tujuan Repository Ini
Repositori ini merupakan demonstrasi sederhana tentang bagaimana kita bisa menerapkan **Change Data Capture (CDC)** menggunakan:

- **PostgreSQL** sebagai sumber data (source database)
- **Debezium** sebagai engine Change Data Capture (CDC) yang membaca perubahan dari PostgreSQL
=======
<<<<<<< HEAD
## 📌 Tujuan Proyek Ini
Repositori ini merupakan demonstrasi sederhana tentang bagaimana kita bisa menerapkan **Change Data Capture (CDC)** menggunakan:

- **PostgreSQL** sebagai sumber data (source database)
- **Debezium** sebagai engine CDC yang membaca perubahan dari PostgreSQL
=======
## 📌 Tujuan Repository Ini
Repositori ini merupakan demonstrasi sederhana tentang bagaimana kita bisa menerapkan **Change Data Capture (CDC)** menggunakan:

- **PostgreSQL** sebagai sumber data (source database)
- **Debezium** sebagai engine Change Data Capture (CDC) yang membaca perubahan dari PostgreSQL
>>>>>>> 47099e0 (docs: improve README with full project context, architecture, and setup steps)
>>>>>>> 4ada16e (docs: improve README with full project context, architecture, and setup steps)
- **Kafka** sebagai message broker untuk menyebarkan event perubahan
- **Node.js** consumer yang mendengarkan perubahan dari Kafka dan memprosesnya

🎯 **Goal utama**: Memahami bagaimana *insert/update/delete* data di database dapat menghasilkan event real-time dan bagaimana event ini bisa dikonsumsi oleh aplikasi lain (event-driven architecture).

---

## 🏗️ Arsitektur

```
+---------------+           +---------------------+          +-----------------+
<<<<<<< HEAD
| PostgreSQL DB | ───────▶  |  Debezium Connector | ───────▶ | Kafka Topic     |
|  (inventory)  |           |   (Connect REST API)|          | pgserver1.*     |
+---------------+           +---------------------+          +-----------------+
=======
<<<<<<< HEAD
| PostgreSQL DB | ───────▶ |  Debezium Connector | ───────▶ | Kafka Topic     |
|  (inventory)  |           |   (Connect REST API)|          | pgserver1.*     |
+---------------+           +---------------------+          +-----------------+
                                                               │
                                                               ▼
                                                    +---------------------+
                                                    | Kafka Consumer App  |
                                                    |  (Node.js + kafkajs)|
                                                    +---------------------+
=======
| PostgreSQL DB | ───────▶  |  Debezium Connector | ───────▶ | Kafka Topic     |
|  (inventory)  |           |   (Connect REST API)|          | pgserver1.*     |
+---------------+           +---------------------+          +-----------------+
>>>>>>> 4ada16e (docs: improve README with full project context, architecture, and setup steps)
                                                                      │
                                                                      ▼
                                                            +---------------------+
                                                            | Kafka Consumer App  |
                                                            |  (Node.js + kafkajs)|
                                                            +---------------------+
<<<<<<< HEAD
=======
>>>>>>> 47099e0 (docs: improve README with full project context, architecture, and setup steps)
>>>>>>> 4ada16e (docs: improve README with full project context, architecture, and setup steps)
```

---

## 🚀 Setup Lokal

### 1. Jalankan Semua Layanan
```bash
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
```

Kamu akan melihat log event seperti berikut:
```bash
📥 CDC Event: {
  before: { id: 1, name: 'Apple', price: 10 },
  after: null,
  op: 'd' // delete
}
```

---

## 📦 Struktur Folder
```
.
├── docker-compose.yml
├── init
│   └── init.sql
├── kafka-consumer.js
└── README.md
```

---

## 📚 Referensi
- https://debezium.io/
- https://kafka.apache.org/
- https://www.confluent.io/

---

## 🧠 Manfaat Demo Ini
- Memahami proses CDC dengan Debezium
- Mengetahui arsitektur streaming data real-time
- Menyimulasikan sistem integrasi antar layanan berbasis event

<<<<<<< HEAD
=======
<<<<<<< HEAD
---

> Dibuat oleh [@abdulwahidm](https://github.com/abdulwahidm) — feel free to fork dan explore!
=======
>>>>>>> 47099e0 (docs: improve README with full project context, architecture, and setup steps)
>>>>>>> 4ada16e (docs: improve README with full project context, architecture, and setup steps)
