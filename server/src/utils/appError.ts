class AppError extends Error {
  constructor(
    message: string,
    public status: number,
    public error: any
  ) {
    super(message);
    this.status = status;
    this.error = error;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
