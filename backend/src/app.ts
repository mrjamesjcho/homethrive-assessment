import fastifyAuth from "@fastify/auth";
import fastifyBasicAuth from "@fastify/basic-auth";
import fastify from "fastify";
import { UnauthorizedError } from "./errors";
import routes from "./routes";

export const init = () => {
  const app = fastify();

  // register basic auth
  app.register(fastifyAuth);
  app.register(fastifyBasicAuth, {
    validate: async (username: string, password: string) => {
      if (
        username !== process.env.BASIC_AUTH_USERNAME ||
        password !== process.env.BASIC_AUTH_PASSWORD
      ) {
        return new UnauthorizedError();
      }
    },
  });
  app.after(() => {
    app.addHook("preHandler", app.auth([app.basicAuth]));
  });

  // register routes
  app.register(routes);
  return app;
};

if (require.main === module) {
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log("server listening on 3000");
  });
}
