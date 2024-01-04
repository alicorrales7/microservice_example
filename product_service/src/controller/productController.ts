// product-service/src/controllers/productController.ts

import { Request, Response } from 'express';
import { KafkaService } from '../services/productService';

const products: { id: number; name: string }[] = [
  { id: 1, name: 'Producto 1' },
  { id: 2, name: 'Producto 2' },
  { id: 3, name: 'Producto 3' },
];

export const getProducts = async (req: Request, res: Response) => {
  try {
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newProduct = { id: products.length + 1, name };
    products.push(newProduct);

    // Publicar un mensaje en el topic 'product-topic' al agregar un nuevo producto
    await KafkaService.publishMessage('product-topic', `New product added: ${name}`);

    res.json({ success: true, newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
