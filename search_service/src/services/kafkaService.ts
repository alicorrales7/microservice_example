// search-service/src/services/kafkaService.ts

import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'search-service',
  brokers: ['kafka:9092'], // Punto de acceso a Kafka
  logLevel: logLevel.INFO,
});

const producer = kafka.producer();

class KafkaService {
  static async publishMessage(topic: string, message: string) {
    try {
      await producer.connect();
      await producer.send({
        topic,
        messages: [{ value: message }],
      });
    } catch (error) {
      console.error('Error publishing message to Kafka:', error);
    } finally {
      await producer.disconnect();
    }
  }
}

export { KafkaService };