// product-service/src/services/kafkaService.ts

import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'product-service',
  brokers: ['kafka:9092'],
  logLevel: logLevel.INFO,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'product-group' });

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

  static async consumeMessages() {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: 'product-topic', fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value?.toString(),
          });
        },
      });
    } catch (error) {
      console.error('Error consuming messages from Kafka:', error);
    }
  }
}

export { KafkaService };
