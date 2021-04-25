require('dotenv').config();
import 'reflect-metadata'
import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
import connectToDB from './app/infrastructure/db_connection'
import { USER_API_URL, BOOKS_API_URL, BOOKS_URL } from './app/constants';
import { UserApiRouter, BookApiRouter, BookRenderRouter, MainRenderRouter } from './app/web/routers';

const server = express();

server.set('views', path.join(__dirname, 'app/web/views'));
server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const bookApiRouter = BookApiRouter();
const userApiRouter = UserApiRouter();
const bookRenderRouter = BookRenderRouter();
const mainRenderRouter = MainRenderRouter();

server.use('/', mainRenderRouter);
server.use(BOOKS_API_URL, bookApiRouter);
server.use(USER_API_URL, userApiRouter);
server.use(BOOKS_URL, bookRenderRouter);

async function start() {
  try {
    await connectToDB()
    server.listen(PORT, () => console.log(`> app is ready on port:${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
