const MOCK_BOOKS = [
  {
    id: "1",
    title: "Book 1",
    description: "Description 1",
    authors: "Authors 1",
    favorite: "Favorite 1",
    fileCover: "Filecover 1",
    fileName: "Filename 1",
  },
  {
    id: "2",
    title: "Book 2",
    description: "Description 2",
    authors: "Authors 2",
    favorite: "Favorite 2",
    fileCover: "Filecover 2",
    fileName: "Filename 2",
  },
  {
    id: "3",
    title: "Book 3",
    description: "Description 3",
    authors: "Authors 3",
    favorite: "Favorite 3",
    fileCover: "Filecover 3",
    fileName: "Filename 3",
  },
];

const REQUIRED_FIELDS = [
  "title",
  "description",
  "authors",
  "favorite",
  "fileCover",
  "fileName",
];

const API_URL = "/api";
const USER_URL = API_URL + "/user";
const BOOKS_URL = API_URL + "/books";

module.exports = { MOCK_BOOKS, REQUIRED_FIELDS, USER_URL, BOOKS_URL };
