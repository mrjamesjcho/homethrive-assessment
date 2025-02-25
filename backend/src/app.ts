import fastify from "fastify";
import routes from "./routes";
import fastifyAuth from "@fastify/auth";
import fastifyBasicAuth from "@fastify/basic-auth";
import { NotFoundError } from "./errors";

export const init = () => {
  const app = fastify();

  // register basic auth
  app.register(require("@fastify/auth"));
  app.register(require("@fastify/basic-auth"), {
    validate: async (username: string, password: string) => {
      console.log("username", process.env.BASIC_AUTH_USERNAME);
      if (
        username !== process.env.BASIC_AUTH_USERNAME ||
        password !== process.env.BASIC_AUTH_PASSWORD
      ) {
        return new Error("Unauthorized");
      }
    },
  });
  app.after(() => {
    app.addHook("preHandler", app.auth([app.basicAuth]));
  });

  // register routes
  app.register(routes);
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof NotFoundError) {
    }
    reply.send({ error: error.message });
  });
  return app;
};

if (require.main === module) {
  init().listen({ port: 3009 }, (err) => {
    if (err) console.error(err);
    console.log("server listening on 3009");
  });
}
