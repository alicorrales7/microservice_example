// userService/src/userService.ts

import express from 'express';
import { createUser } from '../controller/userController';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Rutas
app.post('/users', createUser);

app.listen(PORT, () => {
  console.log(`userService is running on port ${PORT}`);
});
