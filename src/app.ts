require('dotenv').config();
import 'reflect-metadata'
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const { USER_API_URL, BOOKS_API_URL, BOOKS_URL } = require('./app/constants');
const { UserApiRouter, BookApiRouter, BookRenderRouter, MainRenderRouter } = require('./app/routers');
const { initializeDB } = require('./app/models');


const server = express();
console.log('suka')

server.set('views', path.join(__dirname, 'app/views'));
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

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'todos';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

async function start() {
  try {
    await mongoose.connect(HostDb, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await initializeDB();
    server.listen(PORT, () => console.log(`> app is ready on port:${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
