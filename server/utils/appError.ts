class AppError extends Error {
  constructor(
    msg: string,
    public status: number,
    public error: any
  ) {
    super(msg);
    this.status = status;
    this.error = error;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
