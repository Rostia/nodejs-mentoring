class CustomError extends Error {
  public statusCode: number;
  public params: object;

  constructor(message: string, params: object = {}, statusCode: number = 500) {
      super(message);
      this.statusCode = statusCode;
      this.params = params;
  }
}

export default CustomError;
