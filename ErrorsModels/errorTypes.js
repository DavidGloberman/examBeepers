class ErrorWithStatusCode extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
class MissingTokenError extends ErrorWithStatusCode {
    constructor(message) {
        super(message || "missing token", 403);
        this.name = "MissingToken";
    }
}
export { MissingTokenError as MissingToken, ErrorWithStatusCode, };
