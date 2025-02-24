import fastify from "fastify";
import routes from "./routes";
import { NotFoundError } from "./errors";

export const init = () => {
  const app = fastify();
  app.register(routes);
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof NotFoundError) {
    }
    reply.send({ error: error.message });
  });
  return app;
};

if (require.main === module) {
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log("server listening on 3000");
  });
}
