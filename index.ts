import 'dotenv/config';
import Express from 'express';
import cors from 'cors';
import router from './routes';
import AppDataSource from './data-source';

const app = Express();

app.use(cors());
app.use(Express.json());

app.use('/', router);

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    app.listen(process.env.PORT, () =>
      console.log(`Server start! Address: http://localhost:${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
