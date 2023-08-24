import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import rootRouter from '../routes';
import usersRouter from '../routes/users';

export async function server() {
  console.info('Starting server');
  const app = express();
  const port = 5000;

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/', rootRouter);
  app.use('/users', usersRouter);

  app.listen(port, () => {
    console.info(`Server running on port`, port);
  });
}

