import { Request, Response } from 'express';
import { KafkaService } from '../services/kafkaService';

export const searchProducts = async (req: Request, res: Response) => {
  try {
    // Procesar búsqueda y devolver resultados
    const searchResults = [
      { id: 1, name: 'Producto 1' },
      { id: 2, name: 'Producto 2' },
    ];

    res.json({ searchResults });

    // Publicar un mensaje en el topic 'search-topic'
    await KafkaService.publishMessage('search-topic', 'Search request processed');
  } catch (error) {
    console.error('Error processing search request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};