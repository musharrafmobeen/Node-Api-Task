const {
  getBooksOptions,
  addBookOptions,
  getOneBookOptions,
  updateBookOptions,
  deleteBookOptions,
} = require("../optionsSchemas/booksOptionsSchema");
const {
  addBook,
  updateOneBook,
  getAllBooks,
  deleteOneBook,
  getOneBook,
} = require("../controllers/booksControllers");

const userRoutes = (fastify, options, done) => {
  //get All Books
  fastify.route({
    method: "GET",
    url: "/books",
    schema: getBooksOptions,
    handler: getAllBooks,
  });

  //Add A Book
  fastify.route({
    method: "POST",
    url: "/books",
    preValidation: [fastify.authenticate],
    schema: addBookOptions,
    handler: addBook,
  });

  //get One Book
  fastify.route({
    method: "GET",
    url: "/books/:name",
    preValidation: [fastify.authenticate],
    schema: getOneBookOptions,
    handler: getOneBook,
  });

  //Delete One Book
  fastify.route({
    method: "DELETE",
    url: "/books",
    preValidation: [fastify.authenticate],
    schema: deleteBookOptions,
    handler: deleteOneBook,
  });

  //Update One Book
  fastify.route({
    method: "PATCH",
    url: "/books",
    preValidation: [fastify.authenticate],
    schema: updateBookOptions,
    handler: updateOneBook,
  });

  done();
};

module.exports = userRoutes;
