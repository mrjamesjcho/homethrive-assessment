export class BadRequestError extends Error {
  statusCode: number;

  constructor(message = "Bad request") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor() {
    super("Internal server error");
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}
