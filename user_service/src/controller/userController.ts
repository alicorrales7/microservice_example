// userService/src/controllers/userController.ts

import { Request, Response } from 'express';
import KafkaService from '../services/kafkaService';

const kafkaService = new KafkaService();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  // Lógica para crear un usuario...

  // Envía un mensaje a un tema de Kafka después de crear un usuario
  await kafkaService.produceMessage('user-created', 'New user created');

  res.status(201).send('User created successfully');
};

