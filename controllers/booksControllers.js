const jwt = require("jsonwebtoken");

async function getAllBooks(req, reply) {
  let data = [];
  console.log(this);
  const collection = await this.mongo.db.collection("books");
  const searchCursor = await collection.find();
  while (await searchCursor.hasNext()) {
    data.push(await searchCursor.next());
  }
  return data;
}

async function addBook(req, reply) {
  const { name, author } = req.body;
  const collection = await this.mongo.db.collection("books");
  await collection.insertOne({ name, author });
  return { message: "Book has been added", statusCode: 201 };
}

async function getOneBook(req, reply) {
  const { name } = req.params;
  const collection = await this.mongo.db.collection("books");
  const book = await collection.findOne({ name });
  if(book){
    return book;
  }
  throw new Error('No Book Found!');
}

async function deleteOneBook(req, reply) {
  const { name } = req.body;
  const collection = await this.mongo.db.collection("books");
  const book = await collection.findOneAndDelete({ name });
  if(book){
    return { message: "Book and been deleted", book: book.value };
  }
  throw new Error('No Book Found!');
}

async function updateOneBook(req, reply) {
  const { name, author } = req.body;
  const collection = await this.mongo.db.collection("books");
  const book = await collection.findOneAndUpdate(
    { name },
    { $set: { author } }
  );
  if(book){
    return {
      message: "Book and been Updated",
      book: { ...book.value, author },
    };
  }
  throw new Error('No Book Found!');
}

module.exports = {
  addBook,
  getAllBooks,
  getOneBook,
  updateOneBook,
  deleteOneBook,
};
