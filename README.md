## Примеры запросов в Mongo DB

1. Вставка данных о двух книгах в коллекцию **books**.
  ```
  db.books.insterMany(
    [
      {
        title: "Заголовок 1",
        description: "Описание 1",
        authors: "Авторы 1"
      },
      {
        title: "Заголовок 2",
        description: "Описание 2",
        authors: "Авторы 2"
      }
    ]
  )
  ```
2. Поиск полей документов коллекции **books** по полю *title*.
  ```
  db.books.find(
    {title: 1}
  )
  ```
3. Редактирование полей *description* и *authors* коллекции **books** по *id* записи.
  ```
  db.books.updateOne(
    { id: {$eq: 1},
    { $set: {
      description: "New description", 
      authors: "new authors"
      }
    }
  )
  ```