import express from 'express';
import { searchProducts } from './controller/searchController';

const app = express();
const port = 3002;

app.get('/search', searchProducts);

app.listen(port, () => {
  console.log(`Search service listening at http://localhost:${port}`);
});