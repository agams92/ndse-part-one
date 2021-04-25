import mongoose from 'mongoose';
import BookModel from '../services/books/book.model';

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'library';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';

const initializeDB = async () => {
  const booksInitCount = [1, 2, 3];
  for await (const el of booksInitCount) {
    try {
      const filter = { title: `Title ${el}` };
      const book = await BookModel.findOne(filter);
      if (!book) {
        const newBook = new BookModel(filter);
        await newBook.save();
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const connectToDB = async () => {
  await mongoose.connect(HostDb, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  await initializeDB();

  const db = mongoose.connection;
  db.on('open', () => console.log('Connected to mongodb'));
};

export default connectToDB;
