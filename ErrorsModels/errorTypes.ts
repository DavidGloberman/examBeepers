class ErrorWithStatusCode extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class UserNotFoundError extends ErrorWithStatusCode {
  constructor(message?: string) {
    super(message || "user not found", 404);
    this.name = "UserNotFoundError";
  }
}

class UserAlreadyExistsError extends ErrorWithStatusCode {
  constructor(message?: string) {
    super(message || "user already exists", 409);
    this.name = "UserAlreadyExists";
  }
}

class MissingTokenError extends ErrorWithStatusCode {
  constructor(message?: string) {
    super(message || "missing token", 403);
    this.name = "MissingToken";
  }
}

export {
  UserNotFoundError,
  UserAlreadyExistsError as UserAlreadyExists,
  MissingTokenError as MissingToken,
  ErrorWithStatusCode,
};
