interface IBook {
  title: string
  description: string
  authors: string
  favourite: string
  fileCover: string
  fileName: string
  fileBook: string
}

class BooksRepository {
  createBook(book:IBook) {
    const newBook = new Book().save()
    return newBook
  }

  getBook(id:number): IBook{
    return Book.findById(id)
  }

  getBooks(): IBook[]{
    return Book.find();
  }

  updateBook(id:number) {
    return Book.findByIdAndUpdate(id, {title: 'lel'})
  }

  deleteBook(id:number) {
    return Book.deleteOne({ _id: id })
  }
}

export type {
  IBook
}
