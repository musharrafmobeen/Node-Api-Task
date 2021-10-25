const {
  addBook,
  updateOneBook,
  getAllBooks,
  deleteOneBook,
  getOneBook,
} = require("../controllers/booksControllers");
const mongodb = require("mongodb");

const addBookOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name", "author"],
      properties: {
        name: { type: "string" },
        author: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          statusCode: { type: "number" },
        },
      },
    },
  },
};

const getBooksOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        users: {
          type: "object",
          properties: {
            _id: { type: mongodb.ObjectId },
            name: { type: "string" },
            author: { type: "string" },
          },
        },
      },
    },
  },
};

const getOneBookOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          author: { type: "string" },
        },
      },
    },
  },
};

const deleteBookOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          book: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              author: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const updateBookOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name", "author"],
      properties: {
        name: { type: "string" },
        author: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          book: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              author: { type: "string" },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  addBookOptions,
  getBooksOptions,
  deleteBookOptions,
  updateBookOptions,
  getOneBookOptions,
};
