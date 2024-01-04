// userService/src/services/kafkaService.ts

import { Kafka, logLevel } from 'kafkajs';

class KafkaService {
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'user-service',
      brokers: ['kafka:9092'],  // Usa la dirección y puerto correctos del broker Kafka
      logLevel: logLevel.INFO,
    });
  }

  async produceMessage(topic: string, message: string): Promise<void> {
    const producer = this.kafka.producer();

    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }

  async consumeMessages(topic: string, callback: (message: string) => void): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: 'user-service-group' });

    await consumer.connect();
    await consumer.subscribe({ topic });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const mes: Buffer = (message.value) as Buffer
        callback(mes.toString());
      },
    });
  }
}

export default KafkaService;

