// File: kafka-consumer.js
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'cdc-consumer', brokers: ['localhost:9092'] });
const topic = 'pgserver1.public.products';
const consumer = kafka.consumer({ groupId: 'cdc-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  console.log(`🚀 Listening to topic: ${topic}`);
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('📥 CDC Event:', event);
    },
  });
}
run().catch(console.error);
