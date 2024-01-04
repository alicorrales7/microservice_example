import express from 'express';
import bodyParser from 'body-parser';
import { getProducts, addProduct } from './controller/productController';
import { KafkaService } from './services/productService';

const app = express();
const port = 3003;

app.use(bodyParser.json());

app.get('/products', getProducts);

app.post('/products', async (req, res) => {
  await addProduct(req, res);

  // Publicar un mensaje en el topic 'user-topic' al agregar un nuevo producto
  await KafkaService.publishMessage('user-topic', 'New product added');

  // Publicar un mensaje en el topic 'search-topic' al agregar un nuevo producto
  await KafkaService.publishMessage('search-topic', 'New product added');
});

// Consumir mensajes de Kafka
KafkaService.consumeMessages();

app.listen(port, () => {
  console.log(`Product service listening at http://localhost:${port}`);
});