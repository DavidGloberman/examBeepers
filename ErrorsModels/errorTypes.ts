class ErrorWithStatusCode extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class MissingTokenError extends ErrorWithStatusCode {
  constructor(message?: string) {
    super(message || "missing token", 403);
    this.name = "MissingToken";
  }
}

export {
  MissingTokenError as MissingToken,
  ErrorWithStatusCode,
};
