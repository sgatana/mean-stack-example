import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { employeeRouter } from './routes/employee.routes';

dotenv.config();
const ATLAS_URI = process.env?.ATLAS_URI;
const port = process.env?.PORT ?? 5000;

if (!ATLAS_URI) {
  console.error(
    'No ATLAS_URI environment variable has been defined in config.env'
  );
  process.exit(1);
}

function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
  });
  app.get('/', (req, res) => {
    res.redirect('/status');
  });
  
  app.use('/api/employees', employeeRouter);

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    bootstrap();
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
