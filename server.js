const fastify = require("fastify")({ logger: true });
const PORT = process.env.PORT || 5000;

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url:
    "mongodb+srv://musharrafmobeen:" +
    process.env.Mongo_db_Atlas_PW +
    "@cluster0.hzdwn.mongodb.net/nodeTask?retryWrites=true&w=majority",
});

fastify.register(require("fastify-bcrypt"), {
  saltWorkFactor: 12,
});

fastify.register(require("./authorization"));

fastify.register(require("./routes/usersRoutes"));
fastify.register(require("./routes/bookRoutes"));

fastify.addHook("onError", async (request, reply, error) => {
  return { error };
});

const start = async () => {
  try {
    await fastify.listen(PORT, () =>
      console.log(`server is listening on port : ${PORT}`)
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
